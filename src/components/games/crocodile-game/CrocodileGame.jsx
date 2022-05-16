import { useState } from 'react';
import RoomConnect from '../RoomConnect';
import Canvas from './Canvas/Canvas';
import { CROCODILE_ID } from './config';

function CrocodileGame() {
  const [roomState, setRoomState] = useState({});
  const [roomId, setRoomId] = useState('');
  return (
    <RoomConnect setRoomState={setRoomState} setRoomId={setRoomId} gameId={CROCODILE_ID}>
      <div>
        <Canvas />
      </div>
    </RoomConnect>
  );
}

export default CrocodileGame;
