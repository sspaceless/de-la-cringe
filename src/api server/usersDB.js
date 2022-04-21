const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const mongoClient = new MongoClient('mongodb://localhost:27017/');
mongoClient.connect();

const db = mongoClient.db('cringe');
const users = db.collection('users');

async function createAccount(name, password) {
  const user = await users.findOne({ name });
  if (!name || !password || user) {
    return { success: false };
  }

  const hashedPass = await bcrypt.hash(password, 12);

  const uid = uuidv4();
  const record = await users.insertOne({ userId: uid, name, password: hashedPass });

  if (record) {
    return { success: true, user: { userId: uid, name } };
  }

  return { success: false };
}

async function signInAccount(name, password) {
  if (!name || !password) {
    return { success: false };
  }

  const record = await users.findOne({ name });
  if (!record || !await bcrypt.compare(password, record.password)) {
    return { success: false };
  }

  return { success: true, user: { userId: record.userId, name: record.name } };
}

async function getUserInfo(userId) {
  if (!userId) {
    return { success: false };
  }

  const record = await users.findOne({ userId });
  if (!record) {
    return { success: false };
  }

  return { success: true, user: { userId: record.userId, name: record.name } };
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
