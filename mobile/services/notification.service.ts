import { apolloClient } from '@/apollo/clients';
import {
  GET_USER_NOTIFICATIONS_QUERY,
  GET_UNREAD_NOTIFICATIONS_QUERY,
  GET_NOTIFICATION_BY_ID_QUERY,
  GET_NOTIFICATION_STATS_QUERY,
  GET_NOTIFICATION_PREFERENCES_QUERY,
  GET_NOTIFICATIONS_BY_TYPE_QUERY,
  GET_RECENT_NOTIFICATIONS_QUERY,
} from '@/graphql/queries/notifications';
import {
  CREATE_NOTIFICATION_MUTATION,
  MARK_AS_READ_MUTATION,
  MARK_ALL_AS_READ_MUTATION,
  DELETE_NOTIFICATION_MUTATION,
  DELETE_ALL_NOTIFICATIONS_MUTATION,
  UPDATE_NOTIFICATION_PREFERENCES_MUTATION,
  CREATE_LIKE_NOTIFICATION_MUTATION,
  CREATE_COMMENT_NOTIFICATION_MUTATION,
  CREATE_FOLLOW_NOTIFICATION_MUTATION,
  CREATE_MENTION_NOTIFICATION_MUTATION,
  CREATE_SYSTEM_NOTIFICATION_MUTATION,
  CREATE_HEALTH_REMINDER_MUTATION,
  CREATE_ACHIEVEMENT_NOTIFICATION_MUTATION,
  SEND_BULK_NOTIFICATIONS_MUTATION,
} from '@/graphql/mutations/notifications';

export enum NotificationType {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
  FOLLOW = 'FOLLOW',
  MENTION = 'MENTION',
  SYSTEM = 'SYSTEM',
  RECIPE_SHARE = 'RECIPE_SHARE',
  HEALTH_REMINDER = 'HEALTH_REMINDER',
  ACHIEVEMENT = 'ACHIEVEMENT',
  MESSAGE = 'MESSAGE',
  RECIPE_RATING = 'RECIPE_RATING',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface CreateNotificationData {
  userId: string;
  title: string;
  message?: string;
  type: NotificationType;
  image?: string;
  actionUrl?: string;
  actionData?: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  targetId?: string;
  targetType?: string;
  tags?: string[];
  priority?: NotificationPriority;
  scheduledAt?: string;
}

export interface UpdateNotificationPreferencesData {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  inAppNotifications?: boolean;
  enabledTypes?: string[];
  disabledTypes?: string[];
  quietHoursEnabled?: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message?: string;
  type: string;
  isRead: boolean;
  image?: string;
  actionUrl?: string;
  actionData?: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  targetId?: string;
  targetType?: string;
  tags: string[];
  priority?: string;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  enabledTypes: string[];
  disabledTypes: string[];
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface NotificationStats {
  totalCount: number;
  unreadCount: number;
  readCount: number;
  types: string[];
}

export const getUserNotifications = async (limit?: number, offset?: number): Promise<Notification[]> => {
  const { data } = await apolloClient.query({
    query: GET_USER_NOTIFICATIONS_QUERY,
    variables: { limit, offset },
  });
  return data.getUserNotifications;
};

export const getUnreadNotifications = async (): Promise<Notification[]> => {
  const { data } = await apolloClient.query({
    query: GET_UNREAD_NOTIFICATIONS_QUERY,
  });
  return data.getUnreadNotifications;
};

export const getNotificationById = async (notificationId: string): Promise<Notification> => {
  const { data } = await apolloClient.query({
    query: GET_NOTIFICATION_BY_ID_QUERY,
    variables: { notificationId },
  });
  return data.getNotificationById;
};

export const getNotificationStats = async (): Promise<NotificationStats> => {
  const { data } = await apolloClient.query({
    query: GET_NOTIFICATION_STATS_QUERY,
  });
  return data.getNotificationStats;
};

export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  const { data } = await apolloClient.query({
    query: GET_NOTIFICATION_PREFERENCES_QUERY,
  });
  return data.getNotificationPreferences;
};

export const getNotificationsByType = async (type: NotificationType): Promise<Notification[]> => {
  const { data } = await apolloClient.query({
    query: GET_NOTIFICATIONS_BY_TYPE_QUERY,
    variables: { type },
  });
  return data.getNotificationsByType;
};

export const getRecentNotifications = async (days?: number): Promise<Notification[]> => {
  const { data } = await apolloClient.query({
    query: GET_RECENT_NOTIFICATIONS_QUERY,
    variables: { days },
  });
  return data.getRecentNotifications;
};

export const createNotification = async (data: CreateNotificationData): Promise<Notification> => {
  const { data: result } = await apolloClient.mutate({
    mutation: CREATE_NOTIFICATION_MUTATION,
    variables: { data },
  });
  return result.createNotification;
};

export const markAsRead = async (notificationId: string): Promise<Notification> => {
  const { data } = await apolloClient.mutate({
    mutation: MARK_AS_READ_MUTATION,
    variables: { notificationId },
  });
  return data.markAsRead;
};

export const markAllAsRead = async (): Promise<{ count: number }> => {
  const { data } = await apolloClient.mutate({
    mutation: MARK_ALL_AS_READ_MUTATION,
  });
  return data.markAllAsRead;
};

export const deleteNotification = async (notificationId: string): Promise<Notification> => {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_NOTIFICATION_MUTATION,
    variables: { notificationId },
  });
  return data.deleteNotification;
};

