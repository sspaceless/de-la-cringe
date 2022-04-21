const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const usersDB = require('./usersDB');

const port = 3002;

const app = express();

app.use(bodyParser.json());

const validate = (username, password) => username
                                         && password
                                         && validator.isAlphanumeric(username)
                                         && validator.isStrongPassword(password);

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
  return res.json(result);
});

app.post('/api/users/getUserInfo', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Body not found'
    });
  }

  const { userId } = req.body;
  if (!validator.isUUID(userId)) {
    return res.status(400).json({
      success: false,
      message: 'userId is invalid'
    });
  }

  const result = await usersDB.getUserInfo(userId);
  return res.json(result);
});

app.listen(port, () => {
  console.log(`server started on localhost:${port}`);
});
