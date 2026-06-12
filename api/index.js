// api/index.ts
// api/index.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api'); // Opcional, pero recomendado en Vercel
  await app.init();
}

bootstrap();

module.exports = server;