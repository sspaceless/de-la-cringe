import React from 'react';
import BlurWrapper from '../BlurWrapper/BlurWrapper';
import styles from './LoadingWindow.module.css';

function LoadingWindow() {
  return (
    <BlurWrapper>
      <img className={styles.loadingIcon} src="/loadingIcon.svg" alt="Loading..." />
    </BlurWrapper>
  );
}

export default LoadingWindow;
