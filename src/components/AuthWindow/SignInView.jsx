import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quickPost } from '../../quickfetch';
import Input from '../Input/Input';

function SignInView() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginError, setLoginError] = useState(false);

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const answer = await quickPost('http://localhost:3002/api/users/signInAccount', { username, password });

      if (answer.success) {
        navigate(0);
      } else {
        setLoginError(true);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log(' POST to signInAccount failed');
    }
  };

  const onUsernameChange = (value) => {
    setLoginError(false);
    setUsername(value);
  };

  return (
    <form action="http://localhost:3002/api/users/signInAccount" method="POST" onSubmit={formSubmit}>
      <h4>Sign In</h4>

      <Input onChange={onUsernameChange} type="text" name="username" />
      <Input onChange={setPassword} type="password" name="password" />

      <Input type="submit" value="Sign In" />
      {isLoginError
        && <p style={{ color: 'red' }}>The username or password is incorrect</p>}
    </form>
  );
}

export default SignInView;