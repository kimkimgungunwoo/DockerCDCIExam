import { BaseModel } from 'src/common/BaseModel';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity('posts')
export class Post extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: number;

  @Column({ name: 'post_title', length: 50 })
  title: string;

  @Column({ name: 'post_content', length: 1000 })
  content: string;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
