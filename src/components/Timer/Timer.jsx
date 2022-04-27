import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer(props) {
  const { untilDate, onAlarm } = props;

  const [curTime, setCurTime] = useState(new Date());
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurTime(new Date());
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

  const normalize = (number) => String(number).padStart(2, '00');

  const time = Math.max((untilDate.getTime() - curTime.getTime()) / 1000, 0);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const scs = Math.floor(time - minutes * 60);

  return (
    <p>
      {normalize(hours)}
      :
      {normalize(minutes)}
      :
      {normalize(scs)}
    </p>
  );
}

Timer.propTypes = {
  untilDate: PropTypes.instanceOf(Date).isRequired,
  onAlarm: PropTypes.func
};

Timer.defaultProps = { onAlarm: undefined };

export default Timer;
