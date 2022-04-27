import React, { useState, useContext } from 'react';
import GameCard from '../GameCard/GameCard';
import UserCard from '../UserCard/UserCard';
import AuthWindow from '../AuthWindow/AuthWindow';
import Input from '../Input/Input';
import userContext from '../userContext';

function Home() {
  const { userState } = useContext(userContext);
  const { availableGames: games } = userState.user;

  const [isAuthWinShown, setAuthWinShown] = useState(false);

  if (userState.isAuthorized && isAuthWinShown) {
    setAuthWinShown(false);
  }

  return (
    <div>
      <div>
        {games.map((game) => (
          <GameCard
            key={game.gameId}
            gameInfo={game}
            isAuthorized={userState.isAuthorized}
          />
        ))}
      </div>

      {userState.isAuthorized
        ? <UserCard username={userState.user.username} avatarUrl={userState.user.avatarUrl} />
        : <Input type="button" onClick={() => setAuthWinShown(!isAuthWinShown)} value="Sign In" />}

      {isAuthWinShown
        && <AuthWindow />}
    </div>
  );
}

export default Home;
