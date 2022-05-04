import { useState } from 'react';
import { TAOL_ID } from './config';
import TaolMain from './TaolMain/TaolMain';
import RoomConnect from '../RoomConnect/RoomConnect';

function TaolGame() {
  const [roomState, setRoomState] = useState({});
  const [roomId, setRoomId] = useState('');

  return (
    <RoomConnect gameId={TAOL_ID} setRoomId={setRoomId} setRoomState={setRoomState}>
      <TaolMain roomId={roomId} roomState={roomState} />
    </RoomConnect>
  );
}

export default TaolGame;
