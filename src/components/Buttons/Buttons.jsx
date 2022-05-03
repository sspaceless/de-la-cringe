import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { quickGet } from '../../modules/quickfetch';
import userContext from '../userContext';
import styles from './button.module.css';
import config from '../../config.json';

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
  const { reloadUserState } = useContext(userContext);

  const grantFreeTrial = async () => {
    await quickGet(new URL(`/api/games/grantFreeTrial?gameId=${encodeURIComponent(gameId)}`, config.apiUrl));
    await reloadUserState();
  };

  return <input className={styles.trialBtn} type="button" value="Free trial" onClick={grantFreeTrial} />;
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
