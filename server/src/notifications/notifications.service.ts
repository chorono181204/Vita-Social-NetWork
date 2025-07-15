import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateNotificationInput, NotificationType, NotificationPriority } from './inputs/create-notification.input';
import { Notification, NotificationPreferences, NotificationStats } from './models/notification.model';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: CreateNotificationInput): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        image: data.image,
        actionUrl: data.actionUrl,
        actionData: data.actionData,
        senderId: data.senderId,
        senderName: data.senderName,
        senderAvatar: data.senderAvatar,
        targetId: data.targetId,
        targetType: data.targetType,
        tags: data.tags || [],
        priority: data.priority || NotificationPriority.NORMAL,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        isRead: false,
        sentAt: new Date(),
      },
    });

    return notification;
  }

  async createLikeNotification(userId: string, senderId: string, targetId: string, targetType: string): Promise<Notification> {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { name: true, avatar: true },
    });

    const title = `${sender?.name || 'Someone'} liked your ${targetType.toLowerCase()}`;
    const message = `Your ${targetType.toLowerCase()} received a new like!`;

    return this.createNotification({
      userId,
      title,
      message,
      type: NotificationType.LIKE,
      senderId,
      senderName: sender?.name,
      senderAvatar: sender?.avatar,
      targetId,
      targetType,
      actionUrl: `/${targetType.toLowerCase()}/${targetId}`,
    });
  }

  async createCommentNotification(userId: string, senderId: string, targetId: string, targetType: string, commentContent: string): Promise<Notification> {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { name: true, avatar: true },
    });

    const title = `${sender?.name || 'Someone'} commented on your ${targetType.toLowerCase()}`;
    const message = commentContent.length > 50 ? `${commentContent.substring(0, 50)}...` : commentContent;

    return this.createNotification({
      userId,
      title,
      message,
      type: NotificationType.COMMENT,
      senderId,
      senderName: sender?.name,
      senderAvatar: sender?.avatar,
      targetId,
      targetType,
      actionUrl: `/${targetType.toLowerCase()}/${targetId}`,
    });
  }

  async createFollowNotification(userId: string, senderId: string): Promise<Notification> {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { name: true, avatar: true },
    });

    const title = `${sender?.name || 'Someone'} started following you`;
    const message = 'You have a new follower!';

    return this.createNotification({
      userId,
      title,
      message,
      type: NotificationType.FOLLOW,
      senderId,
      senderName: sender?.name,
      senderAvatar: sender?.avatar,
      actionUrl: `/profile/${senderId}`,
    });
  }

  async createMentionNotification(userId: string, senderId: string, targetId: string, targetType: string): Promise<Notification> {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { name: true, avatar: true },
    });

    const title = `${sender?.name || 'Someone'} mentioned you`;
    const message = `You were mentioned in a ${targetType.toLowerCase()}`;

    return this.createNotification({
      userId,
      title,
      message,
      type: NotificationType.MENTION,
      senderId,
      senderName: sender?.name,
      senderAvatar: sender?.avatar,
      targetId,
      targetType,
      actionUrl: `/${targetType.toLowerCase()}/${targetId}`,
    });
  }

  async createSystemNotification(userId: string, title: string, message: string, priority: NotificationPriority = NotificationPriority.NORMAL): Promise<Notification> {
    return this.createNotification({
      userId,
      title,
      message,
      type: NotificationType.SYSTEM,
      priority,
    });
  }

  async createHealthReminder(userId: string, reminderType: string, message: string): Promise<Notification> {
    return this.createNotification({
      userId,
      title: `Health Reminder: ${reminderType}`,
      message,
      type: NotificationType.HEALTH_REMINDER,
      priority: NotificationPriority.HIGH,
      tags: ['health', 'reminder', reminderType.toLowerCase()],
    });
  }

  async createAchievementNotification(userId: string, achievementName: string, achievementDescription: string): Promise<Notification> {
    return this.createNotification({
      userId,
      title: `Achievement Unlocked: ${achievementName}`,
      message: achievementDescription,
      type: NotificationType.ACHIEVEMENT,
      priority: NotificationPriority.HIGH,
      tags: ['achievement', 'unlock'],
    });
  }

  async getUserNotifications(userId: string, limit: number = 20, offset: number = 0): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getNotificationById(notificationId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new Error('You can only mark your own notifications as read');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    return { count: result.count };
  }

  async deleteNotification(notificationId: string, userId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new Error('You can only delete your own notifications');
    }

    return this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  async deleteAllNotifications(userId: string): Promise<{ count: number }> {
    const result = await this.prisma.notification.deleteMany({
      where: { userId },
    });

    return { count: result.count };
  }

  async getNotificationStats(userId: string): Promise<NotificationStats> {
    const [totalCount, unreadCount, readCount, types] = await Promise.all([
      this.prisma.notification.count({ where: { userId } }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
      this.prisma.notification.count({ where: { userId, isRead: true } }),
      this.prisma.notification.groupBy({
        by: ['type'],
        where: { userId },
        _count: { type: true },
      }),
    ]);

    return {
      totalCount,
      unreadCount,
      readCount,
      types: types.map(t => t.type),
    };
  }

  async getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
    let preferences = await this.prisma.notificationPreferences.findUnique({
      where: { userId },
    });

    if (!preferences) {
      preferences = await this.prisma.notificationPreferences.create({
        data: {
          userId,
          emailNotifications: true,
          pushNotifications: true,
          inAppNotifications: true,
          enabledTypes: Object.values(NotificationType),
          disabledTypes: [],
          quietHoursEnabled: false,
        },
      });
    }

    return preferences;
  }

  async updateNotificationPreferences(userId: string, data: any): Promise<NotificationPreferences> {
    return this.prisma.notificationPreferences.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        emailNotifications: data.emailNotifications ?? true,
        pushNotifications: data.pushNotifications ?? true,
        inAppNotifications: data.inAppNotifications ?? true,
        enabledTypes: data.enabledTypes ?? Object.values(NotificationType),
        disabledTypes: data.disabledTypes ?? [],
        quietHoursEnabled: data.quietHoursEnabled ?? false,
        quietHoursStart: data.quietHoursStart,
        quietHoursEnd: data.quietHoursEnd,
      },
    });
  }

  async sendBulkNotifications(userIds: string[], data: CreateNotificationInput): Promise<Notification[]> {
    const notifications = await Promise.all(
      userIds.map(userId =>
        this.createNotification({
          ...data,
          userId,
        })
      )
    );

    return notifications;
  }

  async getScheduledNotifications(): Promise<Notification[]> {
    const now = new Date();
    return this.prisma.notification.findMany({
      where: {
        scheduledAt: {
          lte: now,
        },
        sentAt: null,
      },
    });
  }

  async processScheduledNotifications(): Promise<void> {
    const scheduledNotifications = await this.getScheduledNotifications();
    
    for (const notification of scheduledNotifications) {
      await this.prisma.notification.update({
        where: { id: notification.id },
        data: { sentAt: new Date() },
      });
    }
  }

  async getNotificationsByType(userId: string, type: NotificationType): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        userId,
        type,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRecentNotifications(userId: string, days: number = 7): Promise<Notification[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return this.prisma.notification.findMany({
      where: {
        userId,
        createdAt: {
          gte: date,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
} 