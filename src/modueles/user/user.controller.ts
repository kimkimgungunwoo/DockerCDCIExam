import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  DeleteUserResponseDTO,
  FollowResponseDTO,
  FollowUserDTO,
  UpdateUserRequestDTO,
  userInfoDTO,
} from './user.dto';
import { PostInfoDTO } from '../post/post.dto';
import { CommentInfoDTO } from '../comment/comment.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiResponse({ status: 201, type: CreateUserResponseDTO })
  createUser(
    @Body() dto: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: '유저 전체 목록 조회' })
  @ApiResponse({ status: 200, type: [CreateUserResponseDTO] })
  getUsers(): Promise<CreateUserResponseDTO[]> {
    return this.userService.getUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: '유저 단건 조회 (포스트/댓글 수 포함)' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: userInfoDTO })
  getUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<userInfoDTO> {
    return this.userService.getUserById(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: CreateUserResponseDTO })
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.updateUser(userId, dto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: '유저 삭제' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: DeleteUserResponseDTO })
  deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DeleteUserResponseDTO> {
    return this.userService.deleteUser(userId);
  }

  @Get(':userId/posts')
  @ApiOperation({ summary: '유저별 게시글 목록 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [PostInfoDTO] })
  getUserPosts(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PostInfoDTO[]> {
    return this.userService.getUserPosts(userId);
  }

  @Get(':userId/comments')
  @ApiOperation({ summary: '유저별 댓글 목록 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [CommentInfoDTO] })
  getUserComments(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CommentInfoDTO[]> {
    return this.userService.getUserComments(userId);
  }

  @Post(':userId/follow/:targetId')
  @ApiOperation({ summary: '팔로우' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'targetId', type: Number })
  @ApiResponse({ status: 201, type: FollowResponseDTO })
  follow(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('targetId', ParseIntPipe) targetId: number,
  ): Promise<FollowResponseDTO> {
    return this.userService.follow(userId, targetId);
  }

  @Delete(':userId/follow/:targetId')
  @ApiOperation({ summary: '언팔로우' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'targetId', type: Number })
  @ApiResponse({ status: 200, type: FollowResponseDTO })
  unfollow(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('targetId', ParseIntPipe) targetId: number,
  ): Promise<FollowResponseDTO> {
    return this.userService.unfollow(userId, targetId);
  }

  @Get(':userId/followers')
  @ApiOperation({ summary: '팔로워 목록 (나를 팔로우하는 사람들)' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [FollowUserDTO] })
  getFollowers(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FollowUserDTO[]> {
    return this.userService.getFollowers(userId);
  }

  @Get(':userId/following')
  @ApiOperation({ summary: '팔로잉 목록 (내가 팔로우하는 사람들)' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [FollowUserDTO] })
  getFollowing(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FollowUserDTO[]> {
    return this.userService.getFollowing(userId);
  }
}
