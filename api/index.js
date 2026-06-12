const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();

// Esta función permite que Vercel ejecute la app
async function createServer() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  return server;
}

createServer();

module.exports = server;