import { useState } from 'react/cjs/react.production.min';
import { createRoom } from '../../../../modules/room-connect';
import useInput from '../../../../hooks/use-input';
import classes from './StartScreen.module.css';

function StartScreen() {
  const [roomState, setRoomState] = useState({});

  const {
    value: roomId,
    isValid: roomIdIsValid,
    hasError: roomIdHasError,
    valueChangeHandler: roomIdChangeHandler,
    inputBlurHandler: roomIdBlurHandler,
    reset: roomIdReset,
  } = useInput((value) => value.trim().lenght === 4);

  const buttonClickHanler = () => {
    createRoom('game1', 'userName', (state) => {
      setRoomState(...state);
    });
  };

  return (
    <div>
      <button type="button" onClick={buttonClickHanler}>
        New game!
      </button>
      <label htmlFor="room-id">
        Room ID:
        <input id="room-id" value={roomId} onChange={roomIdChangeHandler} onBlur={roomIdBlurHandler} />
        {roomIdHasError && <p className={classes['error-text']}>Invalid room ID!</p>}
      </label>
    </div>
  );
}

export default StartScreen;
