import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import TaolGame from './components/games/taol-game/TaolGame';
import Home from './components/Home/Home';
import userContext from './components/userContext';
import useUserState from './hooks/use-user-state';
import LoadingWindow from './components/LoadingWindow/LoadingWindow';
import CrocodileGame from './components/games/crocodile-game/CrocodileGame';
import MyGameMenu from './components/games/my-game/MyGameMenu/MyGameMenu';

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
      {(!userState.isFetched)
        && ReactDOM.createPortal(<LoadingWindow />, document.getElementById('root'))}

      <Routes>
        <Route path="/" element={renderHome()} />

        <Route path="games">
          <Route path="taol" element={renderGame('taol', <TaolGame />)} />
          <Route path="my-game" element={renderGame('my-game', <MyGameMenu />)} />
          <Route path="crocodile" element={renderGame('crocodile', <CrocodileGame />)} />
          <Route path="game4" />
          <Route path="game5" />
        </Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;
