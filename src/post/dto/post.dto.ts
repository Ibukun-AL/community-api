/* eslint-disable prettier/prettier */
// src/post/dto/post.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { SortOrder } from './sort-order.enum';


export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}



export class GetPostsDto {
    @IsOptional()
    @IsEnum(SortOrder)
    sortBy?: SortOrder; // Sorting option
  
    @IsOptional()
    @IsString()
    category?: string; // Filtering by category
  }

  