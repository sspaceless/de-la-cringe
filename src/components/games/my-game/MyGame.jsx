import React, { useContext } from 'react';
import Lobby from './Lobby/Lobby';
import MGContext from './MGContext';
import { States } from './MGConfig';

function MyGame() {
  const { stage } = useContext(MGContext);

  switch (stage) {
    case States.LOBBY:
      return <Lobby />;
    default:
      return <div>{stage}</div>;
  }
}

export default MyGame;
