import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

export class PostCreateRequestDTO {
  @ApiProperty({ example: '제목입니다' })
  @IsString()
  title: string;

  @ApiProperty({ example: '내용입니다' })
  @IsString()
  content: string;
}

export class PostCreateResponseDTO {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postContent: string;

  constructor(post: Post, user: User) {
    this.postId = post.id;
    this.userId = user.id;
    this.username = user.username;
    this.postTitle = post.title;
    this.postContent = post.content;
  }
}

export class PostInfoDTO {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postContent: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  constructor(post: Post, user: User) {
    this.postId = post.id;
    this.userId = user.id;
    this.username = user.username;
    this.postTitle = post.title;
    this.postContent = post.content;
    this.createdAt = post.createdAt;
  }
}

export class PostUpdateRequestDTO {
  @ApiPropertyOptional({ example: '수정된 제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: '수정된 내용' })
  @IsOptional()
  @IsString()
  content?: string;
}

export class PostUpdateResponseDTO {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postContent: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  constructor(post: Post, user: User) {
    this.postId = post.id;
    this.userId = user.id;
    this.username = user.username;
    this.postTitle = post.title;
    this.postContent = post.content;
    this.updatedAt = post.updatedAt;
  }
}

export class PostDeleteResponseDTO {
  @ApiProperty()
  postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}
