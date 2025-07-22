import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { colors, spacing } from '@/theme';
import { Recipe, Comment } from '@/types';
import { CommentsModal } from '@/components/elements/Comment';
import {
  RecipeHeader,
  RecipeStats,
  RecipeAuthor,
  RecipeTabs,
  RecipeTags
} from '@/components/elements/Recipe';
import { ActionBar } from '@/components/elements/ActionBar';

// Mock recipe comments
const MOCK_RECIPE_COMMENTS: Comment[] = [
  {
    id: 'r1',
    user: {
      id: 'chef1',
      username: 'master_chef',
      displayName: 'Chef Michael',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      verified: true,
    },
    content: 'This recipe is absolutely fantastic! I\'ve been making it for years and it never disappoints. The key is to let the flavors marinate properly.',
    timeAgo: '3 hours ago',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 45,
    isLiked: true,
    replies: [
      {
        id: 'r1-1',
        user: {
          id: 'home_cook',
          username: 'kitchen_newbie',
          displayName: 'Anna Smith',
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        },
        content: 'How long should I marinate? First time making this!',
        timeAgo: '2 hours ago',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 8,
        isLiked: false,
        parentId: 'r1',
        isReply: true,
      },
      {
        id: 'r1-2',
        user: {
          id: 'chef1',
          username: 'master_chef',
          displayName: 'Chef Michael',
          avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
          verified: true,
        },
        content: '@kitchen_newbie At least 2 hours, but overnight is even better! Good luck! 👨‍🍳',
        timeAgo: '1 hour ago',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 12,
        isLiked: false,
        parentId: 'r1',
        isReply: true,
      }
    ],
    replyCount: 2,
  },
  {
    id: 'r2',
    user: {
      id: 'health_guru',
      username: 'wellness_coach',
      displayName: 'Dr. Jennifer Lee',
      avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
      verified: true,
    },
    content: 'Love the nutritional profile of this recipe! It\'s packed with protein and healthy fats. Perfect for my clients who are trying to eat healthier.',
    timeAgo: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 67,
    isLiked: false,
    replies: [],
    replyCount: 0,
  },
  {
    id: 'r3',
    user: {
      id: 'foodie_travel',
      username: 'world_eater',
      displayName: 'Carlos Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    },
    content: 'This reminds me of a dish I had in Barcelona last year! The flavors are so authentic. Going to try making this for my family this weekend.',
    timeAgo: '1 day ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 23,
    isLiked: true,
    replies: [
      {
        id: 'r3-1',
        user: {
          id: 'spain_lover',
          username: 'paella_pro',
          displayName: 'Isabel Martinez',
          avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
        },
        content: '¡Qué bueno! Spanish cuisine is the best 🇪🇸',
        timeAgo: '20 hours ago',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        likes: 5,
        isLiked: true,
        parentId: 'r3',
        isReply: true,
      }
    ],
    replyCount: 1,
  },
  {
    id: 'r4',
    user: {
      id: 'budget_meals',
      username: 'frugal_foodie',
      displayName: 'Sarah Budget',
      avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    },
    content: 'This is perfect for meal prep! I made a big batch and it lasted me the whole week. And it\'s budget-friendly too! 💰',
    timeAgo: '2 days ago',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    likes: 34,
    isLiked: false,
    replies: [],
    replyCount: 0,
  }
];

interface RecipeDetailProps {
  recipe: Recipe;
  isLiked?: boolean;
  isSaved?: boolean;
  stats: {
    likes: number;
    comments: number;
    saves: number;
    shares: number;
  };
  onBack: () => void;
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onComment?: () => void;
}

export default function RecipeDetail({
  recipe,
  isLiked = false,
  isSaved = false,
  stats,
  onBack,
  onLike,
  onSave,
  onShare,
  onComment
}: RecipeDetailProps) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState(MOCK_RECIPE_COMMENTS);

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        username: 'you',
        displayName: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content,
      timeAgo: 'now',
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
      replyCount: 0,
    };
    setComments(prev => [newComment, ...prev]);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      )
    );
  };

  const handleCommentReply = (commentId: string, parentComment: Comment) => {
    // Add reply to the comment
    const newReply: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        username: 'you',
        displayName: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content: `@${parentComment.user.username} Thanks for the tip! I'll definitely try that.`,
      timeAgo: 'now',
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
      replyCount: 0,
      parentId: commentId,
      isReply: true,
    };
    
    // Update the comments to add reply to parent
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              replies: [...(comment.replies || []), newReply],
              replyCount: (comment.replyCount || 0) + 1
            }
          : comment
      )
    );
    
    console.log('Reply added to comment:', commentId, parentComment.content);
  };

  const handleUserPress = (userId: string) => {
    console.log('Navigate to user profile:', userId);
    // In a real app, this would navigate to user profile
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <RecipeHeader
          recipe={recipe}
          isSaved={isSaved}
          onBack={onBack}
          onShare={onShare}
          onSave={onSave}
        />

        {/* Recipe Info */}
        <View style={styles.contentContainer}>
          {/* Title & Description */}
          <View style={styles.titleSection}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            {recipe.description && (
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
            )}
          </View>

          {/* Quick Stats */}
          <RecipeStats recipe={recipe} />

          {/* Author Info */}
          <RecipeAuthor recipe={recipe} />

          {/* Tabs */}
          <RecipeTabs recipe={recipe} />

          {/* Tags */}
          <RecipeTags tags={recipe.tags} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <ActionBar
        variant="detail"
        like={{
          icon: isLiked ? "heart" : "heart-outline",
          count: stats.likes,
          isActive: isLiked,
          activeColor: colors.pink,
          onPress: onLike
        }}
        comment={{
          icon: "chatbubble-outline",
          count: stats.comments,
          onPress: () => setCommentsVisible(true)
        }}
        share={{
          icon: "arrow-redo-outline",
          count: stats.shares,
          onPress: onShare
        }}
      />

      {/* Comments Modal */}
      <CommentsModal
        visible={commentsVisible}
        onClose={() => setCommentsVisible(false)}
        postId={recipe.id}
        comments={comments}
        onAddComment={handleAddComment}
        onLike={handleCommentLike}
        onReply={handleCommentReply}
        onUserPress={handleUserPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  titleSection: {
    paddingVertical: spacing.lg,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.blackGray,
    marginBottom: spacing.sm,
  },
  recipeDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray,
  },
}); 