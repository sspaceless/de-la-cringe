import React, { useContext } from 'react';
import MGContext from '../MGContext';
import { MessageTypes } from '../MGConfig';

function Lobby() {
  const { room, isHost } = useContext(MGContext);

  const start = () => {
    room.send(MessageTypes.START);
  };

  return (
    <div>
      <h1>Room ID: {room.id}</h1>

      {isHost
        && <input type="button" onClick={start} value="Start" />}
    </div>
  );
}

export default Lobby;
