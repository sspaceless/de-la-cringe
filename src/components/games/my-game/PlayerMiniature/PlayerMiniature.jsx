import React from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import styles from './PlayerMiniature.module.css';
import FuelBar from '../FuelBar/FuelBar';

function PlayerMiniature({ avatar, points = 0, username, isVip = false, isAnswering }) {
  const wrapperStyle = isAnswering
    ? { outline: '5px inset var(--pink)' }
    : {};

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <img className={styles.avatar} src={avatar} alt="Player's avatar" />

      <div className={styles.info}>
        <Textfit className={styles.name}>{username}</Textfit>

        <div className={styles.fuel}>
          <FuelBar points={isVip ? undefined : points} />
        </div>
      </div>
    </div>
  );
}

PlayerMiniature.propTypes = {
  avatar: PropTypes.string.isRequired,
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
