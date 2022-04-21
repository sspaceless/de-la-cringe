import React, { useState } from 'react';
import validator from 'validator';
import Input from '../Input/Input';

function AuthWindow() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let usernameWarnings = '';
  let isUsernameValid = true;
  let passwordWarnings = '';
  let isPasswordValid = true;

  if (!username) isUsernameValid = false;
  if (!validator.isLength(username, { min: 6, max: 20 })) {
    isUsernameValid = false;
    usernameWarnings += 'Длина имени пользователя должна быть в границах 6-20 символов<b>';
  }
  if (!validator.isAlphanumeric(username)) {
    isUsernameValid = false;
    usernameWarnings += 'Имя пользователя содержит запрещенные символы<b>';
  }

  if (!password) isPasswordValid = false;
  if (!validator.isLength(password, { min: 8, max: 20 })) {
    isPasswordValid = false;
    passwordWarnings += 'Длина пароля должна быть в границах 8-20 символов<b>';
  }
  if (!validator.isStrongPassword(password)) {
    isPasswordValid = false;
    passwordWarnings += 'Пароль недостаточно сложный<b>';
  }

  return (
    <form action="api/users/createAccount" method="POST">
      <h4>Sign In</h4>

      <Input onClick={setUsername} type="text" name="username" />
      <p>{usernameWarnings}</p>

      <Input onClick={setPassword} type="password" name="password" />
      <p>{passwordWarnings}</p>

      <Input type="submit" disabled={!(isUsernameValid && isPasswordValid)} />
    </form>
  );
}

export default AuthWindow;
