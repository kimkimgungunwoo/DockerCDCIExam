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
import { PostService } from './post.service';
import {
  PostCreateRequestDTO,
  PostCreateResponseDTO,
  PostDeleteResponseDTO,
  PostInfoDTO,
  PostUpdateRequestDTO,
  PostUpdateResponseDTO,
} from './post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(':userId')
  @ApiOperation({ summary: '포스트 생성' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 201, type: PostCreateResponseDTO })
  createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: PostCreateRequestDTO,
  ): Promise<PostCreateResponseDTO> {
    return this.postService.createPost(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '포스트 전체 목록 조회' })
  @ApiResponse({ status: 200, type: [PostInfoDTO] })
  getPosts(): Promise<PostInfoDTO[]> {
    return this.postService.getPosts();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '유저별 포스트 목록 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [PostInfoDTO] })
  getPostsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PostInfoDTO[]> {
    return this.postService.getPostsByUserId(userId);
  }

  @Patch(':postId')
  @ApiOperation({ summary: '포스트 수정' })
  @ApiParam({ name: 'postId', type: Number })
  @ApiResponse({ status: 200, type: PostUpdateResponseDTO })
  updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: PostUpdateRequestDTO,
  ): Promise<PostUpdateResponseDTO> {
    return this.postService.updatePost(postId, dto);
  }

  @Delete(':postId')
  @ApiOperation({ summary: '포스트 삭제' })
  @ApiParam({ name: 'postId', type: Number })
  @ApiResponse({ status: 200, type: PostDeleteResponseDTO })
  deletePost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostDeleteResponseDTO> {
    return this.postService.deletePost(postId);
  }
}
