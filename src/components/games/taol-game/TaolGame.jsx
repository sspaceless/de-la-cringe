import { useState, useEffect } from 'react';
import { createRoom, joinRoom } from '../../../modules/room-connect';
import useInput from '../../../hooks/use-input';
import classes from './TaolGame.module.css';
import TaolMain from './MainScreen/TaolMain';

function TaolGame() {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [roomState, setRoomState] = useState({});
  const [error, setError] = useState(null);

  const {
    value: enteredRoomId,
    hasError: inputRoomIdHasError,
    isValid: isInputRoomIdValid,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
  } = useInput((value) => value.trim().length === 9);

  useEffect(() => {
    const setState = (clientId, state) => {
      setRoomState({
        clientId,
        ...state
      });

      setIsJoined(true);
      setRoomId(enteredRoomId);
    };

    if (isInputRoomIdValid && !isJoined) {
      joinRoom('taol', 'userName', enteredRoomId, setState)
        .catch((e) => {
          setError(e);
        });
    }
  }, [isInputRoomIdValid, isJoined, enteredRoomId]);

  const buttonClickHanler = () => {
    const setState = (clientId, state) => {
      setRoomState({
        clientId,
        ...state
      });

      setIsJoined(true);
    };

    createRoom('taol', 'userName', setRoomId, setState)
      .catch((e) => {
        console.log(e);
      });
  };

  const content = (
    <div>
      <button type="button" onClick={buttonClickHanler}> New game! </button>
      <label htmlFor="room-id">
        Room ID:
        <input
          id="room-id"
          maxLength="9"
          value={enteredRoomId}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
        />
        {inputRoomIdHasError && <p className={classes['error-text']}>Invalid room ID!</p>}
        {error && <p>{error.message}</p>}
      </label>
    </div>
  );

  return !isJoined ? content
    : <TaolMain roomId={roomId} roomState={roomState} />;
}

export default TaolGame;
