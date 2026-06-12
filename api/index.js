const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const expressApp = express();
let nestApp;

// Esta es la función que Vercel necesita
const server = async (req, res) => {
  if (!nestApp) {
    nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    // No ponemos prefijo, como pediste
    await nestApp.init();
  }
  return expressApp(req, res);
};

// EXPORTACIÓN OBLIGATORIA
module.exports = server;