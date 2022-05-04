import PropTypes from 'prop-types';

function Answer(props) {
  const { answeredPlayerId, answer, players } = props;
  const { answer: answerText, votes, isTruth } = answer;

  const votedPlayers = players.filter((item) => votes.includes(item.id));
  const answeredPlayer = players.find((item) => item.id === answeredPlayerId);

  const resultText = isTruth
    ? 'Truth!'
    : `${answeredPlayer.name} lies!`;

  return (
    <>
      <p>{answerText}</p>
      <p>{resultText}</p>
      <div>
        Voted players:
        {votedPlayers.map((item) => item.name)}
      </div>
    </>
  );
}

export default Answer;

Answer.propTypes = {
  answer: PropTypes.shape({
    answer: PropTypes.string.isRequired,
    votes: PropTypes.shape(Array).isRequired,
    isTruth: PropTypes.bool.isRequired,
  }).isRequired,
  answeredPlayerId: PropTypes.string.isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
};
