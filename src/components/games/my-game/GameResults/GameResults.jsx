import React, { useContext, useState } from 'react';
import { Textfit } from 'react-textfit';
import MGContext from '../MGContext';
import RocketsLastFlight from './RocketsLastFlight/RocketsLastFlight';
import styles from './GameResults.module.css';
import FuelBar from '../FuelBar/FuelBar';

function GameResults() {
  const { state } = useContext(MGContext);

  const [isOutro, setIsOutro] = useState(true);
  const [isFlashVisible, setIsFlashVisible] = useState(true);

  if (isOutro) {
    setTimeout(() => {
      setIsOutro(false);

      setTimeout(() => setIsFlashVisible(false), 2000);
    }, 8000);

    return (
      <div className={styles.wrapper}>
        <RocketsLastFlight />
      </div>
    );
  }

  const createCard = (user, isWinner) => (
    <div className={[styles.playerCard, isWinner ? styles.winnerCard : ''].join(' ')}>
      <img className={styles.avatar} src={user.avatarUrl} alt={`${user.name}'s avatar`} />

      <div>
        <Textfit className={styles.username}>{user.name}</Textfit>
        <FuelBar
          points={user.isVip ? undefined : user.points}
          radius="15px"
          height="30px"
          color={isWinner ? 'var(--light-pink)' : 'var(--grey)'}
        />
      </div>
    </div>
  );

  const players = Array.from(state.players.values());

  const playersCards = players.filter((x) => x !== state.winner).map((x) => createCard(x, false));

  return (
    <div className={styles.wrapper}>
      {isFlashVisible && <div className={styles.flash} />}

      <h1 className={styles.text}>Результати</h1>

      <div className={styles.cards}>
        <div className={styles.winners}>
          {createCard(state.winner, true)}
          {createCard(state.host, true)}
        </div>

        <div className={styles.playersCards}>
          {playersCards}
        </div>
      </div>
    </div>
  );
}

export default GameResults;
