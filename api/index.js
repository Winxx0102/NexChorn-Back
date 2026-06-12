const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();
let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api');
    await app.init();
  }
  return server(req, res);
};