import PropTypes from 'prop-types';
import useInput from '../../../../hooks/use-input';
import { sendMessage } from '../../../../modules/room-connect';

const ANSWER_MESSAGE_TYPE = 'ANSWER';
const PUBLIC_MESSAGE_TYPE = 'PUBLIC';

const PLAYER_MASK = '<PLAYER>';

function Question(props) {
  const { type, roomState } = props;
  const { players, clientId, questionNumber } = roomState;
  const { isAnswered } = players.find((item) => item.id === clientId);
  const questionFor = players[questionNumber];
  const question = questionFor.question.publicQuestion.replace(PLAYER_MASK, questionFor.name);

  const {
    value: answer,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
    // reset: inputReset,
  } = useInput((value) => value.trim().length > 0);

  const sendAnswer = () => {
    sendMessage(ANSWER_MESSAGE_TYPE, { type, answer, questionFor });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    sendAnswer();
  };

  const playerList = players.map((item) => {
    const isReady = item.isAnswered;
    return (
      <li key={item.id}>
        {`${item.name} ${isReady ? 'ready' : ''}`}
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

  if (questionFor === clientId && type === PUBLIC_MESSAGE_TYPE) {
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
  type: PropTypes.string.isRequired,
  roomState: PropTypes.shape({
    questionNumber: PropTypes.number.isRequired,
    players: PropTypes.instanceOf(Array).isRequired,
    clientId: PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
