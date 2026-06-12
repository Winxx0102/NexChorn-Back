import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Exportamos esta instancia para que el archivo api/index.js pueda usarla
export const expressApp = express();

export async function bootstrap(appInstance: any) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(appInstance));

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

// ARRANQUE LOCAL
if (process.env.NODE_ENV !== 'production') {
  bootstrap(expressApp).then((app) => {
    expressApp.listen(3000, () => console.log('🚀 Local: http://localhost:3000'));
  });
}