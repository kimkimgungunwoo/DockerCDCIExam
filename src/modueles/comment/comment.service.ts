import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { CommentNotFoundException } from './comment.exception';
import { UserNotFoundException } from '../user/user.exception';
import { PostNotFoundException } from '../post/post.exception';
import {
  CommentCreateRequestDTO,
  CommentCreateResponseDTO,
  CommentDeleteResponseDTO,
  CommentInfoDTO,
  CommentUpdateRequestDTO,
  CommentUpdateResponseDTO,
} from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async creatreComment(
    userId: number,
    postId: number,
    dto: CommentCreateRequestDTO,
  ): Promise<CommentCreateResponseDTO> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new PostNotFoundException();

    const comment = this.commentRepo.create({
      content: dto.content,
      author: user,
      post: post,
    });
    const saved = await this.commentRepo.save(comment);
    return new CommentCreateResponseDTO(saved, user, post);
  }

  async getComments(): Promise<CommentInfoDTO[]> {
    const comments = await this.commentRepo.find({
      relations: { author: true, post: true },
    });
    return comments.map(
      (comment) => new CommentInfoDTO(comment, comment.author, comment.post),
    );
  }

  async getCommentsByUserId(userId: number): Promise<CommentInfoDTO[]> {
    const comments = await this.commentRepo.find({
      where: { author: { id: userId } },
      relations: { author: true, post: true },
    });
    return comments.map(
      (comment) => new CommentInfoDTO(comment, comment.author, comment.post),
    );
  }

  async getCommentsByPostId(postId: number): Promise<CommentInfoDTO[]> {
    const comments = await this.commentRepo.find({
      where: { post: { id: postId } },
      relations: { author: true, post: true },
    });

    return comments.map(
      (comment) => new CommentInfoDTO(comment, comment.author, comment.post),
    );
  }

  async updateComment(
    commentId: number,
    dto: CommentUpdateRequestDTO,
  ): Promise<CommentUpdateResponseDTO> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: { author: true, post: true },
    });
    if (!comment) throw new CommentNotFoundException();

    if (dto.content !== undefined) comment.content = dto.content;
    const saved = await this.commentRepo.save(comment);
    return new CommentUpdateResponseDTO(saved, saved.author, saved.post);
  }

  async deleteComment(commentId: number): Promise<CommentDeleteResponseDTO> {
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    if (!comment) throw new CommentNotFoundException();
    await this.commentRepo.remove(comment);
    return new CommentDeleteResponseDTO({ ...comment, id: commentId });
  }

  async countCommentsByUserId(userId: number): Promise<number> {
    return this.commentRepo.count({ where: { author: { id: userId } } });
  }

  async countCommentsByPostId(postId: number): Promise<number> {
    return this.commentRepo.count({ where: { post: { id: postId } } });
  }
}
