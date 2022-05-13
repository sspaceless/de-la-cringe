import PropTypes from 'prop-types';
import arrayShuffle from '../../../../modules/array-shuffle';
import { sendMessage } from '../../../../modules/room-connect';
import { VOTE_MESSAGE_TYPE } from '../config';
import Timer from '../../../Timer/Timer';
import PlayerList from '../PlayersList/PlayersList';
import styles from './Voting.module.css';
import OptionsList from './OptionsList';

function Voting(props) {
  const { roomState } = props;
  const { players, questionNumber, clientId, timer: untilDate } = roomState;
  const { isAnswered } = players.find((item) => item.id === clientId);
  const player = players[questionNumber];
  const question = player.question.publicQuestion;

  const options = Array.from(player.question.answers.entries());
  const shuffledOptions = arrayShuffle(options.filter((item) => item[0] !== clientId));

  const voteButtonClickHandler = (answerId) => {
    sendMessage(VOTE_MESSAGE_TYPE, { answerId });
  };

  let content = (
    <>
      <Timer
        untilDate={untilDate}
        onAlarm={voteButtonClickHandler}
        format="ss"
      />
      <div className={styles.options}>
        <OptionsList
          options={shuffledOptions}
          onClick={voteButtonClickHandler}
        />
      </div>
    </>
  );

  if (clientId === player.id || isAnswered) {
    content = <p> Чекаємо поки інші гравці проголосують... </p>;
  }

  return (
    <div className={styles.voting}>
      <p>Оберіть правду:</p>
      <div className={styles.question}>
        <p>{question}</p>
      </div>
      {content}
      <PlayerList players={players} />
    </div>
  );
}

export default Voting;

Voting.propTypes = {
  roomState: PropTypes.shape({
    players: PropTypes.instanceOf(Array).isRequired,
    clientId: PropTypes.string.isRequired,
    questionNumber: PropTypes.number.isRequired,
    timer: PropTypes.string.isRequired,
  }).isRequired,
};
