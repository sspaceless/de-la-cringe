import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import MGContext from '../../MGContext';
import { MessageTypes, Stages } from '../../MGConfig';
import config from '../../../../../config.json';
import styles from './QuestionWindow.module.css';
import Timer from '../../../../Timer/Timer';

function QuestionWindow({ radius, angle, canAnswer = false }) {
  const { state, stage, room } = useContext(MGContext);

  const [upscaled, setUpscaled] = useState(false);

  const maxWidth = document.getElementById('page').offsetWidth * 0.95;
  let r = radius * (upscaled ? 2.2 : 1);
  if (r * 2 > maxWidth) r = maxWidth / 2;

  const wrapperStyle = {
    width: Math.sqrt(r * r + r * r - 2 * r * r * Math.cos(angle)),
    height: Math.sqrt(r * r + r * r - 2 * r * r * Math.cos(Math.PI - angle)),
  };

  const questionStyle = {
    height: wrapperStyle.height - 110,
    width: wrapperStyle.width - 20,
    margin: 0,
    textAlign: 'center',
    position: 'absolute',
    whiteSpace: 'pre-wrap',
    opacity: 0
  };

  const [font, setFont] = useState();

  const icon = upscaled
    ? `${config.apiUrl}/files/games/my-game/downscaleIcon.svg`
    : `${config.apiUrl}/files/games/my-game/upscaleIcon.svg`;

  const requestAnswer = () => room.send(MessageTypes.ANSWER_REQUEST);

  const timerRef = useRef();

  const [paused, setPaused] = useState(false);
  if (stage !== Stages.QUESTION_SHOWING && !paused && timerRef.current) {
    timerRef.current.pause();
    setPaused(true);
  } else if (stage === Stages.QUESTION_SHOWING && paused && timerRef.current) {
    timerRef.current.resume();
    setPaused(false);
  }

  return (
    <div id="question" className={[styles.center, styles.questionWrapper].join(' ')} style={wrapperStyle}>
      <h1 className={styles.topic}>{state.round.curQuestion.theme}</h1>

      <Textfit mode="multi" max={(upscaled ? 45 : 25)} style={questionStyle} onReady={setFont}>
        {state.round.curQuestion.text}
      </Textfit>

      {font
        && (
          <p className={styles.question} style={{ fontSize: `${font}px` }}>
            {state.round.curQuestion.text}
          </p>
        )}

      <div className={[styles.scaleIcon, styles.aboveEl].join(' ')}>
        <input
          type="image"
          src={icon}
          alt="upscale"
          onClick={() => setUpscaled((x) => !x)}
        />
      </div>

      <div className={styles.bottom}>
        {canAnswer
          && (
            <div className={[styles.aboveEl, styles.answerWrapper].join(' ')}>
              <input className={styles.answerBtn} type="button" value="Відповісти" onClick={requestAnswer} />
            </div>
          )}

        <div className={[styles.aboveEl, styles.timer].join(' ')}>
          {state.questionWaitUntil
            && (
              <Timer
                timerRef={timerRef}
                untilDate={state.questionWaitUntil}
                format="ss"
                textStyle={{ color: 'white', fontSize: 21 }}
              />
            )}
        </div>
      </div>
    </div>
  );
}

QuestionWindow.propTypes = {
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  canAnswer: PropTypes.bool
};

QuestionWindow.defaultProps = {
  canAnswer: false
};

export default QuestionWindow;
