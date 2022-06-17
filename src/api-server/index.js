const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const UsersDB = require('./usersDB').default;

const port = 3002;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

const createLimiter = (period, amount) => rateLimiter({
  windowMs: period,
  max: amount,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public', { maxAge: 31557600 }));

const validate = (username, password) => {
  const isUsernameValid = username
                          && validator.isAlphanumeric(username)
                          && validator.isLength(username, { min: 6, max: 20 });

  const isPasswordValid = password
                          && validator.isStrongPassword(password)
                          && validator.isLength(password, { min: 8, max: 20 });

  return isUsernameValid && isPasswordValid;
};

let usersDB;

const initUsersDB = async () => {
  const username = 'adminOfCringe';
  const password = encodeURIComponent('idyMfHwxR:!642B');
  const uri = `mongodb+srv://${username}:${password}@cringe.0wkju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  usersDB = new UsersDB(uri);
  await usersDB.connect();

  process.on('SIGINT', () => usersDB.cleanup());
  process.on('SIGTERM', () => usersDB.cleanup());
};

initUsersDB();

app.use('/api/users/createAccount', createLimiter(5 * 60 * 1000, 1));
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

app.use('/api/users/signInAccount', createLimiter(3 * 1000, 1));
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

app.use('/api/users/getUserInfo', createLimiter(1 * 2000, 1));
app.get('/api/users/getUserInfo', async (req, res) => {
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

app.use('/api/users/isAuthorized', createLimiter(1 * 2000, 1));
app.get('/api/users/isAuthorized', async (req, res) => {
  const { userId } = req.cookies;

  return res.status(200).json({
    success: true,
    isAuthorized: Boolean(userId && validator.isUUID(userId))
  });
});

app.use('/api/users/logoutFromAccount', createLimiter(3 * 1000, 1));
app.get('/api/users/logoutFromAccount', async (req, res) => {
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

app.use('/api/games/grantFreeTrial', createLimiter(2 * 1000, 1));
app.get('/api/games/grantFreeTrial', async (req, res) => {
  const { userId } = req.cookies;
  if (!userId || !validator.isUUID(userId)) {
    return res.status(400).json({
      success: false,
      message: 'userId is invalid'
    });
  }

  const { gameId } = req.query;
  if (!gameId) {
    return res.status(400).json({
      success: false,
      message: 'userId is invalid'
    });
  }

  const result = await usersDB.grantFreeTrial(userId, gameId);

  if (result.success) {
    res.status(200);
  } else {
    res.status(409);
  }

  return res.json(result);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on localhost:${port}`);
});
