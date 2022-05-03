import React from 'react';
import styles from './LoadingWindow.module.css';

function LoadingWindow() {
  return (
    <img className={styles.loadingIcon} src="loadingIcon.svg" alt="Loading..." />
  );
}

export default LoadingWindow;
