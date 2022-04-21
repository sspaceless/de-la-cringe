import React, { useToggle } from 'react';
import games from '../../games.json';
import GameCard from '../GameCard/GameCard';
import UserCard from '../UserCard/UserCard';
import AuthWindow from '../AuthWindow/AuthWindow';
import Input from '../Input/Input';

async function Home() {
  const response = await fetch('api/users/getUserInfo');
  const json = await response.json();
  const result = JSON.parse(json);

  const [isAuthWinShown, toggleAuthWinShown] = useToggle();

  return (
    <div>
      <div>
        {games.map((x) => (
          <GameCard {...x} available={result.availableRooms.includes(x.gameId)} />
        ))}
      </div>

      {result.success
        ? <UserCard username={result.username} avatarUrl={result.avatarUrl} />
        : <Input type="button" onClick={toggleAuthWinShown} />}

      {isAuthWinShown
        ?? <AuthWindow />}
    </div>
  );
}

export default Home;
