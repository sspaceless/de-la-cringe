import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

const [a, b] = [5, 6];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="game">
        <Route path="тут gameId" />
        <Route path="тут gameId2" />
        <Route path="тут gameId3" />
      </Route>
    </Routes>
  </BrowserRouter>
);
