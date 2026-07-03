import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Follow } from './follow.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment, Follow])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
