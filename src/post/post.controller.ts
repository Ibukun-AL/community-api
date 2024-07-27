/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/post/post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { User } from '../entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.createPost(createPostDto, req.user);
  }

  @Get()
  getPosts(@Query() query: { sort?: 'time' | 'upvotes'; category?: string; page?: number; limit?: number }) {
    return this.postService.getPosts(query);
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Req() req) {
    return this.postService.updatePost(id, updatePostDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deletePost(@Param('id') id: number, @Req() req) {
    return this.postService.deletePost(id, req.user);
  }

  @Post(':id/upvote')
  @UseGuards(AuthGuard)
  upvotePost(@Param('id') id: number, @Req() req) {
    return this.postService.upvotePost(id, req.user);
  }

  @Post(':id/downvote')
  @UseGuards(AuthGuard)
  downvotePost(@Param('id') id: number, @Req() req) {
    return this.postService.downvotePost(id, req.user);
  }

  @Post(':id/view')
  incrementViewCount(@Param('id') id: number) {
    return this.postService.incrementViewCount(id);
  }
}