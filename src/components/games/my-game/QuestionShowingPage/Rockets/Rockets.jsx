import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MGContext from '../../MGContext';
import Config from '../../../../../config';
import styles from './Rockets.module.css';

function Rockets({ style = {} }) {
  const { state } = useContext(MGContext);

  const positions = [[[0, 0]], [[-35, 0], [35, 0]], [[-35, 45], [35, 45], [0, -45]]];

  let rockets = new Array(Math.min(state.players.size, 3)).fill(undefined);
  const rocketUrl = `${Config.API_URL}/files/games/my-game/rocket.svg`;

  rockets = rockets.map((_, i) => {
    const pos = positions[rockets.length - 1];

    const rocketStyle = {
      transform: `translateX(calc(${pos[i][0]}px - 50%)) translateY(calc(${pos[i][1]}px - 50%))`
    };

    return (
      <img className={styles.rocket} src={rocketUrl} alt={`rocket${i}`} key={`rocket${i}`} style={rocketStyle} />
    );
  });

  return (
    <div className={styles.wrapper} style={style}>
      {rockets}
    </div>
  );
}

Rockets.propTypes = {
  style: PropTypes.shape({})
};

Rockets.defaultProps = {
  style: {}
};

export default Rockets;
