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
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), // Path to your local docs folder
      serveRoot: '/public', // Optional: Files will be available at http://localhost:3000/docs
    }),
    MulterModule.register({
      dest: '/public/uploads'
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    ChroniclesModule,

  ],
  providers: [],
})
export class AppModule { }
