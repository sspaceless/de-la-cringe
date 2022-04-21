const express = require('express');
const bodyParser = require('body-parser');
const usersDB = require('./usersDB');

const port = 3002;

const app = express();

app.use(bodyParser.json());

app.post('/api/users/createAccount', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body not found');
  }

  const { name, password } = req.body;

  if (await usersDB.createAccount(name, password)) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

app.post('/api/users/signInAccount', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body not found');
  }

  const { name, password } = req.body;

  if (await usersDB.signInAccount(name, password)) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

// todo
app.post('/api/users/getUserInfo', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body not found');
  }

  const { name, password } = req.body;

  if (await usersDB.signInAccount(name, password)) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

app.listen(port, () => {
  console.log(`server started on localhost:${port}`);
});
