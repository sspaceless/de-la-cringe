import { useState } from 'react';
import { createRoom, joinRoom } from '../../../modules/room-connect';
import useInput from '../../../hooks/use-input';
import classes from './TaolGame.module.css';
import TaolMain from './MainScreen/TaolMain';

function TaolGame() {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [roomState, setRoomState] = useState({});

  const {
    value: enteredRoomId,
    hasError: inputRoomIdHasError,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
  } = useInput((value) => value.trim().length === 9);

  const buttonClickHanler = () => {
    createRoom('taol', 'userName', setRoomId, (state) => {
      setRoomState({ players: Array.from(state.players) });
      setIsJoined(true);
    });
  };

  if (!inputRoomIdHasError && !isJoined) {
    joinRoom('taol', 'userName', enteredRoomId, (state) => {
      setRoomState({ players: Array.from(state.players) });
      setIsJoined(true);
      setRoomId(enteredRoomId);
    });
  }

  let content = (
    <div>
      <button type="button" onClick={buttonClickHanler}>
        New game!
      </button>
      <label htmlFor="room-id">
        Room ID:
        <input id="room-id" maxLength="9" value={enteredRoomId} onChange={inputChangeHandler} onBlur={inputBlurHandler} />
        {inputRoomIdHasError && <p className={classes['error-text']}>Invalid room ID!</p>}
      </label>
    </div>
  );

  if (isJoined === true) {
    content = <TaolMain roomId={roomId} roomState={roomState} />;
  }

  return (content);
}

export default TaolGame;
