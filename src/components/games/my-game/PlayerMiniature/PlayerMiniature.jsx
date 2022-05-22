import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './PlayerMiniature.module.css';
import { Settings, ClientSettings } from '../MGConfig';
import MGContext from '../MGContext';

function pointsToPercentage(points, themesCount) {
  const total = Settings.PRICES.reduce((s, v) => s + v, 0) * themesCount;
  const maxPrice = Settings.MAX_PRICE;

  let max = total;
  let width = 0;

  for (let p = Math.abs(points); p > 0; p -= maxPrice) {
    const curWidth = max * ClientSettings.FUEL_BAR_MULTIPLIER;
    max -= curWidth;

    width += (Math.min(p, maxPrice) / maxPrice) * curWidth;
  }

  return width / total * 100;
}

function PlayerMiniature({ avatarUrl, points = 0, username, isVip = false }) {
  const { state } = useContext(MGContext);
  const themesCount = state.themes.length;

  const percent = pointsToPercentage(points, themesCount);
  const style = percent
    ? { width: `${percent}%`, left: 0 }
    : { width: 0, left: -10 };

  const cls = points < 0 ? styles.negative : '';

  return (
    <div className={styles.wrapper}>
      <img className={styles.avatar} src={avatarUrl} alt="Player's avatar" />

      <div className={styles.info}>
        <h1 className={styles.name}>{username}</h1>

        <div className={styles.fuelOuter} hidden={isVip}>
          <p className={styles.points}>{points}</p>

          <div className={[styles.fuelInner, cls].join(' ')} style={style} />
        </div>
      </div>
    </div>
  );
}

PlayerMiniature.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  points: PropTypes.number,
  isVip: PropTypes.bool
};

PlayerMiniature.defaultProps = {
  isVip: false,
  points: 0
};

export default PlayerMiniature;
