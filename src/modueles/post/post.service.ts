import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostNotFoundException } from './post.exception';
import { UserNotFoundException } from '../user/user.exception';
import {
  PostCreateRequestDTO,
  PostCreateResponseDTO,
  PostDeleteResponseDTO,
  PostInfoDTO,
  PostLikeCountDTO,
  PostLikeResponseDTO,
  PostUpdateRequestDTO,
  PostUpdateResponseDTO,
} from './post.dto';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
import { PostLike } from './post-like.entity';
import { AlreadyLikedException, NotLikedException } from './post-like.exception';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(PostLike)
    private readonly postLikeRepo: Repository<PostLike>,
  ) {}

  async createPost(
    userId: number,
    dto: PostCreateRequestDTO,
  ): Promise<PostCreateResponseDTO> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      author: user,
    });
    const saved = await this.postRepo.save(post);

    return new PostCreateResponseDTO(saved, user);
  }

  // typeORM읜 LAZY해서 relations 필수
  async getPosts(): Promise<PostInfoDTO[]> {
    const posts = await this.postRepo.find({ relations: { author: true } });
    return posts.map((post) => new PostInfoDTO(post, post.author));
  }

  async getPostsByUserId(userId: number): Promise<PostInfoDTO[]> {
    const posts = await this.postRepo.find({
      where: { author: { id: userId } },
      relations: { author: true },
    });
    return posts.map((post) => new PostInfoDTO(post, post.author));
  }

  async countPostsByUserId(userId: number): Promise<number> {
    return this.postRepo.count({ where: { author: { id: userId } } });
  }

  async updatePost(
    postId: number,
    dto: PostUpdateRequestDTO,
  ): Promise<PostUpdateResponseDTO> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: { author: true },
    });
    if (!post) throw new PostNotFoundException();

    if (dto.title !== undefined) post.title = dto.title;
    if (dto.content !== undefined) post.content = dto.content;

    const saved = await this.postRepo.save(post);
    return new PostUpdateResponseDTO(saved, saved.author);
  }

  async deletePost(postId: number): Promise<PostDeleteResponseDTO> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new PostNotFoundException();

    await this.postRepo.remove(post);
    return new PostDeleteResponseDTO(postId);
  }

  async likePost(
    postId: number,
    userId: number,
  ): Promise<PostLikeResponseDTO> {
    const [post, user] = await Promise.all([
      this.postRepo.findOneBy({ id: postId }),
      this.userRepo.findOneBy({ id: userId }),
    ]);
    if (!post) throw new PostNotFoundException();
    if (!user) throw new UserNotFoundException();

    const existing = await this.postLikeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
    if (existing) throw new AlreadyLikedException();

    await this.postLikeRepo.save(this.postLikeRepo.create({ post, user }));
    const likeCount = await this.postLikeRepo.count({
      where: { post: { id: postId } },
    });

    return new PostLikeResponseDTO(postId, userId, likeCount);
  }

  async unlikePost(
    postId: number,
    userId: number,
  ): Promise<PostLikeResponseDTO> {
    const like = await this.postLikeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
    if (!like) throw new NotLikedException();

    await this.postLikeRepo.remove(like);
    const likeCount = await this.postLikeRepo.count({
      where: { post: { id: postId } },
    });

    return new PostLikeResponseDTO(postId, userId, likeCount);
  }

  async getLikeCount(postId: number): Promise<PostLikeCountDTO> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new PostNotFoundException();

    const likeCount = await this.postLikeRepo.count({
      where: { post: { id: postId } },
    });

    return new PostLikeCountDTO(postId, likeCount);
  }
}
