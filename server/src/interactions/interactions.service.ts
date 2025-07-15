import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateInteractionInput, InteractionType, TargetType } from './inputs/create-interaction.input';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async createInteraction(userId: string, data: CreateInteractionInput) {
    const existingInteraction = await this.prisma.interaction.findFirst({
      where: {
        userId,
        targetId: data.targetId,
        targetType: data.targetType,
        interactionType: data.interactionType,
      },
    });

    if (existingInteraction) {
      return this.prisma.interaction.delete({
        where: { id: existingInteraction.id },
      });
    }

    return this.prisma.interaction.create({
      data: {
        userId,
        targetId: data.targetId,
        targetType: data.targetType,
        interactionType: data.interactionType,
        metadata: data.metadata,
      },
    });
  }

  async getInteractionStats(targetId: string, targetType: TargetType, userId?: string) {
    const [likesCount, sharesCount, savesCount] = await Promise.all([
      this.prisma.interaction.count({
        where: {
          targetId,
          targetType,
          interactionType: InteractionType.LIKE,
        },
      }),
      this.prisma.interaction.count({
        where: {
          targetId,
          targetType,
          interactionType: InteractionType.SHARE,
        },
      }),
      this.prisma.interaction.count({
        where: {
          targetId,
          targetType,
          interactionType: InteractionType.SAVE,
        },
      }),
    ]);

    const result = {
      targetId,
      targetType,
      likesCount,
      sharesCount,
      savesCount,
      isLiked: false,
      isShared: false,
      isSaved: false,
    };

    if (userId) {
      const [isLiked, isShared, isSaved] = await Promise.all([
        this.prisma.interaction.findFirst({
          where: {
            userId,
            targetId,
            targetType,
            interactionType: InteractionType.LIKE,
          },
        }),
        this.prisma.interaction.findFirst({
          where: {
            userId,
            targetId,
            targetType,
            interactionType: InteractionType.SHARE,
          },
        }),
        this.prisma.interaction.findFirst({
          where: {
            userId,
            targetId,
            targetType,
            interactionType: InteractionType.SAVE,
          },
        }),
      ]);

      result.isLiked = !!isLiked;
      result.isShared = !!isShared;
      result.isSaved = !!isSaved;
    }

    return result;
  }

  async getUserInteractions(userId: string, interactionType?: InteractionType) {
    const where: any = { userId };
    
    if (interactionType) {
      where.interactionType = interactionType;
    }

    return this.prisma.interaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserLikes(userId: string) {
    return this.prisma.interaction.findMany({
      where: {
        userId,
        interactionType: InteractionType.LIKE,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserShares(userId: string) {
    return this.prisma.interaction.findMany({
      where: {
        userId,
        interactionType: InteractionType.SHARE,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserSaves(userId: string) {
    return this.prisma.interaction.findMany({
      where: {
        userId,
        interactionType: InteractionType.SAVE,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTopInteractedContent(targetType: TargetType, interactionType: InteractionType, limit: number = 10) {
    const interactions = await this.prisma.interaction.groupBy({
      by: ['targetId'],
      where: {
        targetType,
        interactionType,
      },
      _count: {
        targetId: true,
      },
      orderBy: {
        _count: {
          targetId: 'desc',
        },
      },
      take: limit,
    });

    return interactions.map(interaction => ({
      targetId: interaction.targetId,
      count: interaction._count.targetId,
    }));
  }

  async deleteInteraction(interactionId: string, userId: string) {
    const interaction = await this.prisma.interaction.findUnique({
      where: { id: interactionId },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    if (interaction.userId !== userId) {
      throw new Error('You can only delete your own interactions');
    }

    return this.prisma.interaction.delete({
      where: { id: interactionId },
    });
  }

  async getInteractionAnalytics(targetId: string, targetType: TargetType) {
    const [totalInteractions, interactionsByType, recentInteractions] = await Promise.all([
      this.prisma.interaction.count({
        where: {
          targetId,
          targetType,
        },
      }),
      this.prisma.interaction.groupBy({
        by: ['interactionType'],
        where: {
          targetId,
          targetType,
        },
        _count: {
          interactionType: true,
        },
      }),
      this.prisma.interaction.findMany({
        where: {
          targetId,
          targetType,
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      }),
    ]);

    return {
      targetId,
      targetType,
      totalInteractions,
      interactionsByType: interactionsByType.reduce((acc, item) => {
        acc[item.interactionType] = item._count.interactionType;
        return acc;
      }, {}),
      recentInteractions,
    };
  }
} 