import {
  Resolver,
  Query,
  Args,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { NotificationIdArgs } from './args/notification-id.args';
import { Notification, NotificationPreferences, NotificationStats } from './models/notification.model';
import { CreateNotificationInput, UpdateNotificationPreferencesInput, NotificationType } from './inputs/create-notification.input';
import { NotificationsService } from './notifications.service';

const pubSub = new PubSub();

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  @Subscription(() => Notification)
  notificationCreated() {
    return pubSub.asyncIterator('notificationCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification)
  async createNotification(
    @UserEntity() user: User,
    @Args('data') data: CreateNotificationInput,
  ) {
    const notification = await this.notificationsService.createNotification(data);
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return notification;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification])
  async getUserNotifications(
    @UserEntity() user: User,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.notificationsService.getUserNotifications(user.id, limit, offset);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification])
  async getUnreadNotifications(@UserEntity() user: User) {
    return this.notificationsService.getUnreadNotifications(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Notification)
  async getNotificationById(
    @UserEntity() user: User,
    @Args() args: NotificationIdArgs,
  ) {
    return this.notificationsService.getNotificationById(args.notificationId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification)
  async markAsRead(
    @UserEntity() user: User,
    @Args() args: NotificationIdArgs,
  ) {
    return this.notificationsService.markAsRead(args.notificationId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Object)
  async markAllAsRead(@UserEntity() user: User) {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification)
  async deleteNotification(
    @UserEntity() user: User,
    @Args() args: NotificationIdArgs,
  ) {
    return this.notificationsService.deleteNotification(args.notificationId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Object)
  async deleteAllNotifications(@UserEntity() user: User) {
    return this.notificationsService.deleteAllNotifications(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => NotificationStats)
  async getNotificationStats(@UserEntity() user: User) {
    return this.notificationsService.getNotificationStats(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => NotificationPreferences)
  async getNotificationPreferences(@UserEntity() user: User) {
    return this.notificationsService.getNotificationPreferences(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => NotificationPreferences)
  async updateNotificationPreferences(
    @UserEntity() user: User,
    @Args('data') data: UpdateNotificationPreferencesInput,
  ) {
    return this.notificationsService.updateNotificationPreferences(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification])
  async getNotificationsByType(
    @UserEntity() user: User,
    @Args('type') type: NotificationType,
  ) {
    return this.notificationsService.getNotificationsByType(user.id, type);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification])
  async getRecentNotifications(
    @UserEntity() user: User,
    @Args('days', { defaultValue: 7 }) days: number,
  ) {
    return this.notificationsService.getRecentNotifications(user.id, days);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createLikeNotification(
    @UserEntity() user: User,
    @Args('userId') userId: string,
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: string,
  ) {
    const notification = await this.notificationsService.createLikeNotification(
      userId,
      user.id,
      targetId,
      targetType,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createCommentNotification(
    @UserEntity() user: User,
    @Args('userId') userId: string,
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: string,
    @Args('commentContent') commentContent: string,
  ) {
    const notification = await this.notificationsService.createCommentNotification(
      userId,
      user.id,
      targetId,
      targetType,
      commentContent,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createFollowNotification(
    @UserEntity() user: User,
    @Args('userId') userId: string,
  ) {
    const notification = await this.notificationsService.createFollowNotification(
      userId,
      user.id,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createMentionNotification(
    @UserEntity() user: User,
    @Args('userId') userId: string,
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: string,
  ) {
    const notification = await this.notificationsService.createMentionNotification(
      userId,
      user.id,
      targetId,
      targetType,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createSystemNotification(
    @UserEntity() user: User,
    @Args('userId') userId: string,
    @Args('title') title: string,
    @Args('message') message: string,
    @Args('priority', { nullable: true }) priority?: string,
  ) {
    const notification = await this.notificationsService.createSystemNotification(
      userId,
      title,
      message,
      priority as any,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createHealthReminder(
    @UserEntity() user: User,
    @Args('userId') userId: string,
    @Args('reminderType') reminderType: string,
    @Args('message') message: string,
  ) {
    const notification = await this.notificationsService.createHealthReminder(
      userId,
      reminderType,
      message,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async createAchievementNotification(
    @UserEntity() user: User,
    @Args('userId') userId: string,
    @Args('achievementName') achievementName: string,
    @Args('achievementDescription') achievementDescription: string,
  ) {
    const notification = await this.notificationsService.createAchievementNotification(
      userId,
      achievementName,
      achievementDescription,
    );
    pubSub.publish('notificationCreated', { notificationCreated: notification });
    return [notification];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Notification])
  async sendBulkNotifications(
    @UserEntity() user: User,
    @Args('userIds', { type: () => [String] }) userIds: string[],
    @Args('data') data: CreateNotificationInput,
  ) {
    const notifications = await this.notificationsService.sendBulkNotifications(userIds, data);
    notifications.forEach(notification => {
      pubSub.publish('notificationCreated', { notificationCreated: notification });
    });
    return notifications;
  }
} 