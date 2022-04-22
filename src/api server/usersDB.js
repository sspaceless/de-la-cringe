const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const pass = encodeURIComponent('idyMfHwxR:!642B');
const uri = `mongodb+srv://adminOfCringe:${pass}@cringe.0wkju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
mongoClient.connect();

const db = mongoClient.db('cringe');
const users = db.collection('users');

const defaultGames = ['game1', 'game2', 'game3'];
const defaultAvatar = 'avatars/avatar.png';

async function createAccount(username, password) {
  const user = await users.findOne({ username });
  if (!username || !password || user) {
    return { success: false };
  }

  const profile = {
    username,
    avatarUrl: defaultAvatar,
    availableGames: defaultGames
  };

  const hashedPass = await bcrypt.hash(password, 10);
  const uid = uuidv4();

  const record = await users.insertOne({
    userId: uid,
    password: hashedPass,
    ...profile
  });

  if (record) {
    return { success: true, user: profile };
  }

  return { success: false };
}

async function signInAccount(username, password) {
  if (!username || !password) {
    return { success: false };
  }

  const record = await users.findOne({ username });
  if (!record || !await bcrypt.compare(password, record.password)) {
    return { success: false };
  }

  return {
    success: true,
    userId: record.userId,
    user: {
      username: record.username,
      avatarUrl: `http://localhost:3002/${record.avatarUrl}`,
      availableGames: record.availableGames
    }
  };
}

async function getUserInfo(userId) {
  if (!userId) {
    return { success: false };
  }

  const record = await users.findOne({ userId });
  if (!record) {
    return { success: false };
  }

  return {
    success: true,
    user: {
      username: record.username,
      avatarUrl: `http://localhost:3002/${record.avatarUrl}`,
      availableGames: record.availableGames
    }
  };
}

process.on('SIGINT', () => {
  mongoClient.close(() => {
    process.exit(0);
  });
});

module.exports = {
  createAccount,
  signInAccount,
  getUserInfo
};
