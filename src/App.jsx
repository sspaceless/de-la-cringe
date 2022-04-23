import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { quickGet } from './modules/quickfetch';
import Game1Screen from './components/games/game1/StartScreen/Game1Start';
import Home from './components/Home/Home';
import userContext from './userContext';
import gamesList from './games.json';

function App() {
  const [userState, setUserState] = useState({
    isAuthorized: false,
    user: {}
  });

  const reloadUserState = useCallback(async () => {
    const authInfo = await quickGet('http://localhost:3002/api/users/isAuthorized');

    if (authInfo.success && authInfo.isAuthorized) {
      const info = await quickGet('http://localhost:3002/api/users/getUserInfo');

      if (info.success) {
        setUserState({
          isAuthorized: true,
          user: info.user
        });

        return;
      }
    }

    setUserState({
      isAuthorized: false,
      user: {}
    });
  }, []);

  useEffect(() => {
    reloadUserState();
  }, [reloadUserState]);

  const value = useMemo(() => ({ userState, reloadUserState }), [userState, reloadUserState]);

  const renderGame = (gameId, gameComponent) => {
    if (userState.user.availableGames?.includes(gameId)
        || gamesList.find((game) => game.gameId === gameId).default) {
      return gameComponent;
    }

    return (<p>404</p>);
  };

  return (
    <userContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="game">
          <Route path="game1" element={renderGame('game1', <Game1Screen />)} />
          <Route path="game2" />
          <Route path="game3" />
          <Route path="game4" />
          <Route path="game5" />
        </Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
