import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCommentInput } from './inputs/create-comment.input';
import { UpdateCommentInput } from './inputs/update-comment.input';
import { User } from '../users/models/user.model';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(authorId: string, data: CreateCommentInput) {
    const post = await this.prisma.post.findUnique({
      where: { id: data.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (data.parentId) {
      const parentComment = await this.prisma.comment.findUnique({
        where: { id: data.parentId },
      });

      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
    }

    return this.prisma.comment.create({
      data: {
        content: data.content,
        authorId,
        postId: data.postId,
        parentId: data.parentId,
      },
      include: {
        author: true,
        post: true,
      },
    });
  }

  async updateComment(commentId: string, userId: string, data: UpdateCommentInput) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only update your own comments');
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        content: data.content,
      },
      include: {
        author: true,
        post: true,
      },
    });
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

  async getComment(commentId: string, userId?: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        author: true,
        post: true,
        replies: {
          include: {
            author: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (userId) {
      const isLiked = await this.prisma.commentLike.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId,
          },
        },
      });

      return {
        ...comment,
        isLiked: !!isLiked,
      };
    }

    return comment;
  }

  async getPostComments(postId: string, userId?: string) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (userId) {
      const commentsWithLikes = await Promise.all(
        comments.map(async (comment) => {
          const isLiked = await this.prisma.commentLike.findUnique({
            where: {
              userId_commentId: {
                userId,
                commentId: comment.id,
              },
            },
          });

          return {
            ...comment,
            isLiked: !!isLiked,
            likesCount: comment._count.likes,
            repliesCount: comment._count.replies,
          };
        })
      );

      return commentsWithLikes;
    }

    return comments.map(comment => ({
      ...comment,
      likesCount: comment._count.likes,
      repliesCount: comment._count.replies,
    }));
  }

  async likeComment(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const existingLike = await this.prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (existingLike) {
      return this.prisma.commentLike.delete({
        where: {
          userId_commentId: {
            userId,
            commentId,
          },
        },
      });
    }

    return this.prisma.commentLike.create({
      data: {
        userId,
        commentId,
      },
    });
  }

  async getUserComments(userId: string) {
    return this.prisma.comment.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
        post: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
} 