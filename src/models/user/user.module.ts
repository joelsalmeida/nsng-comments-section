import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UseService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UseService],
  controllers: [UserController],
})
export class UsersModule {}
