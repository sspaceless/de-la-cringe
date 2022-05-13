import PropTypes from 'prop-types';
import { useState, useEffect, useContext, useMemo } from 'react';
import { createRoom, joinRoom } from '../../../modules/room-connect';
import useInput from '../../../hooks/use-input';
import userContext from '../../userContext';
import styles from './RoomConnect.module.css';

function RoomConnect(props) {
  const { setRoomState, setRoomId, children, gameId } = props;

  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);

  const { userState } = useContext(userContext);
  const { username, avatarUrl } = userState.user;
  const userData = useMemo(() => ({ username, avatarUrl }), [username, avatarUrl]);

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
      joinRoom(gameId, userData, enteredRoomId, setState)
        .catch((e) => {
          setError(e);
        });
    }
  }, [
    gameId,
    userData,
    isInputRoomIdValid,
    isJoined,
    enteredRoomId,
    setRoomId,
    setRoomState
  ]);

  const buttonClickHanler = () => {
    const setState = (clientId, state) => {
      setRoomState({
        clientId,
        ...state
      });

      setIsJoined(true);
    };

    createRoom(gameId, userData, setRoomId, setState)
      .catch((e) => {
        console.log(e);
      });
  };

  const content = (
    <>
      <p>{'Введіть ID кімнати, до якої бажаєте під\'єднатися:'} </p>
      <input
        id="room-id"
        className={inputRoomIdHasError || error ? styles.error : ''}
        maxLength="4"
        value={enteredRoomId}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
      {inputRoomIdHasError && <p className={styles['error-text']}>Не вірний ID кімнати!</p>}
      {!inputRoomIdHasError && error && <p className={styles['error-text']}>{error.message}</p>}
      <button type="button" onClick={buttonClickHanler}> Нова гра </button>
    </>
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
