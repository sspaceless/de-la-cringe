import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MGContext from '../../MGContext';
import { Settings } from '../../MGConfig';
import ProgressBar from '../../ProgressBar/ProgressBar';
import styles from './AnsweringWindow.module.css';

function AnsweringWindow({ answeringPlayer, isAnswering }) {
  const { state } = useContext(MGContext);

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        {!isAnswering
          ? `Відповідає гравець: ${answeringPlayer.name}`
          : 'Ви відповідаєте'}
      </p>

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

AnsweringWindow.propTypes = {
  answeringPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  isAnswering: PropTypes.bool.isRequired
};

export default AnsweringWindow;