export const deleteAllNotifications = async (): Promise<{ count: number }> => {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_ALL_NOTIFICATIONS_MUTATION,
  });
  return data.deleteAllNotifications;
};

export const updateNotificationPreferences = async (data: UpdateNotificationPreferencesData): Promise<NotificationPreferences> => {
  const { data: result } = await apolloClient.mutate({
    mutation: UPDATE_NOTIFICATION_PREFERENCES_MUTATION,
    variables: { data },
  });
  return result.updateNotificationPreferences;
};

export const createLikeNotification = async (userId: string, targetId: string, targetType: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_LIKE_NOTIFICATION_MUTATION,
    variables: { userId, targetId, targetType },
  });
  return data.createLikeNotification;
};

export const createCommentNotification = async (userId: string, targetId: string, targetType: string, commentContent: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_COMMENT_NOTIFICATION_MUTATION,
    variables: { userId, targetId, targetType, commentContent },
  });
  return data.createCommentNotification;
};

export const createFollowNotification = async (userId: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_FOLLOW_NOTIFICATION_MUTATION,
    variables: { userId },
  });
  return data.createFollowNotification;
};

export const createMentionNotification = async (userId: string, targetId: string, targetType: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_MENTION_NOTIFICATION_MUTATION,
    variables: { userId, targetId, targetType },
  });
  return data.createMentionNotification;
};

export const createSystemNotification = async (userId: string, title: string, message: string, priority?: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_SYSTEM_NOTIFICATION_MUTATION,
    variables: { userId, title, message, priority },
  });
  return data.createSystemNotification;
};

export const createHealthReminder = async (userId: string, reminderType: string, message: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_HEALTH_REMINDER_MUTATION,
    variables: { userId, reminderType, message },
  });
  return data.createHealthReminder;
};

export const createAchievementNotification = async (userId: string, achievementName: string, achievementDescription: string): Promise<Notification[]> => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_ACHIEVEMENT_NOTIFICATION_MUTATION,
    variables: { userId, achievementName, achievementDescription },
  });
  return data.createAchievementNotification;
};

export const sendBulkNotifications = async (userIds: string[], data: CreateNotificationData): Promise<Notification[]> => {
  const { data: result } = await apolloClient.mutate({
    mutation: SEND_BULK_NOTIFICATIONS_MUTATION,
    variables: { userIds, data },
  });
  return result.sendBulkNotifications;
}; 