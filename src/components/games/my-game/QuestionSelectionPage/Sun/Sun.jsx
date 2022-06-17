/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import config from '../../../../../config.json';
import styles from './Sun.module.css';

function Sun({ roundNum, rotation }) {
  const style = {
    transform: `rotateZ(${rotation}rad)`
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <img
          className={styles.star}
          style={style}
          src={`${config.apiUrl}/files/games/my-game/star.svg`}
          alt="Star"
        />
        <Textfit mode="single" className={styles.roundNum}>Round {roundNum}</Textfit>
      </div>
    </div>
  );
}

Sun.propTypes = {
  roundNum: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired
};

export default Sun;
