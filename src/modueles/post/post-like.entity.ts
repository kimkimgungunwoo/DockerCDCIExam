import { BaseModel } from 'src/common/BaseModel';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Entity('post_likes')
export class PostLike extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'post_like_id' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
