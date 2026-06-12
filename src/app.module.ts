import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ChroniclesModule } from './chronicles/chronicles.module';


@Module({
  imports: [
    // Asegúrate de que Prisma sea Global para evitar errores de inyección
    PrismaModule, 
    
    // Si estás en desarrollo local, esto funciona. 
    // En producción (Vercel), no guardes archivos en el sistema de archivos.
    ...(process.env.NODE_ENV !== 'production' ? [
      ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), 'public'),
        serveRoot: '/public',
      }),
    ] : []),

    AuthModule,
    UsersModule,
    ChroniclesModule,
  ],
  providers: [],
})
export class AppModule { }