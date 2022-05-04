import { useState } from 'react';
import TaolMain from './TaolMain/TaolMain';
import RoomConnect from '../RoomConnect/RoomConnect';

const TAOL_ID = 'taol';

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
