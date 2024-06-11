import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';

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
    return await this.commentRepository.find({
      relations: [
        'sender',
        'responses',
        'responses.sender',
        'responses.recipient',
      ],
    });
  }

  findOne(id: string): Promise<Comment | null> {
    return this.commentRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async like(likeCommentDto: LikeCommentDto): Promise<string> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id: likeCommentDto.comment })
      .getOne();

    if (!comment) return 'Comment not found';

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

      return 'Comment unliked successfully';
    } else {
      this.commentRepository
        .createQueryBuilder()
        .where('comment.id = :id', { id: likeCommentDto.comment })
        .update()
        .set({
          likes: [...comment.likes, likeCommentDto.sender],
        })
        .execute();

      return 'Comment liked successfully';
    }
  }
}
