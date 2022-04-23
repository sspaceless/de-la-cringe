import React, { useState } from 'react';
import validator from 'validator';
import propTypes from 'prop-types';
import Input from '../Input/Input';
import { quickPost } from '../../modules/quickfetch';

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

  let isValid = !isCreateError;

  const usernameRules = rules.username.map((rule, i) => {
    let color;
    if (rule.test(username)) {
      color = 'green';
    } else {
      color = 'red';
      isValid = false;
    }

    // eslint-disable-next-line react/no-array-index-key
    return <p key={i} style={{ color }}>{rule.message}</p>;
  });

  const passwordRules = rules.password.map((rule, i) => {
    let color;
    if (rule.test(password)) {
      color = 'green';
    } else {
      color = 'red';
      isValid = false;
    }

    // eslint-disable-next-line react/no-array-index-key
    return <p key={i} style={{ color }}>{rule.message}</p>;
  });

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await quickPost('http://localhost:3002/api/users/createAccount', { username, password });

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

  return (
    <form action="http://localhost:3002/api/users/createAccount" method="POST" onSubmit={formSubmit}>
      <h4>Sign Up</h4>

      <Input onChange={onUsernameChange} type="text" name="username" />
      {usernameRules}

      <Input onChange={setPassword} type="password" name="password" />
      {passwordRules}

      <Input type="submit" disabled={!isValid} value="Sign Up" />
      {isCreateError
        && <p style={{ color: 'red' }}>This username is already in use</p>}
    </form>
  );
}

SignUpView.propTypes = { accountCreatedCallback: propTypes.func };

SignUpView.defaultProps = { accountCreatedCallback: undefined };

export default SignUpView;
