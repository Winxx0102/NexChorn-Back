import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Seguridad básica
  app.use(helmet());

  // 2. CORS dinámico: Lee las URLs permitidas desde una variable de entorno
  // Ejemplo de valor en Vercel/Railway: https://tu-frontend.com,http://localhost:3001
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
  
  app.enableCors({
    origin: allowedOrigins,
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

  // 3. Swagger condicional (solo para desarrollo)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Books API')
      .setVersion('1.2')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  // 4. Puerto dinámico
  const port = process.env.PORT || 3000;
  
  // En producción (Render/Railway), el host suele ser '0.0.0.0'
  await app.listen(port, '0.0.0.0');
  
  console.log(`Servidor iniciado en modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Escuchando en el puerto: ${port}`);
}

bootstrap();