/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Orbit.module.css';

function Orbit({ orbit, children, dashed = false }) {
  const style = {
    height: orbit.height,
    width: orbit.width,
    transform: `translate(-50%, -50%) rotateZ(${orbit.angle / Math.PI * 180}deg)`,
    outlineStyle: dashed ? 'dashed' : 'solid'
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.orbit} style={style} />

      {children}
    </div>
  );
}

Orbit.propTypes = {
  orbit: PropTypes.shape({
    angle: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired,
  children: PropTypes.node,
  dashed: PropTypes.bool
};

Orbit.defaultProps = {
  children: null,
  dashed: false
};

export default Orbit;
