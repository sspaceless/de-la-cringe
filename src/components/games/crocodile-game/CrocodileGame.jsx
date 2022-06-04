import { useState } from 'react';
import RoomConnect from '../RoomConnect';
import { CROCODILE_ID } from './config';
import CrocodileMain from './CrocodileMain/CrocodileMain';

function CrocodileGame() {
  const [roomState, setRoomState] = useState({});
  const [roomId, setRoomId] = useState('');

  return (
    <RoomConnect setRoomState={setRoomState} setRoomId={setRoomId} gameId={CROCODILE_ID}>
      <CrocodileMain roomId={roomId} roomState={roomState} />
    </RoomConnect>
  );
}

export default CrocodileGame;
