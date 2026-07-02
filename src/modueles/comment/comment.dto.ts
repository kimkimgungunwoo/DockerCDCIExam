import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { Post } from '../post/post.entity';

export class CommentCreateRequestDTO {
  @ApiProperty({ example: '댓글 내용입니다' })
  @IsString()
  content: string;
}

export class CommentCreateResponseDTO {
  @ApiProperty()
  commentId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  postId: number;

  constructor(comment: Comment, user: User, post: Post) {
    this.commentId = comment.id;
    this.content = comment.content;
    this.userId = user.id;
    this.username = user.username;
    this.postId = post.id;
  }
}

export class CommentUpdateRequestDTO {
  @ApiPropertyOptional({ example: '수정된 댓글 내용' })
  @IsOptional()
  @IsString()
  content?: string;
}

export class CommentUpdateResponseDTO {
  @ApiProperty()
  commentId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  updatedAt: Date;

  constructor(comment: Comment, user: User, post: Post) {
    this.commentId = comment.id;
    this.content = comment.content;
    this.userId = user.id;
    this.username = user.username;
    this.postId = post.id;
    this.updatedAt = comment.updatedAt;
  }
}

export class CommentInfoDTO {
  @ApiProperty()
  commentId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  createdAt: Date;

  constructor(comment: Comment, user: User, post: Post) {
    this.commentId = comment.id;
    this.content = comment.content;
    this.userId = user.id;
    this.username = user.username;
    this.postId = post.id;
    this.createdAt = comment.createdAt;
  }
}

export class CommentDeleteResponseDTO {
  @ApiProperty()
  commentId: number;

  constructor(commentId: number) {
    this.commentId = commentId;
  }
}
