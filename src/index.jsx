import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game1Screen from './components/games/game1/StartScreen/Game1Start';
import Home from './components/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="game">
        <Route path="game1" element={<Game1Screen />} />
        <Route path="тут gameId2" />
        <Route path="тут gameId3" />
      </Route>
    </Routes>
  </BrowserRouter>
);
