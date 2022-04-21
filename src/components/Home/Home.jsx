import React, { useState, useToggle, useEffect } from 'react';
import games from '../../games.json';
import GameCard from '../GameCard/GameCard';
import UserCard from '../UserCard/UserCard';
import AuthWindow from '../AuthWindow/AuthWindow';
import Input from '../Input/Input';

function Home() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/users/getUserInfo');
      const json = await response.json();
      setUserInfo(JSON.parse(json));
    }

    fetchData();
  });

  const [isAuthWinShown, toggleAuthWinShown] = useToggle();

  return (
    <div>
      <div>
        {games.map((x) => (
          <GameCard {...x} available={userInfo.availableRooms.includes(x.gameId)} />
        ))}
      </div>

      {userInfo.success
        ? <UserCard username={userInfo.username} avatarUrl={userInfo.avatarUrl} />
        : <Input type="button" onClick={toggleAuthWinShown} />}

      {isAuthWinShown
        ?? <AuthWindow />}
    </div>
  );
}

export default Home;
