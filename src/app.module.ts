import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Comment } from './models/comment/comment.entity';
import { Response } from './models/response/response.entity';
import { User } from './models/user/user.entity';

import { CommentModule } from './models/comment/comment.module';
import { ResponseModule } from './models/response/response.module';
import { UsersModule } from './models/user/user.module';

type DBType = 'mysql' | 'mariadb';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as DBType,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Comment, Response],
      synchronize: true,
    }),
    UsersModule,
    CommentModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
