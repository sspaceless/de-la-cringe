import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game1Screen from './components/games/game1/StartScreen/Game1Start';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="game">
          <Route path="game1" element={<Game1Screen />} />
          <Route path="gameId2" />
          <Route path="gameId3" />
          <Route path="gameId4" />
          <Route path="gameId5" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
