require('dotenv').config();

const Config = {
  CLIENT_URL: process.env.CLIENT_URL,
  API_URL: process.env.API_URL,
  DatabaseInfo: {
    USERNAME: 'adminOfCringe',
    PASSWORD: encodeURIComponent('idyMfHwxR:!642B'),
    URI: 'cringe.0wkju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  }
};

module.exports = { default: Config };
