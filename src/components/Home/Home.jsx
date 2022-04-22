import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import games from '../../games.json';
import GameCard from '../GameCard/GameCard';
import UserCard from '../UserCard/UserCard';
import AuthWindow from '../AuthWindow/AuthWindow';
import Input from '../Input/Input';
import { quickGet } from '../../quickfetch';

function Home() {
  const [userInfo, setUserInfo] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const authInfo = await quickGet('http://localhost:3002/api/users/isAuthorized');

      if (authInfo.success && authInfo.isAuthorized) {
        const info = await quickGet('http://localhost:3002/api/users/getUserInfo');

        if (info.success) {
          setUserInfo(info.user);
          setIsAuthorized(true);
        }
      }
    }

    fetchData();
  }, []);

  const [isAuthWinShown, setAuthWinShown] = useState(false);

  return (
    <div>
      <div>
        {games.map((x) => {
          const available = userInfo.availableGames
            ? userInfo.availableGames.includes(x.gameId)
            : false;

          return (
            <Link key={x.gameId} to={`/game/${x.gameId}`}>
              <GameCard
                available={available}
                {...x}
              />
            </Link>
          );
        })}
      </div>

      {isAuthorized
        ? <UserCard username={userInfo.username} avatarUrl={userInfo.avatarUrl} />
        : <Input type="button" onClick={() => setAuthWinShown(!isAuthWinShown)} value="Sign In" />}

      {isAuthWinShown
        && <AuthWindow />}
    </div>
  );
}

export default Home;
