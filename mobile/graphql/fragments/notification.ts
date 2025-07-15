import { gql } from '@apollo/client';

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationFields on Notification {
    id
    userId
    title
    message
    type
    isRead
    image
    actionUrl
    actionData
    senderId
    senderName
    senderAvatar
    targetId
    targetType
    tags
    priority
    scheduledAt
    sentAt
    createdAt
    updatedAt
  }
`;

export const NOTIFICATION_PREFERENCES_FRAGMENT = gql`
  fragment NotificationPreferencesFields on NotificationPreferences {
    userId
    emailNotifications
    pushNotifications
    inAppNotifications
    enabledTypes
    disabledTypes
    quietHoursEnabled
    quietHoursStart
    quietHoursEnd
  }
`;

export const NOTIFICATION_STATS_FRAGMENT = gql`
  fragment NotificationStatsFields on NotificationStats {
    totalCount
    unreadCount
    readCount
    types
  }
`; 