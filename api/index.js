// api/index.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // IMPORTANTE: Esto asegura que todas tus rutas tengan el prefijo /api
  app.setGlobalPrefix('api'); 
  await app.init();
}

bootstrap();

module.exports = server;