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
    PrismaModule, // Asegúrate de que esté aquí
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
    }),
    // ... tus otros módulos
    AuthModule,
    UsersModule,
    ChroniclesModule,
  ],
  providers: [],
})
export class AppModule { }