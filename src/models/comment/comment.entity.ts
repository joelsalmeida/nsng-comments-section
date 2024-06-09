import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  sender: string;

  @Column('simple-array')
  likes: string[];
}
