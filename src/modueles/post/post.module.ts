import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { PostLike } from './post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment, PostLike])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
