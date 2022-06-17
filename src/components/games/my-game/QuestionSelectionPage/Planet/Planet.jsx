/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import MGContext from '../../MGContext';
import Config from '../../../../../config';
import styles from './Planet.module.css';
import { MessageTypes } from '../../MGConfig';
import Orbit from '../Orbit/Orbit';

function Planet({ topic, prices, rotation, orbit: { angle, width, height }, onHover = undefined }) {
  const { room, player, state } = useContext(MGContext);
  const canChoose = state.lastAnsweredUserId === player.id || state.host.id === player.id;

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

  const imgRot = Math.atan(top / left) + (Math.PI / 2) * Math.sign(left);

  const orbit = {
    height: radPrice * 2,
    width: radPrice * 2,
    angle: 0
  };

  const onMouseEnter = () => {
    if (onHover) onHover(true);
  };

  const onMouseOut = () => {
    if (onHover) onHover(false);
  };

  return (
    <div
      className={styles.planet}
      style={{ transform: `translate(calc(-50% + ${left}px), calc(-50% + ${top}px))` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseOut}
    >
      <div className={styles.wrapper} key={topic}>
        <img
          className={styles.objImage}
          src={`${Config.API_URL}/files/games/my-game/planet.svg`}
          alt="Planet"
          style={{ transform: `rotateZ(${imgRot}rad)` }}
        />

        <Textfit mode="multi" className={styles.topic}>{topic}</Textfit>

        {prices.available.length > 0
          && (
            <Orbit orbit={orbit} dashed>
              {prices.available.map((price, i) => (
                <input
                  className={styles.satellite}
                  key={price}
                  type="button"
                  value={price}
                  onClick={priceClick(topic, price)}
                  disabled={canChoose ? 0 : 1}
                  style={{ transform: `translate(calc(-50% + ${leftPosPrice(i)}px), calc(-50% + ${topPosPrice(i)}px))` }}
                />
              ))}
            </Orbit>
          )}
      </div>
    </div>
  );
}

Planet.propTypes = {
  topic: PropTypes.string.isRequired,
  prices: PropTypes.any.isRequired,
  orbit: PropTypes.shape({
    angle: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired,
  onHover: PropTypes.func,
  rotation: PropTypes.number.isRequired
};

Planet.defaultProps = {
  onHover: undefined
};

export default Planet;
