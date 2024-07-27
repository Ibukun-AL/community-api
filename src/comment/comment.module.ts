/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User]) ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
