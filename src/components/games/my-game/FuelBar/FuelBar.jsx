import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Settings, ClientSettings } from '../MGConfig';
import MGContext from '../MGContext';
import styles from './FuelBar.module.css';

function pointsToPercentage(points, themesCount) {
  let total = Settings.PRICES.reduce((s, v) => s + v, 0) * themesCount;
  total += Math.ceil(themesCount / 2) * Settings.MAX_PRICE * Settings.EXTRA_MULTIPLIER;

  const mult = ClientSettings.FUEL_BAR_MULTIPLIER;

  return (mult ** (Math.abs(points) / total) - 1) / (mult - 1) * 100;
}

function FuelBar({ points = undefined, radius = '6px', height = '40px', color = 'var(--grey)' }) {
  const { state } = useContext(MGContext);
  const themesCount = state.themes.length;

  const percent = pointsToPercentage(points, themesCount);

  const style = percent
    ? { width: `${percent}%`, left: 0 }
    : { width: 0, left: -10 };

  const cls = points < 0 ? styles.negative : '';

  let fuelInner;

  const textStyle = {
    lineHeight: height
  };

  if (points !== undefined) {
    fuelInner = (
      <>
        <p className={styles.points} style={textStyle}>{points}</p>
        <div className={[styles.fuelInner, cls].join(' ')} style={style} />
      </>
    );
  } else {
    fuelInner = (
      <p className={styles.points} style={textStyle}>Ведучий</p>
    );
  }

  const outerStyle = {
    borderRadius: radius,
    height,
    backgroundColor: color
  };

  return (
    <div className={styles.fuelOuter} style={outerStyle}>
      {fuelInner}
    </div>
  );
}

FuelBar.propTypes = {
  points: PropTypes.number,
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  color: PropTypes.string
};

FuelBar.defaultProps = {
  points: undefined,
  radius: '6px',
  height: '40px',
  color: 'var(--grey)'
};

export default FuelBar;
