import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';
import { PatchCommentDto } from './dto/patch-comment.dto';

type TLikeReturn = { id: string; liked: boolean };

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    comment.likes = [];
    return this.commentRepository.save(comment);
  }

  async patch(id: string, patchCommentDto: PatchCommentDto): Promise<Comment> {
    const comment = this.commentRepository.findOneBy({ id });

    if (!comment) return null;

    await this.commentRepository.update(id, patchCommentDto);
    return this.commentRepository.findOneBy({ id });
  }

  findBySender(sender: string): Promise<Comment[] | null> {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.sender = :sender', { sender })
      .getMany();
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async timeline(): Promise<Comment[]> {
    const timeline = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.sender', 'sender')
      .leftJoinAndSelect('comment.responses', 'response')
      .leftJoinAndSelect('response.sender', 'responseSender')
      .leftJoinAndSelect('response.recipient', 'responseRecipient')
      .orderBy('comment.createdAt', 'ASC')
      .addOrderBy('response.createdAt', 'ASC')
      .getMany();

    return timeline;
  }

  findOne(id: string): Promise<Comment | null> {
    return this.commentRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async like(likeCommentDto: LikeCommentDto): Promise<TLikeReturn> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id: likeCommentDto.comment })
      .getOne();

    if (!comment) {
      throw new Error('Comment not found');
    }

    const commentAlreadyLiked = comment.likes.includes(likeCommentDto.sender);

    if (commentAlreadyLiked) {
      this.commentRepository
        .createQueryBuilder()
        .where('comment.id = :id', { id: likeCommentDto.comment })
        .update()
        .set({
          likes: comment.likes.filter((id) => id !== likeCommentDto.sender),
        })
        .execute();

      return { id: comment.id, liked: false };
    } else {
      this.commentRepository
        .createQueryBuilder()
        .where('comment.id = :id', { id: likeCommentDto.comment })
        .update()
        .set({
          likes: [...comment.likes, likeCommentDto.sender],
        })
        .execute();

      return { id: comment.id, liked: true };
    }
  }
}
