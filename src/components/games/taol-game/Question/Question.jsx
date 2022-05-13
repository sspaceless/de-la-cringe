import PropTypes from 'prop-types';
import useInput from '../../../../hooks/use-input';
import Timer from '../../../Timer/Timer';
import PlayerList from '../PlayersList/PlayersList';
import { sendMessage } from '../../../../modules/room-connect';
import styles from './Question.module.css';
import * as constants from '../config';

function Question(props) {
  const { messageType, roomState } = props;
  const { players, clientId, questionNumber, timer: untilDate } = roomState;

  const player = players.find((item) => item.id === clientId);
  const { isAnswered, question: clientQuestion } = player;

  const questionFor = players[questionNumber];
  const question = messageType === constants.PUBLIC_MESSAGE_TYPE
    ? questionFor.question.publicQuestion
    : clientQuestion.personalQuestion;

  const task = messageType === constants.PUBLIC_MESSAGE_TYPE
    ? 'Вигадайте найбільшь правдиву відповідь, аби заплутати інших гравців ;)'
    : 'відповіді немає :(';

  const {
    value: answer,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler,
    reset: inputReset,
  } = useInput((value) => value.trim().length > 0);

  const sendAnswer = () => {
    const sendingAnswer = (answer.trim().length === 0)
      ? 'Нажаль, гравець не вигадав відповіді :('
      : answer;

    sendMessage(constants.ANSWER_MESSAGE_TYPE, {
      type: messageType,
      answer: sendingAnswer,
      questionFor: questionFor.id
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    sendAnswer();
    inputReset();
  };

  let content = (
    <>
      <Timer untilDate={untilDate} onAlarm={sendAnswer} format="ss" />
      <input
        maxLength="100"
        value={answer}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
      <button type="button" onClick={formSubmitHandler}>Відповісти</button>
    </>
  );

  if (isAnswered) {
    content = <p>Чудово :) Чекаємо на відповідь інших гравців...</p>;
  }

  const isPublicQuestionForClient = (
    questionFor.id === clientId && messageType === constants.PUBLIC_MESSAGE_TYPE
  );

  if (isPublicQuestionForClient) {
    content = <p>Чекаємо на відповідь інших гравців...</p>;
  }

  return (
    <div className={styles['question-stage']}>
      <div className={styles.form}>
        {!isPublicQuestionForClient && <p>{task}</p>}
        <div className={styles.question}><p>{question}</p></div>
        {content}
      </div>
      <PlayerList players={players} />
    </div>
  );
}

Question.propTypes = {
  messageType: PropTypes.string.isRequired,
  roomState: PropTypes.shape({
    questionNumber: PropTypes.number.isRequired,
    players: PropTypes.instanceOf('ArraySchema').isRequired,
    clientId: PropTypes.string.isRequired,
    timer: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
