import propTypes from 'prop-types';
import arrayShuffle from '../../../../modules/array-shuffle';
import { sendMessage } from '../../../../modules/room-connect';

function Voting(props) {
  const { roomState } = props;
  const { players, questionNumber, clientId } = roomState;
  const { isAnswered } = players.find((item) => item.id === clientId);
  const player = players[questionNumber];
  const question = player.question.publicQuestion.replace('<PLAYER>', player.name);

  const shuffledAnswers = arrayShuffle(Array.from(player.question.answers.entries()));

  const voteClickHandler = (answerId) => {
    sendMessage('VOTE', { answerId });
  };

  let content = (
    <div>
      {shuffledAnswers.map((item) => (
        <button type="button" onClick={voteClickHandler.bind(null, item[0])}>
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
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array).isRequired,
    clientId: propTypes.string.isRequired,
    stage: propTypes.string.isRequired,
    questionNumber: propTypes.number.isRequired,
  }).isRequired,
};
