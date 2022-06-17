import React, { useContext } from 'react';
import MGContext from '../MGContext';
import Timer from '../../../Timer/Timer';
import styles from './StartingCountPage.module.css';

function StartingCountPage() {
  const { state } = useContext(MGContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        <Timer untilDate={state.startingUntil} max={300} format="s" textStyle={{ color: 'white', height: '100%' }} adaptive />
      </div>
    </div>
  );
}

export default StartingCountPage;
