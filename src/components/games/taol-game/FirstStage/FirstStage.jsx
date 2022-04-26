import propTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
function FirstStage({ roomId, roomState }) {
  const { questions, players, clientId } = roomState;

  const { questionId } = players.find((player) => player.id === clientId);
  const { personalQuestion } = questions.find((question) => question.id === questionId);

  return (
    <div>
      <h2>{personalQuestion}</h2>
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
