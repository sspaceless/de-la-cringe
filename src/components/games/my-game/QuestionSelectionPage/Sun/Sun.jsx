/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../../config.json';
import styles from './Sun.module.css';

function Sun({ roundNum }) {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <img className={styles.star} src={`${config.apiUrl}/files/games/my-game/star.svg`} alt="Star" />
        <h1>Round {roundNum}</h1>
      </div>
    </div>
  );
}

Sun.propTypes = {
  roundNum: PropTypes.number.isRequired
};

export default Sun;
