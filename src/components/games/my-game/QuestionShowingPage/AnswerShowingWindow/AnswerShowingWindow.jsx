import React from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import styles from './AnswerShowingWindow.module.css';

function AnswerShowingPage({ answer }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Правильна відповідь:</p>
      <Textfit max={35} className={styles.answer}>{answer}</Textfit>
    </div>
  );
}

AnswerShowingPage.propTypes = {
  answer: PropTypes.string.isRequired
};

export default AnswerShowingPage;
