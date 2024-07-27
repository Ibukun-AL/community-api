/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;
}
