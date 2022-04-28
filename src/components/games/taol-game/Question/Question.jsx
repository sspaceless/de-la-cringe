import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import propTypes from 'prop-types';
import useInput from '../../../../hooks/use-input';
import { sendMessage } from '../../../../modules/room-connect';

// eslint-disable-next-line no-unused-vars
function Question({ roomId, question, players, clientId, type, time }) {
  const { isAnswered } = players.find((item) => item.id === clientId);

  const {
    value: answer,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
    reset: inputReset,
  } = useInput((value) => value.trim().length > 0);

  const sendAnswer = () => {
    sendMessage('ANSWER', { type, answer });
    inputReset();
  };

  const { start, restart, seconds } = useTimer({
    expiryTimestamp: time,
    onExpire: sendAnswer
  });

  useEffect(() => {
    start();
  }, [start]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    restart(new Date(), false);
    sendAnswer();
  };

  const playerList = players.map((player) => {
    const isReady = player.isAnswered;
    return (
      <li key={player.id}>
        {`${player.name} ${isReady ? 'ready' : ''}`}
      </li>
    );
  });

  let content = (
    <div>
      <h2>{question}</h2>
      <p>{`${seconds} sec left...`}</p>
      <form onSubmit={formSubmitHandler}>
        <input
          maxLength="100"
          maxvalue={answer}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
        />
        <button type="submit">Send!</button>
      </form>
    </div>
  );

  if (isAnswered) {
    content = (
      <div>
        <p> God job:) Waiting for other players... </p>
      </div>
    );
  }

  return (
    <div>
      {content}
      <ul>
        {playerList}
      </ul>
    </div>
  );
}

Question.propTypes = {
  clientId: propTypes.string.isRequired,
  question: propTypes.string.isRequired,
  players: propTypes.instanceOf(Array).isRequired,
  roomId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  time: propTypes.instanceOf(Date).isRequired
};

export default Question;
