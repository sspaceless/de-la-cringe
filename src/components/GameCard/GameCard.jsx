import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer';
import userContext from '../userContext';
import { TrialButton, BuyButton, PlayButton } from '../Buttons/Buttons';
import styles from './GameCard.module.css';
import config from '../../config.json';

function GameCard(props) {
  const { gameInfo } = props;
  const { image, name, description, type, gameId, untilDate = undefined } = gameInfo;

  const { reloadUserState } = useContext(userContext);

  return (
    <div className={styles.card}>
      <img className={styles.icon} src={`${config.apiUrl}/files/${image}`} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>

      <div className={styles.btnsWrapper}>
        {(type === 'trial')
          && <Timer untilDate={untilDate} onAlarm={reloadUserState} format="hh:mm:ss" />}

        {(type === 'payable' && !untilDate)
          && <TrialButton gameId={gameId} />}

        {(type === 'payable')
          ? <BuyButton gameId={gameId} />
          : <PlayButton gameId={gameId} />}
      </div>
    </div>
  );
}

GameCard.propTypes = {
  gameInfo: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    untilDate: PropTypes.instanceOf(Date)
  }).isRequired
};

export default GameCard;
