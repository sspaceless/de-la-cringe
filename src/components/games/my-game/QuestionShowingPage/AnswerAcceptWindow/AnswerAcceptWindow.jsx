import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import MGContext from '../../MGContext';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { MessageTypes, Settings } from '../../MGConfig';
import styles from './AnswerAcceptWindow.module.css';

function AnswerAcceptWindow({ answeringPlayer, answer }) {
  const { room, state } = useContext(MGContext);

  const sendAnswerDecision = (decision) => () => room.send(
    MessageTypes.ANSWER_DECISION,
    { accepted: decision }
  );

  return (
    <div className={styles.wrapper}>
      <Textfit max={25} className={styles.text}>
        Відповідає гравець: <span className={styles.pink}>{answeringPlayer.name}</span>
      </Textfit>

      <Textfit mode="multi" max={25} className={styles.answer}>
        Відповідь: <span className={styles.pink}>{answer}</span>
      </Textfit>

      <div className={styles.buttons}>
        <input className={styles.leftBtn} type="button" value="Right" onClick={sendAnswerDecision(true)} />
        <input className={styles.rightBtn} type="button" value="Wrong" onClick={sendAnswerDecision(false)} />
      </div>

      <ProgressBar
        generalTime={Settings.TIME_FOR_ANSWER_WAITING}
        until={state.answerWaitUntil}
        height="30px"
        color="var(--pink)"
        timer
        backwards
      />
    </div>
  );
}

AnswerAcceptWindow.propTypes = {
  answeringPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  answer: PropTypes.string.isRequired
};

export default AnswerAcceptWindow;
