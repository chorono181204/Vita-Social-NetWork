import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, sizing } from '@/theme';
import { Comment as CommentType } from '@/types';
import CommentActions from './CommentActions';
import CommentMoreModal from './CommentMoreModal';

interface CommentProps {
  comment: CommentType;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, comment: CommentType) => void;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, newContent: string) => void;
  onUserPress?: (userId: string) => void;
  showReplies?: boolean;
  isReply?: boolean;
}

export default function Comment({
  comment,
  onLike,
  onReply,
  onDelete,
  onEdit,
  onUserPress,
  showReplies = true,
  isReply = false
}: CommentProps) {
  const [moreModalVisible, setMoreModalVisible] = useState(false);

  const handleLike = () => {
    onLike?.(comment.id);
  };

  const handleReply = () => {
    onReply?.(comment.id, comment);
  };

  const handleMorePress = () => {
    setMoreModalVisible(true);
  };

  // Check if comment belongs to current user (mock logic)
  const isOwnComment = () => {
    // In real app, compare with current user ID
    return comment.user.username === 'user.current'; // Mock current user
  };

  const handleEdit = () => {
    Alert.alert('Edit Comment', 'Edit functionality will be implemented here');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(comment.id)
        }
      ]
    );
  };

  const handleReport = () => {
    Alert.alert(
      'Report Comment',
      'What\'s wrong with this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Reported', 'Thanks for letting us know');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, isReply && styles.replyContainer]}>
      <TouchableOpacity onPress={() => onUserPress?.(comment.user.id)}>
        <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.commentBubble}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => onUserPress?.(comment.user.id)}>
              <Text style={styles.username}>{comment.user.displayName || comment.user.username}</Text>
            </TouchableOpacity>
            {comment.user.verified && (
              <Ionicons name="checkmark-circle" size={14} color={colors.blue} style={styles.verifiedIcon} />
            )}
          </View>
          
          <Text style={styles.content}>{comment.content}</Text>
          
          {comment.edited && (
            <Text style={styles.editedText}>• Edited</Text>
          )}
        </View>

        <CommentActions
          timeAgo={comment.timeAgo}
          likes={comment.likes}
          isLiked={comment.isLiked}
          onLike={handleLike}
          onReply={handleReply}
          onMorePress={handleMorePress}
        />

        {/* Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {comment.replies.slice(0, 3).map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
                onDelete={onDelete}
                onEdit={onEdit}
                onUserPress={onUserPress}
                showReplies={false}
                isReply={true}
              />
            ))}
            
            {comment.replies.length > 3 && (
              <TouchableOpacity style={styles.viewMoreReplies}>
                <Text style={styles.viewMoreText}>
                  View {comment.replies.length - 3} more replies
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Comment More Modal */}
      <CommentMoreModal
        visible={moreModalVisible}
        onClose={() => setMoreModalVisible(false)}
        isOwnComment={isOwnComment()}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReport={handleReport}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  replyContainer: {
    paddingLeft: spacing.xxxl,
    marginTop: spacing.xs,
  },
  avatar: {
    width: sizing.avatarSm,
    height: sizing.avatarSm,
    borderRadius: sizing.avatarSm / 2,
    marginRight: spacing.sm,
  },
  contentContainer: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.blackGray,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  content: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.blackGray,
  },
  editedText: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 2,
    fontStyle: 'italic',
  },
  repliesContainer: {
    marginTop: spacing.sm,
  },
  viewMoreReplies: {
    paddingLeft: spacing.xxxl,
    paddingVertical: spacing.xs,
  },
  viewMoreText: {
    fontSize: 12,
    color: colors.blue,
    fontWeight: '500',
  },
}); 