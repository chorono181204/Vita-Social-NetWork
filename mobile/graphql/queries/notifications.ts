import { gql } from '@apollo/client';
import { NOTIFICATION_FRAGMENT, NOTIFICATION_PREFERENCES_FRAGMENT, NOTIFICATION_STATS_FRAGMENT } from '../fragments/notification';

export const GET_USER_NOTIFICATIONS_QUERY = gql`
  query GetUserNotifications($limit: Int, $offset: Int) {
    getUserNotifications(limit: $limit, offset: $offset) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const GET_UNREAD_NOTIFICATIONS_QUERY = gql`
  query GetUnreadNotifications {
    getUnreadNotifications {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const GET_NOTIFICATION_BY_ID_QUERY = gql`
  query GetNotificationById($notificationId: String!) {
    getNotificationById(notificationId: $notificationId) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const GET_NOTIFICATION_STATS_QUERY = gql`
  query GetNotificationStats {
    getNotificationStats {
      ...NotificationStatsFields
    }
  }
  ${NOTIFICATION_STATS_FRAGMENT}
`;

export const GET_NOTIFICATION_PREFERENCES_QUERY = gql`
  query GetNotificationPreferences {
    getNotificationPreferences {
      ...NotificationPreferencesFields
    }
  }
  ${NOTIFICATION_PREFERENCES_FRAGMENT}
`;

export const GET_NOTIFICATIONS_BY_TYPE_QUERY = gql`
  query GetNotificationsByType($type: NotificationType!) {
    getNotificationsByType(type: $type) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const GET_RECENT_NOTIFICATIONS_QUERY = gql`
  query GetRecentNotifications($days: Int) {
    getRecentNotifications(days: $days) {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`; 