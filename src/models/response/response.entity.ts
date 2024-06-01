import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Comment, (comment) => comment.id)
  toCommentId: string;

  @Column()
  by_user: string;

  @Column()
  to_user: string;

  @Column()
  body: string;
}
