import React from 'react';
import PropTypes from 'prop-types';
import BlurWrapper from '../BlurWrapper/BlurWrapper';
import styles from './MessageWindow.module.css';

function MessageWindow({ children, timeout = 0, onClose }) {
  const timeoutId = setTimeout(onClose, timeout);

  const onUserClose = () => {
    clearTimeout(timeoutId);
    onClose();
  };

  return (
    <BlurWrapper onClose={onUserClose}>
      <div className={[styles.message, 'blurBack'].join(' ')}>{children}</div>
    </BlurWrapper>
  );
}

MessageWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number
};

MessageWindow.defaultProps = { timeout: 0 };

export default MessageWindow;
