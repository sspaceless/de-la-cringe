require('dotenv').config();

const Config = {
  CLIENT_URL: process.env.CLIENT_URL,
  API_URL: process.env.API_URL
};

module.exports = { default: Config };
