import { useState } from 'react';
import { TAOL_ID } from './config';
import TaolMain from './TaolMain/TaolMain';
import RoomConnect from '../RoomConnect';
import styles from './TaolGame.module.css';

function TaolGame() {
  const [roomState, setRoomState] = useState({});
  const [roomId, setRoomId] = useState('');

  return (
    <div className={styles['taol-game']}>
      <h1>Мистецтво брехні</h1>
      <RoomConnect gameId={TAOL_ID} setRoomId={setRoomId} setRoomState={setRoomState}>
        <TaolMain roomId={roomId} roomState={roomState} />
      </RoomConnect>
    </div>
  );
}

export default TaolGame;
