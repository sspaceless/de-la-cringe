import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD:src/components/App/App.jsx
import Home from '../Home/Home';
import userContext from '../userContext';
import gamesList from '../../games.json';
import useUserState from '../../hooks/use-user-state';
import TaolGame from '../games/taol-game/TaolGame';
=======
import Game1Screen from './components/games/game1/StartScreen/Game1Start';
import Home from './components/Home/Home';
import userContext from './components/userContext';
import useUserState from './hooks/use-user-state';
>>>>>>> main:src/App.jsx

function App() {
  const [userState, reloadUserState] = useUserState();

  const value = useMemo(() => ({ userState, reloadUserState }), [userState, reloadUserState]);

  const renderGame = (gameId, gameComponent) => {
    const result = userState.user.availableGames?.find((x) => x.gameId === gameId);

    if (result && result.type !== 'playable') {
      return gameComponent;
    }

    return null;
  };

  const renderHome = () => {
    if (userState.isFetched) {
      return <Home />;
    }

    return null;
  };

  return (
    <userContext.Provider value={value}>
      <Routes>
        <Route path="/" element={renderHome()} />

        <Route path="games">
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