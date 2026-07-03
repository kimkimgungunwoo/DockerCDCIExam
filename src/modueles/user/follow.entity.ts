import { BaseModel } from 'src/common/BaseModel';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('follows')
export class Follow extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'follow_id' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'following_id' })
  following: User;
}
