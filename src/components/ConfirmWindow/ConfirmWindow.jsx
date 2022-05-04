import React from 'react';
import PropTypes from 'prop-types';
import BlurWrapper from '../BlurWrapper/BlurWrapper';
import styles from './ConfirmWindow.module.css';

function ConfirmWindow({ children, onClose, callback }) {
  const onButtonClick = (answer) => () => {
    onClose();
    callback(answer);
  };

  return (
    <BlurWrapper onClose={onClose}>
      <div className={[styles.confirm, 'blurBack'].join(' ')}>
        {children}

        <button
          className={[styles.btn, styles.okBtn, 'blurBack'].join(' ')}
          type="button"
          onClick={onButtonClick(true)}
        >
          Ok
        </button>
        <button
          className={[styles.btn, styles.cancelBtn, 'blurBack'].join(' ')}
          type="button"
          onClick={onButtonClick(false)}
        >
          Cancel
        </button>
      </div>
    </BlurWrapper>
  );
}

ConfirmWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  callback: PropTypes.func.isRequired
};

export default ConfirmWindow;
