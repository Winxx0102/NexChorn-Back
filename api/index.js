const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const expressApp = express();
let nestApp;

module.exports = async (req, res) => {
  if (!nestApp) {
    nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    nestApp.setGlobalPrefix('api');
    await nestApp.init();
  }
  return expressApp(req, res);
};