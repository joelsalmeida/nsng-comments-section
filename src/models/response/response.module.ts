import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseController } from './response.controller';
import { Response } from './response.entity';
import { ResponseService } from './response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponseService],
  controllers: [ResponseController],
})
export class ResponseModule {}
