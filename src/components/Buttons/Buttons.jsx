import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { quickGet } from '../../modules/quickfetch';
import userContext from '../userContext';
import styles from './buttons.module.css';
import config from '../../config.json';
import MessageWindow from '../MessageWindow/MessageWindow';
import ConfirmWindow from '../ConfirmWindow/ConfirmWindow';

const PlayButton = (props) => {
  const { gameId, filter = '' } = props;

  const [hovered, setHovered] = useState(false);

  const shadow = !hovered ? 'drop-shadow(-5px 8px 5px rgba(0, 0, 0, .23))' : '';
  const style = { filter: `${filter} ${shadow}` };

  return (
    <Link to={`/games/${gameId}`}>
      <img
        style={style}
        className={[styles.btn, styles.gameBtn].join(' ')}
        alt="Play"
        src={`${config.apiUrl}/files/buttons/PlayButton.svg`}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      />
    </Link>
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
    await quickGet(new URL(`/api/games/buy?gameId=${encodeURIComponent(gameId)}`, config.apiUrl));
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
      src={`${config.apiUrl}/files/buttons/BuyButton.svg`}
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
      await quickGet(new URL(`/api/games/grantFreeTrial?gameId=${encodeURIComponent(gameId)}`, config.apiUrl));
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
    const result = await quickGet(new URL('/api/users/logoutFromAccount', config.apiUrl));

    if (result.success) {
      await reloadUserState();
    }
  };

  return <input className={styles.logOutBtn} type="image" src={`${config.apiUrl}/files/buttons/LogOutButton.svg`} alt="Log out" onClick={logout} />;
};

export { TrialButton, BuyButton, PlayButton, LogOutButton };
