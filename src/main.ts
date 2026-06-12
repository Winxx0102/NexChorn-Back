import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// Esta función es la que Vercel ejecutará (el "handler")
export async function createNestServer(expressApp) {
  const app = await NestFactory.create(AppModule, expressApp);

  app.use(helmet());
  app.enableCors({
    origin: 'https://nex-chorn-front.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.init();
  return app;
}