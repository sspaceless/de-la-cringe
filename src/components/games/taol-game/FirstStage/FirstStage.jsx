import propTypes from 'prop-types';
import useInput from '../../../../hooks/use-input';

// eslint-disable-next-line no-unused-vars
function FirstStage({ roomId, roomState }) {
  const { questions, players, clientId } = roomState;
  const { questionId } = players.find((player) => player.id === clientId);
  const { personalQuestion } = questions.find((question) => question.id === questionId);

  const {
    value: answer,
    hasError: answerHasError,
    isValid: isAnswerValid,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler
  } = useInput((value) => value.trim().length > 0);

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>{personalQuestion}</h2>
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
}

FirstStage.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    questions: propTypes.instanceOf(Array).isRequired,
    players: propTypes.instanceOf(Array).isRequired,
    clientId: propTypes.string.isRequired,
  }).isRequired,
};

export default FirstStage;
