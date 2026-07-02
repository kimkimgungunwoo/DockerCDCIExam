import * as dotenv from 'dotenv';
import { Comment } from 'src/modueles/comment/comment.entity';
import { Post } from 'src/modueles/post/post.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/modueles/user/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as 'postgres') ?? 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: true,
  logging: true,

  entities: [User, Post, Comment],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
