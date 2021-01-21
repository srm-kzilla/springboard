const config = require('../config');
const database = require('./database');
const express = require('./express');
const Logger = require('./Logger');

module.exports = async ({ expressApp }) => {
  await database();
  Logger.info(`✌️ Connection to database successful`);

  await express({ app: expressApp });
  Logger.info('✌️ Express loaded');

  Logger.info('✅ All modules loaded!');
};
