import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

interface PostHeaderProps {
  user: {
    username: string;
    avatar: string;
    displayName?: string;
  };
  timeAgo: string;
  onUserPress?: () => void;
  badge?: {
    icon?: string;
    text: string;
    backgroundColor?: string;
    textColor?: string;
  };
  showMoreButton?: boolean;
  onMorePress?: () => void;
}

export default function PostHeader({
  user,
  timeAgo,
  onUserPress,
  badge,
  showMoreButton = true,
  onMorePress
}: PostHeaderProps) {
  return (
    <TouchableOpacity style={styles.header} onPress={onUserPress}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
      
      {badge && (
        <View style={[
          styles.badge,
          { backgroundColor: badge.backgroundColor || colors.lightGreen }
        ]}>
          {badge.icon && (
            <Ionicons 
              name={badge.icon as any} 
              size={16} 
              color={badge.textColor || colors.green} 
            />
          )}
          <Text style={[
            styles.badgeText,
            { color: badge.textColor || colors.green },
            badge.icon && { marginLeft: 4 }
          ]}>
            {badge.text}
          </Text>
        </View>
      )}
      
      {showMoreButton && (
        <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.gray} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.blackGray,
  },
  timeAgo: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 