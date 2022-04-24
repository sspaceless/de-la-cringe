import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import userContext from '../userContext';
import gamesList from '../../games.json';
import useUserState from '../../hooks/use-user-state';
import TaolGame from '../games/taol-game/TaolGame';

function App() {
  const [userState, reloadUserState] = useUserState();

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
          <Route path="taol" element={renderGame('taol', <TaolGame />)} />
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
