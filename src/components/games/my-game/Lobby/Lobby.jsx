import React, { useContext } from 'react';
import MGContext from '../MGContext';
import PlayerMiniature from '../PlayerMiniature/PlayerMiniature';
import { MessageTypes } from '../MGConfig';

function Lobby() {
  const { room, state, isHost } = useContext(MGContext);

  const players = [];

  state.players.forEach((p) => players.push(
    <PlayerMiniature key={p.id} username={p.name} avatarUrl={p.avatarUrl} />
  ));

  const start = () => {
    room.send(MessageTypes.START);
  };

  return (
    <div>
      <h1>Room ID: {room.id}</h1>

      <PlayerMiniature username={state.host.name} avatarUrl={state.host.avatarUrl} isVip />

      <hr />

      {players}

      {isHost
        && <input type="button" onClick={start} value="Start" />}
    </div>
  );
}

export default Lobby;
