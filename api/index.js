const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const expressApp = express();
let nestApp;

module.exports = async (req, res) => {
  try {
    if (!nestApp) {
      nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
      // Sin prefijo, como pediste
      await nestApp.init();
    }
    return expressApp(req, res);
  } catch (error) {
    // ESTO VA A MOSTRAR EL ERROR REAL EN LOS LOGS DE VERCEL
    console.error('ERROR CRÍTICO DE INICIALIZACIÓN:', error);
    res.status(500).send({ error: 'Fallo al iniciar', details: error.message });
  }
};