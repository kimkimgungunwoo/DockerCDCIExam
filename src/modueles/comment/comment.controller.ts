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
import { CommentService } from './comment.service';
import {
  CommentCreateRequestDTO,
  CommentCreateResponseDTO,
  CommentDeleteResponseDTO,
  CommentInfoDTO,
  CommentUpdateRequestDTO,
  CommentUpdateResponseDTO,
} from './comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':userId/:postId')
  @ApiOperation({ summary: '댓글 생성' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'postId', type: Number })
  @ApiResponse({ status: 201, type: CommentCreateResponseDTO })
  createComment(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CommentCreateRequestDTO,
  ): Promise<CommentCreateResponseDTO> {
    return this.commentService.creatreComment(userId, postId, dto);
  }

  @Get()
  @ApiOperation({ summary: '댓글 전체 목록 조회' })
  @ApiResponse({ status: 200, type: [CommentInfoDTO] })
  getComments(): Promise<CommentInfoDTO[]> {
    return this.commentService.getComments();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '유저별 댓글 목록 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [CommentInfoDTO] })
  getCommentsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CommentInfoDTO[]> {
    return this.commentService.getCommentsByUserId(userId);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: '포스트별 댓글 목록 조회' })
  @ApiParam({ name: 'postId', type: Number })
  @ApiResponse({ status: 200, type: [CommentInfoDTO] })
  getCommentsByPostId(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<CommentInfoDTO[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Get('user/:userId/count')
  @ApiOperation({ summary: '유저별 댓글 수 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: Number })
  countCommentsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<number> {
    return this.commentService.countCommentsByUserId(userId);
  }

  @Get('post/:postId/count')
  @ApiOperation({ summary: '포스트별 댓글 수 조회' })
  @ApiParam({ name: 'postId', type: Number })
  @ApiResponse({ status: 200, type: Number })
  countCommentsByPostId(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<number> {
    return this.commentService.countCommentsByPostId(postId);
  }

  @Patch(':commentId')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiResponse({ status: 200, type: CommentUpdateResponseDTO })
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: CommentUpdateRequestDTO,
  ): Promise<CommentUpdateResponseDTO> {
    return this.commentService.updateComment(commentId, dto);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiResponse({ status: 200, type: CommentDeleteResponseDTO })
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<CommentDeleteResponseDTO> {
    return this.commentService.deleteComment(commentId);
  }
}
