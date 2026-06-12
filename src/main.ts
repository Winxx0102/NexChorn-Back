import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
app.enableCors({
origin: [
    'https://nex-chorn-front.vercel.app', 
    'https://nex-chorn-front-8qrlkn1vh-winxx0102-s-projects.vercel.app' // ¡Añade esta también!
  ],// Asegúrate de que sea EXACTAMENTE tu URL de Vercel
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true, // Esto es vital si usas cookies
  allowedHeaders: 'Content-Type,Authorization', // Asegúrate de incluir los headers que usas
});
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Render asigna un puerto mediante la variable de entorno PORT
  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
}

bootstrap();