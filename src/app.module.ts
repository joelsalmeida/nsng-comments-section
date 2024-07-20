import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommentModule } from './models/comment/comment.module';
import { ResponseModule } from './models/response/response.module';
import { UsersModule } from './models/user/user.module';
import { MySqlDataSource } from './database/data-sources/MySqlDatasource';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(MySqlDataSource.options),
    UsersModule,
    CommentModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
