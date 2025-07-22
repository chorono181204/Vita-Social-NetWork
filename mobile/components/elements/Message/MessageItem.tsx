import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

export interface MessageData {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
  };
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface MessageItemProps {
  message: MessageData;
  onPress: (message: MessageData) => void;
  onUserPress: (username: string) => void;
}

export default function MessageItem({ message, onPress, onUserPress }: MessageItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        message.unreadCount ? styles.unreadContainer : null
      ]}
      onPress={() => onPress(message)}
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => onUserPress(message.user.username)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
        {message.isOnline && <View style={styles.onlineDot} />}
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.displayName} numberOfLines={1}>{message.user.displayName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{message.lastMessage}</Text>
      </View>

      {/* Time & Unread */}
      <View style={styles.rightSection}>
        <Text style={styles.timeAgo}>{message.timeAgo}</Text>
        {message.unreadCount ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{message.unreadCount > 99 ? '99+' : message.unreadCount}</Text>
          </View>
        ) : null}
      </View>
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
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  displayName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.gray,
  },
  rightSection: {
    alignItems: 'flex-end',
    minWidth: 56,
    marginLeft: spacing.sm,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: colors.green,
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
}); 