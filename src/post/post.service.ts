/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/post/post.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post } from 'src/entities/post.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const category = await this.categoryRepository.findOne({ where: { id: createPostDto.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const post = this.postRepository.create({
      ...createPostDto,
      user,
      category,
    });
    return this.postRepository.save(post);
  }

  async getPosts(options: {
    sort?: 'time' | 'upvotes';
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ posts: Post[]; total: number }> {
    const query = this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.category', 'category');

    if (options.category) {
      query.andWhere('category.name = :category', { category: options.category });
    }

    if (options.sort === 'time') {
      query.orderBy('post.createdAt', 'DESC');
    } else if (options.sort === 'upvotes') {
      query.orderBy('post.upvotes', 'DESC');
    }

    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    query.skip(skip).take(limit);

    const [posts, total] = await query.getManyAndCount();
    return { posts, total };
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'comments', 'comments.user'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, user: User): Promise<Post> {
    const post = await this.getPostById(id);
    if (post.user.id !== user.id) {
      throw new ForbiddenException('You can only edit your own posts');
    }

    if (updatePostDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updatePostDto.categoryId } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      post.category = category;
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async deletePost(id: number, user: User): Promise<void> {
    const post = await this.getPostById(id);
    if (post.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    await this.postRepository.remove(post);
  }

  async upvotePost(id: number, user: User): Promise<Post> {
    const post = await this.getPostById(id);
    post.upvotes += 1;
    return this.postRepository.save(post);
  }

  async downvotePost(id: number, user: User): Promise<Post> {
    const post = await this.getPostById(id);
    post.downvotes += 1;
    return this.postRepository.save(post);
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.postRepository.increment({ id }, 'viewCount', 1);
  }
}