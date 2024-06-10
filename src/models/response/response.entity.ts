import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn()
  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  sender: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  recipient: string;

  @Column()
  body: string;

  @Column('simple-array')
  likes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
