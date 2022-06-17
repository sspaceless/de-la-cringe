import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer';
import userContext from '../userContext';
import { TrialButton, BuyButton, PlayButton } from '../Buttons/Buttons';
import styles from './GameCard.module.css';
import Config from '../../config';

function GameCard(props) {
  const { gameInfo } = props;
  const {
    image,
    name,
    description,
    type,
    gameId,
    untilDate = undefined,
    color = undefined,
    filter = undefined
  } = gameInfo;

  const { reloadUserState } = useContext(userContext);

  const style = color ? { color } : {};

  return (
    <div className={styles.card}>
      <img className={styles.icon} src={`${Config.API_URL}/files/${image}`} alt={name} />
      <h1 style={style}>{name}</h1>
      <p>{description}</p>

      <div className={styles.btnsWrapper}>
        {(type === 'trial')
          && <Timer untilDate={untilDate} onAlarm={reloadUserState} format="hh:mm:ss" />}

        {(type === 'payable' && !untilDate)
          && <TrialButton filter={filter} gameId={gameId} />}

        {(type === 'payable')
          ? <BuyButton filter={filter} gameId={gameId} />
          : <PlayButton filter={filter} gameId={gameId} />}
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
    untilDate: PropTypes.instanceOf(Date),
    color: PropTypes.string,
    filter: PropTypes.string
  }).isRequired
};

export default GameCard;
