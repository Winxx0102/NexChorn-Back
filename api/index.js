const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

// Creamos la instancia fuera de la exportación para mantenerla en caché (Warm Start)
let app;

async function bootstrap() {
  const expressApp = express();
  
  // Usamos el adaptador correctamente
  const nestApp = await NestFactory.create(
    AppModule, 
    new ExpressAdapter(expressApp)
  );

  nestApp.setGlobalPrefix('api');
  
  // IMPORTANTE: init() es suficiente, no necesitas escuchar puerto
  await nestApp.init();
  
  return expressApp;
}

module.exports = async (req, res) => {
  if (!app) {
    app = await bootstrap();
  }
  return app(req, res);
};