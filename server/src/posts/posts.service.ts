import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostOrder } from './inputs/post-order.input';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { User } from '../users/models/user.model';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(authorId: string, data: CreatePostInput) {
    const searchText = this.generateSearchText(data.title, data.content, data.tags);
    
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        cuisine: data.cuisine,
        difficulty: data.difficulty,
        tags: data.tags || [],
        searchText,
        published: true,
        authorId,
      },
      include: {
        author: true,
      },
    });
  }

  async updatePost(postId: string, userId: string, data: UpdatePostInput) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    const searchText = this.generateSearchText(data.title, data.content, data.tags);

    return this.prisma.post.update({
      where: { id: postId },
      data: {
        ...data,
        searchText,
      },
      include: {
        author: true,
      },
    });
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    return this.prisma.post.delete({
      where: { id: postId },
    });
  }

  async getPost(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async getPublishedPosts(
    paginationArgs: PaginationArgs,
    query?: string,
    orderBy?: PostOrder,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.post.findMany({
          include: { author: true },
          where: {
            published: true,
            OR: [
              { title: { contains: query || '', mode: 'insensitive' } },
              { content: { contains: query || '', mode: 'insensitive' } },
              { searchText: { contains: query || '', mode: 'insensitive' } },
            ],
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: 'desc' },
          ...args,
        }),
      () =>
        this.prisma.post.count({
          where: {
            published: true,
            OR: [
              { title: { contains: query || '', mode: 'insensitive' } },
              { content: { contains: query || '', mode: 'insensitive' } },
              { searchText: { contains: query || '', mode: 'insensitive' } },
            ],
          },
        }),
      paginationArgs,
    );
  }

  async getUserPosts(userId: string) {
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
        published: true,
      },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async likePost(postId: string, userId: string) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      return this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async savePost(postId: string, userId: string) {
    const existingSave = await this.prisma.save.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingSave) {
      return this.prisma.save.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    return this.prisma.save.create({
      data: {
        userId,
        postId,
      },
    });
  }

  private generateSearchText(title?: string, content?: string, tags?: string[]): string {
    const parts = [
      title || '',
      content || '',
      ...(tags || []),
    ].filter(Boolean);
    
    return parts.join(' ').toLowerCase();
  }
} 