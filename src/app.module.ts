import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './modueles/comment/comment.module';
import { PostModule } from './modueles/post/post.module';
import { UserModule } from './modueles/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    PostModule,
    CommentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
