import React, { useState } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import { quickPost } from '../../modules/quickfetch';
import styles from './AuthWindow.module.css';
import Config from '../../config';

const rules = {
  username: [
    {
      test: (str) => validator.isLength(str, { min: 6, max: 20 }),
      message: '6-20 Characters'
    },
    {
      test: (str) => validator.isAlphanumeric(str, undefined, { ignore: '_-' }),
      message: 'Allowed symbols: A-Z a-z 0-9 _ -'
    },
  ],
  password: [
    {
      test: (str) => validator.isLength(str, { min: 8, max: 20 }),
      message: '8-20 Characters'
    },
    {
      test: (str) => validator.matches(str, /[A-Z]/),
      message: 'At least one capital letter'
    },
    {
      test: (str) => validator.matches(str, /[a-z]/),
      message: 'At least one small letter'
    },
    {
      test: (str) => validator.matches(str, /[0-9]/),
      message: 'At least one number'
    },
    {
      test: (str) => validator.matches(str, '[ !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]'),
      message: 'At least one special symbol'
    }
  ]
};

function SignUpView({ accountCreatedCallback = undefined }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCreateError, setCreateError] = useState(false);

  let isError = false;

  const checkRules = (testRules, element) => testRules.map((rule, i) => {
    const checkRes = rule.test(element);
    const stl = checkRes ? styles.green : styles.red;

    if (!checkRes) isError = true;

    // eslint-disable-next-line react/no-array-index-key
    return <p key={i} className={[styles.testMsg, stl].join(' ')}>{rule.message}</p>;
  });

  const usernameRules = checkRules(rules.username, username);

  const passwordRules = checkRules(rules.password, password);

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await quickPost(`${Config.API_URL}/api/users/createAccount`, { username, password });

      if (!result.success) {
        setCreateError(true);
      } else if (accountCreatedCallback) {
        accountCreatedCallback(result.user);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log('POST to createAccount failed');
    }
  };

  const onUsernameChange = (value) => {
    setCreateError(false);
    setUsername(value);
  };

  const onPasswordChange = (value) => {
    setCreateError(false);
    setPassword(value);
  };

  return (
    <form action={`${Config.API_URL}/api/users/createAccount`} method="POST" onSubmit={formSubmit}>
      <h1 className={styles.topText}>Create Account</h1>

      <label htmlFor="username">Username</label>
      <div className={styles.inputBlock}>
        <Input autoComplete="username" onChange={onUsernameChange} id="username" type="text" name="username" />

        <div className={[styles.testMessages, styles.rightMsg, 'blurBack'].join(' ')}>
          {usernameRules}
        </div>
      </div>

      <label htmlFor="password">Password</label>
      <div className={styles.inputBlock}>
        <Input autoComplete="new-password" onChange={onPasswordChange} type="password" name="password" />

        <div className={[styles.testMessages, styles.leftMsg, 'blurBack'].join(' ')}>
          {passwordRules}
        </div>
      </div>

      <input className={styles.submitBtn} type="image" src={`${Config.API_URL}/files/buttons/SignUpButton.svg`} alt="Sign Up" disabled={isCreateError || isError} />
      {isCreateError
        && <p className={[styles.red, styles.center].join(' ')}>This username is already in use</p>}
    </form>
  );
}

SignUpView.propTypes = { accountCreatedCallback: PropTypes.func };

SignUpView.defaultProps = { accountCreatedCallback: undefined };

export default SignUpView;
