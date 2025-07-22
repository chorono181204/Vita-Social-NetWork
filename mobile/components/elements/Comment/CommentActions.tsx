import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

interface CommentActionsProps {
  timeAgo: string;
  likes: number;
  isLiked?: boolean;
  onLike: () => void;
  onReply: () => void;
  onMorePress?: () => void;
}

export default function CommentActions({
  timeAgo,
  likes,
  isLiked,
  onLike,
  onReply,
  onMorePress
}: CommentActionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.timeAgo}>{timeAgo}</Text>
      
      <TouchableOpacity style={styles.actionButton} onPress={onLike}>
        <Ionicons 
          name={isLiked ? "heart" : "heart-outline"} 
          size={16} 
          color={isLiked ? colors.pink : colors.gray} 
        />
        {likes > 0 && (
          <Text style={styles.actionText}>{likes}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onReply}>
        <Ionicons name="arrow-undo-outline" size={16} color={colors.gray} />
      </TouchableOpacity>

      {onMorePress && (
        <TouchableOpacity style={styles.actionButton} onPress={onMorePress}>
          <Ionicons name="ellipsis-horizontal" size={16} color={colors.gray} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingLeft: spacing.xs,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.gray,
    marginRight: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '500',
    marginLeft: 2,
  },
}); 