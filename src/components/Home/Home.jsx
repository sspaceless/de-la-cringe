import React from 'react';
import games from '../../games.json';
import GameCard from '../GameCard/GameCard';

function Home() {
  return (
    <div>
      {games.map((x) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <GameCard {...x} />
      ))}
    </div>
  );
}

export default Home;
