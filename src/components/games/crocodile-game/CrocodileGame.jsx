import { useState } from 'react';
import RoomConnect from '../RoomConnect';
import { CROCODILE_ID } from './config';
import CrocodileMain from './CrocodileMain/CrocodileMain';
import styles from './CrocodileGame.module.css';

function CrocodileGame() {
  const [roomState, setRoomState] = useState({});
  const [roomId, setRoomId] = useState('');

  return (
    <div className={styles['crocodile-game']}>
      <h1>Крокодил</h1>
      <RoomConnect setRoomState={setRoomState} setRoomId={setRoomId} gameId={CROCODILE_ID}>
        <CrocodileMain roomId={roomId} roomState={roomState} />
      </RoomConnect>
    </div>
  );
}

export default CrocodileGame;
