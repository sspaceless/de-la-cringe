import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { quickGet } from '../../modules/quickfetch';
import userContext from '../userContext';
import styles from './buttons.module.css';
import Config from '../../config';
import MessageWindow from '../MessageWindow/MessageWindow';
import ConfirmWindow from '../ConfirmWindow/ConfirmWindow';

const PlayButton = (props) => {
  const { userState } = useContext(userContext);
  const { gameId, filter = '' } = props;

  const [hovered, setHovered] = useState(false);

  const shadow = !hovered ? 'drop-shadow(-5px 8px 5px rgba(0, 0, 0, .23))' : '';
  const style = { filter: `${filter} ${shadow}` };

  const [isMsgShown, setIsMsgShown] = useState(false);

  const showMsg = () => {
    setIsMsgShown(true);
  };
  const onCloseMsg = () => {
    setIsMsgShown(false);
  };

  const link = userState.isAuthorized ? `/games/${gameId}` : '';
  const onClick = userState.isAuthorized ? '' : showMsg;

  return (
    <>
      <Link to={link} onClick={onClick}>
        <img
          style={style}
          className={[styles.btn, styles.gameBtn].join(' ')}
          alt="Play"
          src={`${Config.API_URL}/files/buttons/PlayButton.svg`}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        />
      </Link>

      {isMsgShown
        && (
          <MessageWindow timeout={30000} onClose={onCloseMsg}>
            Games are not available for unauthorized users <br /><br />
            Please <span className={styles.greyText}>Login</span> or
            <span className={styles.greyText}> Create a new account</span>
          </MessageWindow>
        )}
    </>
  );
};

PlayButton.propTypes = {
  gameId: PropTypes.string.isRequired,
  filter: PropTypes.string
};

PlayButton.defaultProps = {
  filter: ''
};

const BuyButton = (props) => {
  const { gameId, filter = '' } = props;
  const { reloadUserState } = useContext(userContext);

  const buyGame = async () => {
    // just for example. you can't buy games

    await quickGet(new URL(`/api/games/buy?gameId=${encodeURIComponent(gameId)}`, Config.API_URL));
    await reloadUserState();
  };

  const [hovered, setHovered] = useState(false);

  const shadow = !hovered ? 'drop-shadow(-5px 8px 5px rgba(0, 0, 0, .23))' : '';
  const style = { filter: `${filter} ${shadow}` };

  return (
    <input
      style={style}
      className={[styles.btn, styles.gameBtn].join(' ')}
      type="image"
      src={`${Config.API_URL}/files/buttons/BuyButton.svg`}
      alt="Buy"
      onClick={buyGame}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    />
  );
};

BuyButton.propTypes = {
  gameId: PropTypes.string.isRequired,
  filter: PropTypes.string
};

BuyButton.defaultProps = {
  filter: ''
};

const TrialButton = (props) => {
  const { gameId, filter = '' } = props;
  const { userState, reloadUserState } = useContext(userContext);

  const [isMsgShown, setIsMsgShown] = useState(false);
  const [isConfirmShown, setIsConfirmShown] = useState(false);

  const [hovered, setHovered] = useState(false);

  const shadow = !hovered ? 'drop-shadow(-5px 8px 5px rgba(0, 0, 0, .23))' : '';
  const style = { filter: `${filter} ${shadow}` };

  const grantFreeTrial = async (answer) => {
    if (answer) {
      await quickGet(new URL(`/api/games/grantFreeTrial?gameId=${encodeURIComponent(gameId)}`, Config.API_URL));
      await reloadUserState();
    }
  };

  const showMsg = () => {
    setIsMsgShown(true);
  };
  const onCloseMsg = () => {
    setIsMsgShown(false);
  };

  const showConfirm = () => {
    setIsConfirmShown(true);
  };
  const onCloseConfrim = () => {
    setIsConfirmShown(false);
  };

  if (userState.isAuthorized) {
    return (
      <>
        <input
          style={style}
          className={styles.trialBtn}
          type="button"
          value="Free trial"
          onClick={showConfirm}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        />

        {isConfirmShown
          && (
            <ConfirmWindow onClose={onCloseConfrim} callback={grantFreeTrial}>
              Free Trial gives you limited
              <span className={styles.greyText}> (30 minutes)</span> access to this <br />
              game. After this period, you will need to buy the game
            </ConfirmWindow>
          )}
      </>
    );
  }

  return (
    <>
      <input
        style={style}
        className={styles.trialBtn}
        type="button"
        value="Free trial"
        onClick={showMsg}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      />

      {isMsgShown
        && (
          <MessageWindow timeout={30000} onClose={onCloseMsg}>
            Free Trial is not available for unauthorized users <br /><br />
            Please <span className={styles.greyText}>Login</span> or
            <span className={styles.greyText}> Create a new account</span>
          </MessageWindow>
        )}
    </>
  );
};

TrialButton.propTypes = {
  gameId: PropTypes.string.isRequired,
  filter: PropTypes.string
};

TrialButton.defaultProps = {
  filter: ''
};

const LogOutButton = () => {
  const { reloadUserState } = useContext(userContext);

  const logout = async () => {
    const result = await quickGet(new URL('/api/users/logoutFromAccount', Config.API_URL));

    if (result.success) {
      await reloadUserState();
    }
  };

  return <input className={styles.logOutBtn} type="image" src={`${Config.API_URL}/files/buttons/LogOutButton.svg`} alt="Log out" onClick={logout} />;
};

export { TrialButton, BuyButton, PlayButton, LogOutButton };
