const { MongoClient } = require('mongodb');
const config = require('../config');

let db;

async function initializeClient() {
  const client = await MongoClient.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });

  return client.db();
}

module.exports = async () => {
  if (!db) {
    db = await initializeClient();
  }

  return db;
};
