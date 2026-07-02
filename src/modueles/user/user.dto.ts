import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from './user.entity';

export class CreateUserRequestDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '홍길동' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password1234' })
  @IsNotEmpty()
  password: string;
}

export class CreateUserResponseDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  createdAt: Date;

  constructor(user: User) {
    this.userId = user.id;
    this.email = user.email;
    this.username = user.username;
    this.createdAt = user.createdAt;
  }
}

export class userInfoDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  countPosts: number;

  @ApiProperty()
  countComments: number;

  @ApiProperty()
  createdAt: Date;

  constructor(user: User, countPosts: number, contComments: number) {
    this.userId = user.id;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.countComments = contComments;
    this.countPosts = countPosts;
  }
}

export class UpdateUserRequestDTO {
  @ApiPropertyOptional({ example: '새이름' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'new@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class DeleteUserResponseDTO {
  @ApiProperty()
  userId: number;

  constructor(user: User) {
    this.userId = user.id;
  }
}
