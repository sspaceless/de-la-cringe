const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const usersDB = require('./usersDB');

const port = 3002;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const validate = (username, password) => {
  const isUsernameValid = username
                          && validator.isAlphanumeric(username)
                          && validator.isLength(username, { min: 6, max: 20 });

  const isPasswordValid = password
                          && validator.isStrongPassword(password)
                          && validator.isLength(password, { min: 8, max: 20 });

  return isUsernameValid && isPasswordValid;
};

app.post('/api/users/createAccount', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Body not found'
    });
  }

  const { username, password } = req.body;
  if (!validate(username, password)) {
    return res.status(400).json({
      success: false,
      message: 'username or password is invalid'
    });
  }

  const result = await usersDB.createAccount(username, password);
  if (result.success) {
    res.status(200);
  } else {
    res.status(409);
  }

  return res.json(result);
});

app.post('/api/users/signInAccount', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Body not found'
    });
  }

  const { username, password } = req.body;
  if (!validate(username, password)) {
    return res.status(400).json({
      success: false,
      message: 'username or password is invalid'
    });
  }

  const result = await usersDB.signInAccount(username, password);

  if (result.success) {
    const options = {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true
    };

    res.cookie('userId', result.userId, options);
    delete result.userId;

    res.status(200);
  } else {
    res.status(404);
  }

  return res.json(result);
});

app.get('/api/users/getUserInfo', async (req, res) => {
  if (!req.cookies) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  const { userId } = req.cookies;
  if (!userId || !validator.isUUID(userId)) {
    return res.status(400).json({
      success: false,
      message: 'userId is invalid'
    });
  }

  const result = await usersDB.getUserInfo(userId);

  if (result.success) {
    res.status(200);
  } else {
    res.status(404);
  }

  return res.json(result);
});

app.get('/api/users/logoutFromAccount', async (req, res) => {
  if (!req.cookies) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  const { userId } = req.cookies;
  if (!userId || !validator.isUUID(userId)) {
    return res.status(400).json({
      success: false,
      message: 'userId is invalid'
    });
  }

  const options = { httpOnly: true };

  res.clearCookie('userId', options);
  return res.status(200).json({ success: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on localhost:${port}`);
});
