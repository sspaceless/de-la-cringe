/* eslint-disable react/forbid-prop-types */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MGContext from '../../MGContext';
import config from '../../../../../config.json';
import styles from './Planet.module.css';
import { MessageTypes } from '../../MGConfig';
import Orbit from '../Orbit/Orbit';

function Planet({ topic, rot = 0, prices, orbit: { angle, width, height } }) {
  const { room, player, state } = useContext(MGContext);
  const canChoose = state.lastAnsweredUserId === player.id || state.host.id === player.id;

  const [rotation, setRotation] = useState(rot);

  const priceClick = (top, price) => () => room.send(MessageTypes.QUESTION_SELECT, {
    theme: top,
    price
  });

  const left = (Math.cos(angle) * Math.cos(rotation) * width / 2)
  - (Math.sin(angle) * Math.sin(rotation) * height / 2);
  const top = (Math.sin(angle) * Math.cos(rotation) * width / 2)
  + (Math.cos(angle) * Math.sin(rotation) * height / 2);

  const len = prices.available.length;
  const radPrice = 100;
  const leftPosPrice = (i) => Math.cos(-rotation + Math.PI * 2 / len * (i + 1)) * radPrice;
  const topPosPrice = (i) => Math.sin(-rotation + Math.PI * 2 / len * (i + 1)) * radPrice;

  const imgRot = (Math.atan(top / left) * 180) / Math.PI + 90 * Math.sign(left);

  useEffect(() => {
    const interval = setInterval(() => setRotation((r) => r + Math.PI / 1100), 10);

    return () => clearInterval(interval);
  }, [setRotation]);

  const orbit = {
    height: radPrice * 2,
    width: radPrice * 2,
    angle: 0
  };

  return (
    <div className={styles.planet} style={{ transform: `translate(calc(-50% + ${left}px), calc(-50% + ${top}px))` }}>
      <Orbit orbit={orbit} dashed>
        <div className={styles.wrapper} key={topic}>
          <img
            className={styles.objImage}
            src={`${config.apiUrl}/files/games/my-game/planet.svg`}
            alt="Planet"
            style={{ transform: `rotateZ(${imgRot}deg)` }}
          />

          <h1>{topic}</h1>

          {prices.available.map((price, i) => (
            <input
              key={price}
              type="button"
              value={price}
              onClick={priceClick(topic, price)}
              disabled={canChoose ? 0 : 1}
              style={{ transform: `translate(calc(-50% + ${leftPosPrice(i)}px), calc(-50% + ${topPosPrice(i)}px))` }}
            />
          ))}
        </div>
      </Orbit>
    </div>
  );
}

Planet.propTypes = {
  topic: PropTypes.string.isRequired,
  prices: PropTypes.any.isRequired,
  rot: PropTypes.number,
  orbit: PropTypes.shape({
    angle: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired
};

Planet.defaultProps = { rot: 0 };

export default Planet;
