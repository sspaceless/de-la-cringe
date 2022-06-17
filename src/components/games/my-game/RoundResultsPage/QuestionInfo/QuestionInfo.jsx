import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import styles from './QuestionInfo.module.css';
import { Settings } from '../../MGConfig';

function QuestionInfo({ text, theme, price, answer, avatarUrl }) {
  const wrapperRef = useRef();

  setTimeout(() => {
    wrapperRef.current.classList.add(styles.visible);
  }, 0);

  const status = avatarUrl ? styles.green : styles.red;
  const fuelWidth = price / Settings.MAX_PRICE * 200;

  return (
    <div ref={wrapperRef} className={styles.questionWrapper}>
      <Textfit mode="multi" max="15" className={[styles.status, status].join(' ')}>{theme}</Textfit>

      <Textfit mode="multi" max="25" className={styles.text}>{text}</Textfit>

      <div className={styles.answerWrapper}>
        <p className={styles.answer}>Відповідь: {answer}</p>
        {avatarUrl
            && <img src={avatarUrl} alt="avatar" className={styles.avatar} />}
      </div>

      <div className={styles.fuel} style={{ width: fuelWidth }}>
        <span className={styles.points}>{price}</span>
      </div>
    </div>
  );
}

QuestionInfo.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default QuestionInfo;
