import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { LikeResponseDto } from './dto/like-response.dto';
import { PatchResponseDto } from './dto/patch-response.dto';
import { Response } from './response.entity';

type TLikeReturn = { id: string; liked: boolean };
type TRemoveReturn = { id: string; removed: boolean };

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const response = this.responseRepository.create(createResponseDto);
    response.likes = [];
    return this.responseRepository.save(response);
  }

  async patch(
    id: string,
    patchResponseDto: PatchResponseDto,
  ): Promise<Response> {
    const response = this.responseRepository.findOneBy({ id });

    if (!response) return null;

    await this.responseRepository.update(id, patchResponseDto);
    return this.responseRepository.findOneBy({ id });
  }

  async like(likeResponseDto: LikeResponseDto): Promise<TLikeReturn> {
    const response = await this.responseRepository
      .createQueryBuilder('response')
      .where('response.id = :id', { id: likeResponseDto.response })
      .getOne();

    if (!response) {
      throw new Error('Response not found');
    }

    const responseAlreadyLiked = response.likes.includes(
      likeResponseDto.sender,
    );

    if (responseAlreadyLiked) {
      this.responseRepository
        .createQueryBuilder()
        .where('response.id = :id', { id: likeResponseDto.response })
        .update()
        .set({
          likes: response.likes.filter((id) => id !== likeResponseDto.sender),
        })
        .execute();

      return { id: response.id, liked: false };
    } else {
      this.responseRepository
        .createQueryBuilder()
        .where('response.id = :id', { id: likeResponseDto.response })
        .update()
        .set({
          likes: [...response.likes, likeResponseDto.sender],
        })
        .execute();

      return { id: response.id, liked: true };
    }
  }

  async findAll(): Promise<Response[]> {
    return await this.responseRepository.find();
  }

  findOne(id: string): Promise<Response | null> {
    return this.responseRepository.findOneBy({ id });
  }

  findByCommentId(comment: string): Promise<Response[] | null> {
    return this.responseRepository
      .createQueryBuilder('response')
      .where('response.comment = :comment', { comment })
      .getMany();
  }

  async remove(id: string): Promise<TRemoveReturn> {
    const response = await this.responseRepository.findOneBy({ id });

    if (!response) return null;

    await this.responseRepository.delete(id);
    return { id, removed: true };
  }
}
