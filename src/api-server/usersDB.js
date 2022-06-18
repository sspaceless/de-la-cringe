const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { Image } = require('image-js');
const Config = require('./config').default;

class UsersDB {
  defaultGames = [];

  defaultAvatar = 'public/files/avatar.png';

  constructor(uri) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    });

    this.mongoClient = client;
  }

  async connect() {
    await this.mongoClient.connect();

    this.db = this.mongoClient.db('cringe');
    this.users = this.db.collection('users');
  }

  async createAccount(username, password) {
    const user = await this.users.findOne({ username });
    if (!username || !password || user) {
      return { success: false };
    }

    let image = await Image.load(this.defaultAvatar);

    for (let i = 0; i < 3; i++) {
      image = image.add(Math.random() * 255, { channels: [i] });
    }

    const fileName = `${username}.png`;

    image.save(`public/files/avatars/${fileName}`);

    const profile = {
      username,
      avatarUrl: `avatars/${fileName}`,
      availableGames: this.defaultGames
    };

    const hashedPass = await bcrypt.hash(password, 10);
    const uid = uuidv4();

    const record = await this.users.insertOne({
      userId: uid,
      password: hashedPass,
      ...profile
    });

    if (record) {
      return { success: true, user: profile };
    }

    return { success: false };
  }

  async signInAccount(username, password) {
    if (!username || !password) {
      return { success: false };
    }

    const record = await this.users.findOne({ username });
    if (!record || !await bcrypt.compare(password, record.password)) {
      return { success: false };
    }

    return {
      success: true,
      userId: record.userId,
      user: {
        username: record.username,
        avatarUrl: `${Config.API_URL}/files/${record.avatarUrl}`,
        availableGames: record.availableGames,
      }
    };
  }

  async getUserInfo(userId) {
    if (!userId) {
      return { success: false };
    }

    const record = await this.users.findOne({ userId });
    if (!record) {
      return { success: false };
    }

    return {
      success: true,
      user: {
        username: record.username,
        avatarUrl: `${Config.API_URL}/files/${record.avatarUrl}`,
        availableGames: record.availableGames,
      }
    };
  }

  async grantFreeTrial(userId, gameId) {
    if (!userId || !gameId
        || !await this.users.findOne({ userId })
        || await this.users.findOne({ userId, 'availableGames.gameId': gameId })) {
      return { success: false };
    }

    const ms = new Date().getTime() + 1800000;
    const untilDate = new Date(ms);

    const record = {
      gameId,
      type: 'trial',
      untilDate
    };

    const insertResult = await this.users.updateOne(
      { userId },
      { $push: { availableGames: record } }
    );
    if (!insertResult) {
      return { success: false };
    }

    return {
      success: true,
      record
    };
  }

  cleanup() {
    this.mongoClient.close(() => {
      process.exit(0);
    });
  }
}

module.exports = { default: UsersDB };
