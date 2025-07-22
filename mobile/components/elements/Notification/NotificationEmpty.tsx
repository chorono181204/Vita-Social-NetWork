import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

interface NotificationEmptyProps {
  type?: 'all' | 'mentions' | 'follows' | 'likes' | 'comments' | 'recipes';
}

export default function NotificationEmpty({ type = 'all' }: NotificationEmptyProps) {
  const getEmptyContent = () => {
    switch (type) {
      case 'mentions':
        return {
          icon: 'at',
          title: 'No mentions yet',
          subtitle: 'When someone mentions you in a comment, it will appear here'
        };
      case 'follows':
        return {
          icon: 'people',
          title: 'No new followers',
          subtitle: 'When someone follows you, you\'ll see it here'
        };
      case 'likes':
        return {
          icon: 'heart',
          title: 'No likes yet',
          subtitle: 'When someone likes your posts, you\'ll see it here'
        };
      case 'comments':
        return {
          icon: 'chatbubble',
          title: 'No comments yet',
          subtitle: 'When someone comments on your posts, you\'ll see it here'
        };
      case 'recipes':
        return {
          icon: 'restaurant',
          title: 'No recipe notifications',
          subtitle: 'When someone shares recipes you might like, you\'ll see it here'
        };
      default:
        return {
          icon: 'notifications-off',
          title: 'All caught up!',
          subtitle: 'You\'re up to date with all your notifications'
        };
    }
  };

  const content = getEmptyContent();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={content.icon as any} size={64} color={colors.gray} />
      </View>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.subtitle}>{content.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.blackGray,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
}); 