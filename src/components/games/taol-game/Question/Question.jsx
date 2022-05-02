import propTypes from 'prop-types';
import useInput from '../../../../hooks/use-input';
import { sendMessage } from '../../../../modules/room-connect';

function Question(props) {
  // eslint-disable-next-line no-unused-vars
  const { roomId, question, questionFor, type, roomState } = props;
  const { players, clientId } = roomState;
  const { isAnswered } = players.find((item) => item.id === clientId);

  const {
    value: answer,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
    // reset: inputReset,
  } = useInput((value) => value.trim().length > 0);

  const sendAnswer = () => {
    sendMessage('ANSWER', { type, answer, questionFor });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
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

  if (questionFor === clientId && type === 'PUBLIC') {
    content = (
      <div>
        <p> Waiting for other players... </p>
      </div>
    );
  }

  return (
    <div>
      <h2>{question}</h2>
      {content}
      <ul>
        {playerList}
      </ul>
    </div>
  );
}

Question.propTypes = {
  question: propTypes.string.isRequired,
  questionFor: propTypes.string.isRequired,
  roomId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array).isRequired,
    clientId: propTypes.string.isRequired,
    stage: propTypes.string.isRequired,
  }).isRequired,
};

export default Question;
