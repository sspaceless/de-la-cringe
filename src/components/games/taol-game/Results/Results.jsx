import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../../../../modules/room-connect';
import Answer from './Answer/Answer';

const NEXT_QUESTION_MESSAGE_TYPE = 'NEXT_QUESTION';
function Results(props) {
  const { roomState } = props;
  const { players, questionNumber, clientId } = roomState;
  const player = players[questionNumber];

  const answers = Array.from(player.question.answers.entries()).reverse();
  const votedAnswers = answers.filter((item) => item['1'].votes.length > 0);

  const isPlayerVip = players.find((item) => item.id === clientId).isVip === true;
  const isEndOfGame = isPlayerVip && questionNumber === players.length - 1;

  const navigate = useNavigate();

  const nextQuestionButtonClickHandler = () => {
    sendMessage(NEXT_QUESTION_MESSAGE_TYPE);
  };

  const endGameButtonClickHandler = () => {
    navigate('/');
  };

  const button = isEndOfGame
    ? <button type="button" onClick={endGameButtonClickHandler}>End game</button>
    : <button type="button" onClick={nextQuestionButtonClickHandler}>Next Question!</button>;

  return (
    <>
      <div>
        {votedAnswers.map((item) => (
          <Answer
            key={item[0]}
            answeredPlayerId={item[0]}
            answer={item[1]}
            players={players}
          />
        ))}
      </div>
      <div>
        {players.map((item) => (<p>{`${item.name} - ${item.points}`}</p>))}
      </div>
      {isPlayerVip && button}
    </>
  );
}

export default Results;

Results.propTypes = {
  roomState: PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    players: PropTypes.instanceOf(Array).isRequired,
    questionNumber: PropTypes.number.isRequired,
  }).isRequired,
};
