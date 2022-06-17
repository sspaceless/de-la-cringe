import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlayerMiniature.module.css';
import FuelBar from '../FuelBar/FuelBar';

function PlayerMiniature({ avatarUrl, points = 0, username, isVip = false, isAnswering }) {
  const wrapperStyle = isAnswering
    ? { outline: '5px inset var(--pink)' }
    : {};

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <img className={styles.avatar} src={avatarUrl} alt="Player's avatar" />

      <div className={styles.info}>
        <h1 className={styles.name}>{username}</h1>

        <div className={styles.fuel}>
          <FuelBar points={isVip ? undefined : points} />
        </div>
      </div>
    </div>
  );
}

PlayerMiniature.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  points: PropTypes.number,
  isVip: PropTypes.bool,
  isAnswering: PropTypes.bool
};

PlayerMiniature.defaultProps = {
  isVip: false,
  points: 0,
  isAnswering: false
};

export default PlayerMiniature;
