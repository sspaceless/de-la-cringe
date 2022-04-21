import { useState } from 'react';
import { createRoom, joinRoom } from '../../../../modules/room-connect';
import useInput from '../../../../hooks/use-input';
import classes from './Game1Start.module.css';
import Game1Main from '../MainScreen/MainScreen';

function Game1Screen() {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [roomState, setRoomState] = useState({
  });

  const {
    value: enteredRoomId,
    hasError: inputRoomIdHasError,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
    // reset: roomIdReset,
  } = useInput((value) => value.trim().length === 9);

  const buttonClickHanler = () => {
    createRoom('game1', 'userName', setRoomId, (state) => {
      setRoomState(state);
      setIsJoined(true);
    });
  };

  if (!inputRoomIdHasError && !isJoined) {
    joinRoom('game1', 'userName', enteredRoomId, (state) => {
      setRoomState(state);
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
    content = <Game1Main roomId={roomId} />;
  }

  return (content);
}

export default Game1Screen;
