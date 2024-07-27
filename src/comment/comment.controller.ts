/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';


@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentService.create(createCommentDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Req() req) {
    return this.commentService.update(id, updateCommentDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.commentService.remove(id, req.user.userId);
  }
}
