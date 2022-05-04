import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { createRoom, joinRoom } from '../../../modules/room-connect';
import useInput from '../../../hooks/use-input';
import classes from './RoomConnect.module.css';
import userContext from '../../userContext';

function RoomConnect(props) {
  const { setRoomState, setRoomId, children, gameId } = props;

  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);

  const { userState } = useContext(userContext);
  const { username } = userState.user;

  const {
    valueChangeHandler: inputChangeHandler,
    hasError: inputRoomIdHasError,
    isValid: isInputRoomIdValid,
    value: enteredRoomId,
    inputBlurHandler,
  } = useInput((value) => value.trim().length === 4);

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
      joinRoom(gameId, username, enteredRoomId, setState)
        .catch((e) => {
          setError(e);
        });
    }
  }, [username, gameId, isInputRoomIdValid, isJoined, enteredRoomId, setRoomId, setRoomState]);

  const buttonClickHanler = () => {
    const setState = (clientId, state) => {
      setRoomState({
        clientId,
        ...state
      });

      setIsJoined(true);
    };

    createRoom(gameId, username, setRoomId, setState)
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
  children: PropTypes.element.isRequired,
  gameId: PropTypes.string.isRequired,
};

export default RoomConnect;
