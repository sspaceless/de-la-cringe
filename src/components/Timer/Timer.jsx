import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import PropTypes from 'prop-types';

function Timer(props) {
  momentDurationFormatSetup(moment);

  const { untilDate, onAlarm, format, trim } = props;

  const momentD = moment(untilDate);

  const [curTime, setCurTime] = useState(moment());
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurTime(moment());
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (curTime >= untilDate) {
      clearInterval(interval.current);

      if (onAlarm) {
        onAlarm();
      }
    }
  }, [untilDate, curTime, onAlarm]);

  const time = moment.duration(momentD.diff(curTime)).format(format, { trim });

  return (
    <p>
      {time}
    </p>
  );
}

Timer.propTypes = {
  untilDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]).isRequired,
  onAlarm: PropTypes.func,
  format: PropTypes.string,
  trim: PropTypes.bool
};

Timer.defaultProps = {
  onAlarm: undefined,
  format: 'HH:mm:ss',
  trim: false
};

export default Timer;
