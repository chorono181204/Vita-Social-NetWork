import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

export interface NotificationData {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'recipe' | 'mention' | 'system';
  user: {
    username: string;
    displayName: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  isRead: boolean;
  postId?: string;
  recipeId?: string;
  commentId?: string;
  image?: string;
}

interface NotificationItemProps {
  notification: NotificationData;
  onPress: (notification: NotificationData) => void;
  onUserPress: (username: string) => void;
}

export default function NotificationItem({ 
  notification, 
  onPress, 
  onUserPress 
}: NotificationItemProps) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return { name: 'heart', color: colors.pink, bgColor: colors.lightGray };
      case 'comment':
        return { name: 'chatbubble', color: colors.blue, bgColor: colors.lightBlue };
      case 'follow':
        return { name: 'person-add', color: colors.green, bgColor: colors.lightGreen };
      case 'recipe':
        return { name: 'restaurant', color: colors.orange, bgColor: '#FFF3E0' };
      case 'mention':
        return { name: 'at', color: colors.indigo, bgColor: colors.lightIndigo };
      case 'system':
        return { name: 'notifications', color: colors.teal, bgColor: colors.lightTeal };
      default:
        return { name: 'notifications', color: colors.gray, bgColor: colors.lightGray };
    }
  };

  const getNotificationText = () => {
    const { type } = notification;
    switch (type) {
      case 'like':
        return `liked your post`;
      case 'comment':
        return `commented on your post`;
      case 'follow':
        return `started following you`;
      case 'recipe':
        return `shared a new recipe`;
      case 'mention':
        return `mentioned you in a comment`;
      case 'system':
        return notification.content;
      default:
        return notification.content;
    }
  };

  const icon = getNotificationIcon();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.isRead && styles.unreadContainer
      ]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      {/* User Avatar */}
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => onUserPress(notification.user.username)}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: notification.user.avatar }} 
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Notification Content */}
      <View style={styles.content}>
        <View style={styles.textRow}>
          <Text style={styles.textWrap} numberOfLines={2}>
            <Text
              style={styles.username}
              onPress={() => onUserPress(notification.user.username)}
            >
              {notification.user.displayName}
            </Text>
            <Text style={styles.notificationText}>
              {' '}{getNotificationText()}
            </Text>
          </Text>
        </View>
        <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
      </View>

      {/* Notification Icon */}
      <View style={[styles.iconContainer, { backgroundColor: icon.bgColor }]}>
        <Ionicons name={icon.name as any} size={16} color={icon.color} />
      </View>

      {/* Unread Indicator */}
      {!notification.isRead && <View style={styles.unreadIndicator} />}

      {/* Post/Recipe Image */}
      {notification.image && (
        <Image source={{ uri: notification.image }} style={styles.postImage} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    minHeight: 72,
  },
  unreadContainer: {
    backgroundColor: colors.lightGrayPurple,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
    justifyContent: 'center',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  textWrap: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 15,
    color: colors.blackGray,
  },
  username: {
    fontWeight: '600',
    color: colors.blackGray,
  },
  notificationText: {
    color: colors.gray,
    fontWeight: '400',
  },
  timeAgo: {
    fontSize: 13,
    color: colors.gray,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  unreadIndicator: {
    position: 'absolute',
    top: spacing.md + 8,
    left: spacing.lg + 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  postImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: spacing.sm,
  },
}); 