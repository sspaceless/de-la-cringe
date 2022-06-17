/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect, useState } from 'react';
import MGContext from '../../MGContext';
import Orbit from '../Orbit/Orbit';
import Planet from '../Planet/Planet';
import useForceUpdate from '../../../../../hooks/use-force-update';
import Sun from '../Sun/Sun';

function SolarSystem() {
  const { state } = useContext(MGContext);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);

    return () => window.removeEventListener('resize', forceUpdate);
  }, [forceUpdate]);

  const pageDiv = document.getElementById('page');
  const width = pageDiv.clientWidth;
  const height = pageDiv.clientHeight;
  const multiplier = ((width / height * 1.67) - 1.67);

  const orbitAngle = multiplier * -Math.PI / 16;
  const orbitHeight = height / 1.6;
  const orbitWidth = width / (1.6 - 0.25 * multiplier);

  const orbit = {
    angle: orbitAngle,
    height: orbitHeight,
    width: orbitWidth
  };

  const [speed, setSpeed] = useState(1 / 1100);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRotation((r) => r + Math.PI * speed), 10);

    return () => clearInterval(interval);
  }, [setRotation, speed]);

  const planets = [];

  let i = 0;
  state.round.themes.forEach((prices, topic) => planets.push(
    <Planet
      key={topic}
      speed={speed}
      topic={topic}
      prices={prices}
      rotation={i++ * Math.PI + rotation}
      orbit={orbit}
      onHover={(b) => (b ? setSpeed(1 / 5000) : setSpeed(1 / 1100))}
    />
  ));

  return (
    <Orbit orbit={orbit}>
      <Sun rotation={rotation} roundNum={state.round.num} />

      {planets}
    </Orbit>
  );
}

export default SolarSystem;
