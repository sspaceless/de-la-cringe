const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const mongoClient = new MongoClient('mongodb://localhost:27017/');
mongoClient.connect();

const db = mongoClient.db('cringe');
const users = db.collection('users');

async function createAccount(name, password) {
  if (!name || !password) {
    return false;
  }

  const hashedPass = await bcrypt.hash(password, 12);

  if (await users.findOne({ name })) {
    return false;
  }

  if (await users.insertOne({ name, password: hashedPass })) {
    return true;
  }

  return false;
}

async function signInAccount(name, password) {
  if (!name || !password) {
    return false;
  }

  const record = await users.findOne({ name });

  if (!record || !await bcrypt.compare(password, record.password)) {
    return false;
  }

  return true;
}

process.on('SIGINT', () => {
  mongoClient.close(() => {
    process.exit(0);
  });
});

module.exports = {
  createAccount,
  signInAccount
};
