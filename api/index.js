// api/index.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

let cachedApp;

module.exports = async (req, res) => {
  if (!cachedApp) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await nestApp.init();
    cachedApp = expressApp;
  }
  return cachedApp(req, res);
};