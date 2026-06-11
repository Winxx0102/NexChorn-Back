// api/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express'; // IMPORTANTE
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express(); // Creamos la instancia de express
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    
    app.use(helmet());
    app.enableCors({ origin: '*', credentials: true });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    
    await app.init();
    cachedServer = expressApp; // Guardamos express
  }
  return cachedServer;
}

export default async (req: any, res: any) => {
  const server = await bootstrap();
  server(req, res);
};