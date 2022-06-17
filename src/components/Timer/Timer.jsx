/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

function Timer(props) {
  momentDurationFormatSetup(moment);

  const {
    timerRef = undefined,
    untilDate,
    onAlarm,
    format,
    trim,
    textStyle = undefined,
    step = 1000,
    onStep,
    hidden = false,
    adaptive = false,
    max = 100,
    min = 1
  } = props;

  const momentD = moment(untilDate);

  const [curTime, setCurTime] = useState(moment());
  const interval = useRef();

  useEffect(() => setCurTime(moment()), [untilDate]);

  const createInterval = useCallback(() => interval.current = setInterval(() => {
    setCurTime(moment());
  }, step), [step]);

  if (timerRef) {
    // eslint-disable-next-line no-param-reassign
    timerRef.current = {
      pause: () => clearInterval(interval.current),
      resume: createInterval
    };
  }

  useEffect(() => {
    if (interval.current && onStep) {
      onStep(momentD.diff(curTime), 0);
    }
  });

  useEffect(() => {
    createInterval();

    return () => clearInterval(interval.current);
  }, [createInterval]);

  useEffect(() => {
    if (curTime >= momentD) {
      clearInterval(interval.current);

      if (onAlarm) {
        onAlarm();
      }
    }
  }, [momentD, curTime, onAlarm]);

  const time = moment.duration(Math.max(momentD.diff(curTime), 0)).format(format, { trim });

  const style = { margin: 0, ...textStyle };

  if (adaptive) {
    return (
      <Textfit max={max} min={min} hidden={hidden ? 1 : 0} style={style}>
        {time}
      </Textfit>
    );
  }

  return (
    <p hidden={hidden ? 1 : 0} style={style}>
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
  textStyle: PropTypes.shape({}),
  adaptive: PropTypes.bool,
  timerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({})
  ]),
  max: PropTypes.number,
  min: PropTypes.number,
};

Timer.defaultProps = {
  onAlarm: undefined,
  format: 'HH:mm:ss',
  trim: false,
  step: 1000,
  onStep: undefined,
  hidden: false,
  textStyle: undefined,
  adaptive: false,
  timerRef: undefined,
  max: 100,
  min: 1,
};

export default Timer;
