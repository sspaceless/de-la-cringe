import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './BlurWrapper.module.css';

function BlurWrapper({ children, onClose }) {
  const wrapper = useRef();

  const onClick = (event) => {
    if (event.target === wrapper.current) onClose();
  };

  const onKeyPress = (event) => {
    if (event.code === 'Escape') {
      window.removeEventListener('keydown', onKeyPress);
      onClose();
    }
  };
  window.addEventListener('keydown', onKeyPress);

  return ReactDOM.createPortal(
    (// eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div ref={wrapper} className={styles.wrapper} onMouseDown={onClick}>
        {children}
      </div>
    ),
    document.getElementById('root')
  );
}

BlurWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default BlurWrapper;
