import PropTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import AnswerResult from './AnswerResult';
import * as constants from '../config';
import styles from './Results.module.css';

function Results(props) {
  const { roomState } = props;
  const { players, questionNumber, clientId } = roomState;
  const player = players[questionNumber];

  const options = Array.from(player.question.answers.entries()).reverse();
  const votedOptions = options.filter((item) => item['1'].votes.length > 0);

  const isPlayerVip = players.find((item) => item.id === clientId).isVip === true;
  const isEndOfGame = isPlayerVip && questionNumber === players.length - 1;

  const nextQuestionButtonClickHandler = () => {
    sendMessage(constants.NEXT_QUESTION_MESSAGE_TYPE);
  };

  const endGameButtonClickHandler = () => {
    sendMessage(constants.STAGE_MESSAGE_TYPE, { stage: constants.GAME_OVER_STAGE });
  };

  const button = isEndOfGame
    ? { text: 'Додому', onClick: endGameButtonClickHandler }
    : { text: 'Наступне питання', onClick: nextQuestionButtonClickHandler };

  return (
    <>
      <div className={styles.result}>
        {votedOptions.map((item) => (
          <AnswerResult
            key={item[0]}
            answeredPlayerId={item[0]}
            answer={item[1]}
            players={players}
          />
        ))}
      </div>
      <div className={styles['players-list']}>
        {players.map((item) => (
          <div key={item.id} className={styles.player}>
            <img alt="avatar" src={item.avatar} />
            <p>{`${item.name} - ${item.points}`}</p>
          </div>
        ))}
      </div>
      {isPlayerVip && <button type="button" onClick={button.onClick}>{button.text}</button>}
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
