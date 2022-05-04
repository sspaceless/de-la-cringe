import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import BlurWrapper from '../BlurWrapper/BlurWrapper';
import styles from './AuthWindow.module.css';

function AuthWindow({ hideFunction }) {
  const [isSignInShown, setSignInShown] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const curWin = useRef();

  const toggleAuthWin = () => {
    if (isRotating) return;

    curWin.current.classList.add(styles.rotating);
    setIsRotating(true);

    curWin.current.onanimationend = () => {
      setSignInShown(!isSignInShown);

      curWin.current.onanimationend = () => {
        curWin.current.classList.remove(styles.rotating);
        setIsRotating(false);
      };
    };
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <BlurWrapper onClose={hideFunction}>
      <div ref={curWin} className={[styles.authWin, 'blurBack'].join(' ')}>
        {isSignInShown
          ? <SignInView hideFunction={hideFunction} />
          : <SignUpView accountCreatedCallback={() => setSignInShown(true)} />}

        <hr />

        {isSignInShown
          // eslint-disable-next-line
          ? <p className={styles.bottomText}>Don{'\''}t have an account? <a href='#' onClick={toggleAuthWin}>Create one!</a></p>
          // eslint-disable-next-line
          : <p className={styles.bottomText}>Already have an account? <a href='#' onClick={toggleAuthWin}>Sign in!</a></p>}
      </div>
    </BlurWrapper>
  );
}

AuthWindow.propTypes = { hideFunction: PropTypes.func.isRequired };

export default AuthWindow;
