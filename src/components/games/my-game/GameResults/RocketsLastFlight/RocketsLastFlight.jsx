import React, { useContext, useEffect, useState } from 'react';
import MGContext from '../../MGContext';
import Config from '../../../../../config';
import styles from './RocketsLastFlight.module.css';

function RocketsLastFlight() {
  const { state } = useContext(MGContext);

  const [angle, setAngle] = useState(Math.PI);

  useEffect(() => {
    const interval = setInterval(() => setAngle((r) => r - Math.PI / 1000), 10);

    return () => clearInterval(interval);
  }, [setAngle]);

  const pageDiv = document.getElementById('page');
  const width = pageDiv?.offsetWidth;
  const height = pageDiv?.offsetHeight;

  if (!width) return undefined;

  const left = Math.cos(angle) * width;
  const top = Math.sin(angle) * (height / 2 - 75);

  const rot = angle;

  const styleFirst = {
    transform: `translate(${left}px, ${top}px) rotateZ(${rot}rad)`
  };
  const styleSecond = {
    transform: `translate(${left}px, ${-top}px) rotateZ(${Math.abs(rot - Math.PI)}rad)`
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.rocketWrapper} style={styleFirst}>
        <img className={styles.avatar} src={state.host.avatar} alt="avatar" />
        <img className={styles.rocket} src={`${Config.API_URL}/files/games/my-game/emptyRocket.svg`} alt="rocket" />
      </div>

      <div className={styles.rocketWrapper2} style={styleSecond}>
        <img className={styles.avatar} src={state.winner.avatar} alt="avatar" />
        <img className={styles.rocket} src={`${Config.API_URL}/files/games/my-game/emptyRocket.svg`} alt="rocket2" />
      </div>

      <img className={styles.portalInner} src={`${Config.API_URL}/files/games/my-game/portalInner.svg`} alt="portal" />
      <img className={styles.portalOuter} src={`${Config.API_URL}/files/games/my-game/portalOuter.svg`} alt="portal" />

      {angle < Math.PI / 2
        && (
          <>
            <div className={styles.flash} style={{ '--mult': -1 }} />
            <div className={styles.flash} style={{ '--mult': 1 }} />
          </>
        )}
    </div>
  );
}

export default RocketsLastFlight;
