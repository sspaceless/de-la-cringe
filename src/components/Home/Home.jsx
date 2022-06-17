import React, { useContext } from 'react';
import GameCard from '../GameCard/GameCard';
import Header from '../Header/Header';
import userContext from '../userContext';
import styles from './Home.module.css';

function Home() {
  const { userState } = useContext(userContext);
  const { availableGames: games } = userState.user;

  return (
    <div className={styles.back}>
      <Header />

      <div className={styles.content}>
        <div className={styles.games}>
          {games.map((game) => (
            <GameCard
              key={game.gameId}
              gameInfo={game}
              isAuthorized={userState.isAuthorized}
            />
          ))}
        </div>
        <p className={styles.info}>
          Hello
        </p>
      </div>
    </div>
  );
}

export default Home;
