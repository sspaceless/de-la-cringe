import PropTypes from 'prop-types';
import styles from './AnswerResult.module.css';
import VotedPlayers from './VotedPlayers';

function Answer(props) {
  const { answeredPlayerId, answer, players } = props;
  const { answer: answerText, votes, isTruth } = answer;

  const votedPlayers = players.filter((item) => votes.includes(item.id));
  const answeredPlayer = players.find((item) => item.id === answeredPlayerId);

  const resultText = isTruth
    ? 'Щира правда :)'
    : `${answeredPlayer.name} бреше!`;

  return (
    <div className={styles.results}>
      <p>{answerText}</p>
      <p>Гравці, що обрали цю відповідь:</p>
      <div className={styles['voted-players']}>
        <VotedPlayers className={styles['voted-players']} players={votedPlayers} />
      </div>
      <p>{resultText}</p>
    </div>
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
