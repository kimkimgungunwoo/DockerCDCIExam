import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserNotFoundException } from './user.exception';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Follow } from './follow.entity';
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
import {
  AlreadyFollowingException,
  CannotFollowSelfException,
  NotFollowingException,
} from './follow.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
  ) {}

  async createUser(dto: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
    const saved = await this.userRepo.save(user);
    return new CreateUserResponseDTO(saved);
  }

  async getUsers(): Promise<CreateUserResponseDTO[]> {
    const users = await this.userRepo.find();
    return users.map((user) => new CreateUserResponseDTO(user));
  }

  async getUserById(userId: number): Promise<userInfoDTO> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const [countPosts, countComments] = await Promise.all([
      this.postRepo.count({ where: { author: { id: userId } } }),
      this.commentRepo.count({ where: { author: { id: userId } } }),
    ]);

    return new userInfoDTO(user, countPosts, countComments);
  }

  async updateUser(
    userId: number,
    dto: UpdateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    if (dto.username !== undefined) user.username = dto.username;
    if (dto.email !== undefined) user.email = dto.email;

    const saved = await this.userRepo.save(user);
    return new CreateUserResponseDTO(saved);
  }

  async deleteUser(userId: number): Promise<DeleteUserResponseDTO> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    await this.userRepo.remove(user);
    return new DeleteUserResponseDTO(userId);
  }

  async getUserPosts(userId: number): Promise<PostInfoDTO[]> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const posts = await this.postRepo.find({
      where: { author: { id: userId } },
      relations: { author: true },
    });
    return posts.map((post) => new PostInfoDTO(post, post.author));
  }

  async getUserComments(userId: number): Promise<CommentInfoDTO[]> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const comments = await this.commentRepo.find({
      where: { author: { id: userId } },
      relations: { author: true, post: true },
    });
    return comments.map(
      (comment) => new CommentInfoDTO(comment, comment.author, comment.post),
    );
  }

  async follow(followerId: number, followingId: number): Promise<FollowResponseDTO> {
    if (followerId === followingId) throw new CannotFollowSelfException();

    const [follower, following] = await Promise.all([
      this.userRepo.findOneBy({ id: followerId }),
      this.userRepo.findOneBy({ id: followingId }),
    ]);
    if (!follower) throw new UserNotFoundException();
    if (!following) throw new UserNotFoundException();

    const existing = await this.followRepo.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });
    if (existing) throw new AlreadyFollowingException();

    const follow = this.followRepo.create({ follower, following });
    await this.followRepo.save(follow);

    return new FollowResponseDTO(followerId, followingId);
  }

  async unfollow(followerId: number, followingId: number): Promise<FollowResponseDTO> {
    if (followerId === followingId) throw new CannotFollowSelfException();

    const follow = await this.followRepo.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });
    if (!follow) throw new NotFollowingException();

    await this.followRepo.remove(follow);
    return new FollowResponseDTO(followerId, followingId);
  }

  async getFollowers(userId: number): Promise<FollowUserDTO[]> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const follows = await this.followRepo.find({
      where: { following: { id: userId } },
      relations: { follower: true },
    });
    return follows.map((f) => new FollowUserDTO(f.follower));
  }

  async getFollowing(userId: number): Promise<FollowUserDTO[]> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const follows = await this.followRepo.find({
      where: { follower: { id: userId } },
      relations: { following: true },
    });
    return follows.map((f) => new FollowUserDTO(f.following));
  }
}
