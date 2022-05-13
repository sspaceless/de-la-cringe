import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import PropTypes from 'prop-types';

function Timer(props) {
  momentDurationFormatSetup(moment);

  const { untilDate, onAlarm, format, trim, step = 1000, onStep, hidden = false } = props;

  const momentD = moment(untilDate);
  const startTimeRef = useRef(moment());
  const startTime = startTimeRef.current;

  const [curTime, setCurTime] = useState(moment());
  const interval = useRef();

  useEffect(() => {
    if (interval.current && onStep) {
      onStep((curTime - startTime) / (momentD - startTime));
    }
  });

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurTime(moment());
    }, step);

    return () => clearInterval(interval.current);
  }, [step]);

  useEffect(() => {
    if (curTime >= untilDate) {
      clearInterval(interval.current);

      if (onAlarm) {
        onAlarm();
      }
    }
  }, [untilDate, curTime, onAlarm]);

  const time = moment.duration(Math.max(momentD.diff(curTime), 0)).format(format, { trim });

  return (
    <p hidden={hidden ? 1 : 0}>
      {time}
    </p>
  );
}

Timer.propTypes = {
  untilDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onAlarm: PropTypes.func,
  format: PropTypes.string,
  trim: PropTypes.bool,
  step: PropTypes.number,
  onStep: PropTypes.func,
  hidden: PropTypes.bool,
};

Timer.defaultProps = {
  onAlarm: undefined,
  format: 'HH:mm:ss',
  trim: false,
  step: 1000,
  onStep: undefined,
  hidden: false,
};

export default Timer;
