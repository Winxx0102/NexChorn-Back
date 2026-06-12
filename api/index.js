const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const expressApp = express();

const server = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix('api'); // Si tus rutas empiezan con /api, esto es obligatorio
  await app.init();
  return expressApp;
};

module.exports = server();