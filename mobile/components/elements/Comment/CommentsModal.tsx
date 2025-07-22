import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';
import { Comment as CommentType } from '@/types';
import Comment from './Comment';
import CommentInput from './CommentInput';

// Mock comment data
const MOCK_COMMENTS: CommentType[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      username: 'healthy_chef',
      displayName: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      verified: true,
    },
    content: 'This looks amazing! Can you share the recipe for the sauce?',
    timeAgo: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        user: {
          id: 'user2',
          username: 'foodie_mike',
          displayName: 'Mike Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        content: 'I second this! The sauce looks incredible 🤤',
        timeAgo: '1 hour ago',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 5,
        isLiked: true,
        parentId: '1',
        isReply: true,
      }
    ],
    replyCount: 1,
  },
  {
    id: '2',
    user: {
      id: 'user3',
      username: 'nutrition_expert',
      displayName: 'Dr. Emily Chen',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      verified: true,
    },
    content: 'Love the nutritional balance in this meal! Perfect combination of proteins and healthy fats. Great work! 👩‍⚕️',
    timeAgo: '4 hours ago',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 28,
    isLiked: true,
    replies: [],
    replyCount: 0,
  },
  {
    id: '3',
    user: {
      id: 'user4',
      username: 'gym_bro',
      displayName: 'Alex Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    content: 'This is exactly what I needed for my post-workout meal! How many calories approximately?',
    timeAgo: '6 hours ago',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 8,
    isLiked: false,
    replies: [
      {
        id: '3-1',
        user: {
          id: 'user5',
          username: 'calorie_counter',
          displayName: 'Lisa Park',
          avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
        content: 'Looks like around 450-500 calories based on the ingredients!',
        timeAgo: '5 hours ago',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 15,
        isLiked: false,
        parentId: '3',
        isReply: true,
      },
      {
        id: '3-2',
        user: {
          id: 'user6',
          username: 'macro_tracker',
          displayName: 'James Kim',
          avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
        content: 'Perfect for cutting phase! Great macros 💪',
        timeAgo: '4 hours ago',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 3,
        isLiked: true,
        parentId: '3',
        isReply: true,
      }
    ],
    replyCount: 2,
  },
  {
    id: '4',
    user: {
      id: 'user7',
      username: 'vegan_foodie',
      displayName: 'Maya Patel',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
    content: 'Can this be made vegan? What would you recommend as a substitute for the protein?',
    timeAgo: '8 hours ago',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 6,
    isLiked: false,
    replies: [],
    replyCount: 0,
  },
  {
    id: '5',
    user: {
      id: 'user8',
      username: 'meal_prep_queen',
      displayName: 'Rachel Green',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    content: 'Adding this to my meal prep rotation! Do you think it would keep well in the fridge for 3-4 days?',
    timeAgo: '12 hours ago',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 11,
    isLiked: true,
    replies: [
      {
        id: '5-1',
        user: {
          id: 'user9',
          username: 'prep_pro',
          displayName: 'Tom Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
        },
        content: 'Yes! I make similar meals and they last up to 5 days. Store the sauce separately for best results.',
        timeAgo: '10 hours ago',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        likes: 7,
        isLiked: false,
        parentId: '5',
        isReply: true,
      }
    ],
    replyCount: 1,
  }
];

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
  comments?: CommentType[];
  onAddComment?: (content: string) => void;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, comment: CommentType) => void;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, newContent: string) => void;
  onUserPress?: (userId: string) => void;
}

export default function CommentsModal({
  visible,
  onClose,
  postId,
  comments,
  onAddComment,
  onLike,
  onReply,
  onDelete,
  onEdit,
  onUserPress,
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<CommentType[]>([]);
  const [replyTo, setReplyTo] = useState<CommentType | null>(null);

  // Use mock data if no comments provided
  const displayComments = comments || MOCK_COMMENTS;

  const handleAddComment = (content: string) => {
    if (content.trim()) {
      if (replyTo) {
        // Adding a reply
        const newReply: CommentType = {
          id: Date.now().toString(),
          user: {
            id: 'current-user',
            username: 'you',
            displayName: 'You',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          content: content,
          timeAgo: 'now',
          timestamp: new Date(),
          likes: 0,
          isLiked: false,
          replies: [],
          replyCount: 0,
          parentId: replyTo.id,
          isReply: true,
        };
        
        // Update local comments to add reply to parent
        setLocalComments(prev => 
          prev.map(comment => 
            comment.id === replyTo.id 
              ? { 
                  ...comment, 
                  replies: [...(comment.replies || []), newReply],
                  replyCount: (comment.replyCount || 0) + 1
                }
              : comment
          )
        );
        
        // Also update the original comments data
        const updatedComments = allComments.map(comment => 
          comment.id === replyTo.id 
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), newReply],
                replyCount: (comment.replyCount || 0) + 1
              }
            : comment
        );
        
        // Call parent reply handler
        onReply?.(replyTo.id, replyTo);
        
        // Clear reply state
        setReplyTo(null);
      } else {
        // Adding a new comment
        const newCommentData: CommentType = {
          id: Date.now().toString(),
          user: {
            id: 'current-user',
            username: 'you',
            displayName: 'You',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          content: content,
          timeAgo: 'now',
          timestamp: new Date(),
          likes: 0,
          isLiked: false,
          replies: [],
          replyCount: 0,
        };
        
        setLocalComments(prev => [newCommentData, ...prev]);
        onAddComment?.(content);
      }
      
      setNewComment('');
    }
  };

  const handleLike = (commentId: string) => {
    console.log('Like comment:', commentId);
    onLike?.(commentId);
  };

  const handleReply = (commentId: string, comment: CommentType) => {
    setReplyTo(comment);
    console.log('Reply to comment:', commentId, comment.content);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleUserPress = (userId: string) => {
    console.log('User pressed:', userId);
    onUserPress?.(userId);
  };

  const allComments = [...localComments, ...displayComments];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Comments</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {allComments.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No comments yet</Text>
                <Text style={styles.emptySubtext}>Be the first to comment!</Text>
              </View>
            ) : (
              allComments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onLike={handleLike}
                  onReply={handleReply}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onUserPress={handleUserPress}
                />
              ))
            )}
          </ScrollView>

          {/* Comment Input */}
          <CommentInput
            onSubmit={handleAddComment}
            placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
            replyTo={replyTo || undefined}
            onCancel={handleCancelReply}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
  },
  closeButton: {
    padding: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
  },
}); 