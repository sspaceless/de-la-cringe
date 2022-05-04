import React from 'react';
import PropTypes from 'prop-types';
import BlurWrapper from '../BlurWrapper/BlurWrapper';
import styles from './Message.module.css';

function MsgWindow({ children, timeout = 0, onClose }) {
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

MsgWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number
};

MsgWindow.defaultProps = { timeout: 0 };

export default MsgWindow;
