import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import games from '../../games.json';
import GameCard from '../GameCard/GameCard';
import UserCard from '../UserCard/UserCard';
import AuthWindow from '../AuthWindow/AuthWindow';
import Input from '../Input/Input';
import userContext from '../userContext';

function Home() {
  const { userState: userInfo } = useContext(userContext);

  const [isAuthWinShown, setAuthWinShown] = useState(false);

  if (userInfo.isAuthorized && isAuthWinShown) {
    setAuthWinShown(false);
  }

  return (
    <div>
      <div>
        {games.map((x) => {
          const available = userInfo.user.availableGames
            ? userInfo.user.availableGames.includes(x.gameId)
            : x.default;

          return (
            <Link key={x.gameId} to={available ? `/game/${x.gameId}` : '#'}>
              <GameCard
                available={available}
                {...x}
              />
            </Link>
          );
        })}
      </div>

      {userInfo.isAuthorized
        ? <UserCard username={userInfo.user.username} avatarUrl={userInfo.user.avatarUrl} />
        : <Input type="button" onClick={() => setAuthWinShown(!isAuthWinShown)} value="Sign In" />}

      {isAuthWinShown
        && <AuthWindow />}
    </div>
  );
}

export default Home;
