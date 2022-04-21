import React from 'react';
import games from '../../games.json';
import GameCard from '../GameCard/GameCard';

function Home() {
  return (
    <div>
      <div>
        {games.map((x) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <GameCard {...x} />
        ))}
      </div>
      <div>
        <h4>{username}</h4>
        <button type="button" onClick={console.log('exit')}>Exit</button>
      </div>
    </div>
  );
}

export default Home;
