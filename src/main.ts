import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Esta función configura la app
export async function bootstrap(expressApp: any) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.use(helmet());
  app.enableCors({
    origin: 'https://nex-chorn-front.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.init();
  return app;
}

// ARRANQUE LOCAL: Solo se ejecuta si estamos en desarrollo
if (process.env.NODE_ENV !== 'production') {
  const server = express();
  bootstrap(server).then((app) => {
    server.listen(3000, () => console.log('🚀 Local: http://localhost:3000'));
  });
}