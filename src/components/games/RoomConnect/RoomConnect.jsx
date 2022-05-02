import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createRoom, joinRoom } from '../../../modules/room-connect';
import useInput from '../../../hooks/use-input';
import classes from './RoomConnect.module.css';

function RoomConnect(props) {
  const { setRoomState, setRoomId, children } = props;
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);

  const {
    valueChangeHandler: inputChangeHandler,
    hasError: inputRoomIdHasError,
    isValid: isInputRoomIdValid,
    value: enteredRoomId,
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
  }, [isInputRoomIdValid, isJoined, enteredRoomId, setRoomId, setRoomState]);

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

  return isJoined ? children : content;
}

RoomConnect.propTypes = {
  setRoomState: PropTypes.func.isRequired,
  setRoomId: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default RoomConnect;
