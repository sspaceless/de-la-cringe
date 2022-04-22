import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaolGame from './components/games/taol-game/TaolGame';
import Home from './components/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="game">
        <Route path="taol" element={<TaolGame />} />
        <Route path="тут gameId2" />
        <Route path="тут gameId3" />
      </Route>
    </Routes>
  </BrowserRouter>
);
