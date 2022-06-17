import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Timer from '../../../Timer/Timer';
import styles from './ProgressBar.module.css';

function ProgressBar({
  until,
  generalTime,
  color = 'var(--purple)',
  width = '100%',
  height = '40px',
  backwards = false,
  timer = false,
  timerRef = undefined
}) {
  const [progressPercent, setProgressPercent] = useState(backwards ? 1 : 0);

  const update = (timeLeft) => {
    const percent = timeLeft / generalTime;

    setProgressPercent(backwards ? percent : 1 - percent);
  };

  const wrapperStyle = { width, height, lineHeight: `calc(${height} - 1px)` };
  const outerStyle = { borderColor: color };
  const innerStyle = {
    backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 10px, transparent 10px, transparent 20px)`,
    width: `${progressPercent * 100}%`
  };

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <div className={styles.timer}>
        <Timer
          timerRef={timerRef}
          untilDate={until}
          onStep={update}
          format="ss"
          step={10}
          textStyle={{ color: 'white' }}
          hidden={!timer}
          adaptive
        />
      </div>

      <div className={styles.outer} style={outerStyle}>
        <div className={styles.inner} style={innerStyle} />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  until: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  generalTime: PropTypes.number.isRequired,
  color: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  backwards: PropTypes.bool,
  timer: PropTypes.bool,
  timerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({})
  ])
};

ProgressBar.defaultProps = {
  color: 'var(--purple)',
  width: '100%',
  height: '40px',
  backwards: false,
  timer: false,
  timerRef: undefined
};

export default ProgressBar;
