import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const response = this.responseRepository.create(createResponseDto);
    return this.responseRepository.save(response);
  }

  async findAll(): Promise<Response[]> {
    return await this.responseRepository.find();
  }

  findOne(id: string): Promise<Response | null> {
    return this.responseRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.responseRepository.delete(id);
  }
}