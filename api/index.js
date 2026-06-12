

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const expressApp = express();
let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.setGlobalPrefix('api');
    await app.init();
    // LOGEAR RUTAS PARA DEPURAR
    const serverRoutes = expressApp._router.stack
      .filter(r => r.route)
      .map(r => r.route.path);
    console.log("Rutas detectadas:", serverRoutes);
  }
  return expressApp(req, res);
};