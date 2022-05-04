import PropTypes from 'prop-types';
import arrayShuffle from '../../../../modules/array-shuffle';
import { sendMessage } from '../../../../modules/room-connect';
import { VOTE_MESSAGE_TYPE } from '../config';

function Voting(props) {
  const { roomState } = props;
  const { players, questionNumber, clientId } = roomState;
  const { isAnswered } = players.find((item) => item.id === clientId);
  const player = players[questionNumber];
  const question = player.question.publicQuestion.replace('<PLAYER>', player.name);

  const answers = Array.from(player.question.answers.entries());
  const shuffledAnswers = arrayShuffle(answers.filter((item) => item[0] !== clientId));

  const voteClickHandler = (answerId) => {
    sendMessage(VOTE_MESSAGE_TYPE, { answerId });
  };

  let content = (
    <div>
      {shuffledAnswers.map((item) => (
        <button key={item[0]} type="button" onClick={voteClickHandler.bind(null, item[0])}>
          { item['1'].answer }
        </button>
      ))}
    </div>
  );

  if (clientId === player.id || isAnswered) {
    content = <p> Waiting for other players... </p>;
  }

  return (
    <div>
      <h2>{question}</h2>
      {content}
    </div>
  );
}

export default Voting;

Voting.propTypes = {
  roomState: PropTypes.shape({
    players: PropTypes.instanceOf(Array).isRequired,
    clientId: PropTypes.string.isRequired,
    questionNumber: PropTypes.number.isRequired,
  }).isRequired,
};
