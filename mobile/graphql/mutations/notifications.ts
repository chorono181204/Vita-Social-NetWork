import { gql } from '@apollo/client';
import { NOTIFICATION_FRAGMENT, NOTIFICATION_PREFERENCES_FRAGMENT } from '../fragments/notification';

export const CREATE_NOTIFICATION_MUTATION = gql`
  mutation CreateNotification($data: CreateNotificationInput!) {
    createNotification(data: $data) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const MARK_AS_READ_MUTATION = gql`
  mutation MarkAsRead($notificationId: String!) {
    markAsRead(notificationId: $notificationId) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const MARK_ALL_AS_READ_MUTATION = gql`
  mutation MarkAllAsRead {
    markAllAsRead {
      count
    }
  }
`;

export const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotification($notificationId: String!) {
    deleteNotification(notificationId: $notificationId) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const DELETE_ALL_NOTIFICATIONS_MUTATION = gql`
  mutation DeleteAllNotifications {
    deleteAllNotifications {
      count
    }
  }
`;

export const UPDATE_NOTIFICATION_PREFERENCES_MUTATION = gql`
  mutation UpdateNotificationPreferences($data: UpdateNotificationPreferencesInput!) {
    updateNotificationPreferences(data: $data) {
      ...NotificationPreferencesFields
    }
  }
  ${NOTIFICATION_PREFERENCES_FRAGMENT}
`;

export const CREATE_LIKE_NOTIFICATION_MUTATION = gql`
  mutation CreateLikeNotification($userId: String!, $targetId: String!, $targetType: String!) {
    createLikeNotification(userId: $userId, targetId: $targetId, targetType: $targetType) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_COMMENT_NOTIFICATION_MUTATION = gql`
  mutation CreateCommentNotification($userId: String!, $targetId: String!, $targetType: String!, $commentContent: String!) {
    createCommentNotification(userId: $userId, targetId: $targetId, targetType: $targetType, commentContent: $commentContent) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_FOLLOW_NOTIFICATION_MUTATION = gql`
  mutation CreateFollowNotification($userId: String!) {
    createFollowNotification(userId: $userId) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_MENTION_NOTIFICATION_MUTATION = gql`
  mutation CreateMentionNotification($userId: String!, $targetId: String!, $targetType: String!) {
    createMentionNotification(userId: $userId, targetId: $targetId, targetType: $targetType) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_SYSTEM_NOTIFICATION_MUTATION = gql`
  mutation CreateSystemNotification($userId: String!, $title: String!, $message: String!, $priority: String) {
    createSystemNotification(userId: $userId, title: $title, message: $message, priority: $priority) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_HEALTH_REMINDER_MUTATION = gql`
  mutation CreateHealthReminder($userId: String!, $reminderType: String!, $message: String!) {
    createHealthReminder(userId: $userId, reminderType: $reminderType, message: $message) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const CREATE_ACHIEVEMENT_NOTIFICATION_MUTATION = gql`
  mutation CreateAchievementNotification($userId: String!, $achievementName: String!, $achievementDescription: String!) {
    createAchievementNotification(userId: $userId, achievementName: $achievementName, achievementDescription: $achievementDescription) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const SEND_BULK_NOTIFICATIONS_MUTATION = gql`
  mutation SendBulkNotifications($userIds: [String!]!, $data: CreateNotificationInput!) {
    sendBulkNotifications(userIds: $userIds, data: $data) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`; 