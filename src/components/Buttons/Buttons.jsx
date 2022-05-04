import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { quickGet } from '../../modules/quickfetch';
import userContext from '../userContext';
import styles from './button.module.css';
import config from '../../config.json';
import MsgWindow from '../Message/Message';
import ConfirmWindow from '../ConfirmWindow/ConfirmWindow';

const PlayButton = (props) => {
  const { gameId } = props;

  return <Link to={`/games/${gameId}`}><img className={[styles.btn, styles.gameBtn].join(' ')} alt="Play" src={`${config.apiUrl}/files/buttons/PlayButton.svg`} /></Link>;
};

PlayButton.propTypes = { gameId: PropTypes.string.isRequired };

const BuyButton = (props) => {
  const { gameId } = props;
  const { reloadUserState } = useContext(userContext);

  const buyGame = async () => {
    await quickGet(new URL(`/api/games/buy?gameId=${encodeURIComponent(gameId)}`, config.apiUrl));
    await reloadUserState();
  };

  return <input className={[styles.btn, styles.gameBtn].join(' ')} type="image" src={`${config.apiUrl}/files/buttons/BuyButton.svg`} alt="Buy" onClick={buyGame} />;
};

BuyButton.propTypes = { gameId: PropTypes.string.isRequired };

const TrialButton = (props) => {
  const { gameId } = props;
  const { userState, reloadUserState } = useContext(userContext);

  const [isMsgShown, setIsMsgShown] = useState(false);
  const [isConfirmShown, setIsConfirmShown] = useState(false);

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
        <input className={styles.trialBtn} type="button" value="Free trial" onClick={showConfirm} />

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
      <input className={styles.trialBtn} type="button" value="Free trial" onClick={showMsg} />

      {isMsgShown
        && (
          <MsgWindow timeout={30000} onClose={onCloseMsg}>
            Free Trial is not available for unauthorized users <br /><br />
            Please <span className={styles.greyText}>Login</span> or
            <span className={styles.greyText}> Create a new account</span>
          </MsgWindow>
        )}
    </>
  );
};

TrialButton.propTypes = { gameId: PropTypes.string.isRequired };

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
