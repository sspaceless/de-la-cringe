import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { quickPost } from '../../modules/quickfetch';
import Input from '../Input/Input';
import userContext from '../userContext';
import styles from './AuthWindow.module.css';
import Config from '../../config';

function SignInView({ hideFunction }) {
  const { reloadUserState } = useContext(userContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginError, setLoginError] = useState(false);

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const answer = await quickPost(`${Config.API_URL}/api/users/signInAccount`, { username, password });

      if (answer.success) {
        await reloadUserState();
        hideFunction();
      } else {
        setLoginError(true);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log('POST to signInAccount failed');
    }
  };

  const onUsernameChange = (value) => {
    setLoginError(false);
    setUsername(value);
  };

  const onPasswordChange = (value) => {
    setLoginError(false);
    setPassword(value);
  };

  return (
    <form action={`${Config.API_URL}/api/users/signInAccount`} method="POST" onSubmit={formSubmit}>
      <h1 className={styles.topText}>Login</h1>

      <label htmlFor="username">Username</label>
      <Input autoComplete="username" onChange={onUsernameChange} id="username" type="text" name="username" />

      <label htmlFor="password">Password</label>
      <Input autoComplete="current-password" onChange={onPasswordChange} id="password" type="password" name="password" />

      <input className={styles.submitBtn} type="image" src={`${Config.API_URL}/files/buttons/LogInButton.svg`} alt="Log In" disabled={isLoginError} />

      {isLoginError
        && <p className={[styles.center, styles.red].join(' ')}>The username or password is incorrect</p>}
    </form>
  );
}

SignInView.propTypes = { hideFunction: PropTypes.func.isRequired };

export default SignInView;
