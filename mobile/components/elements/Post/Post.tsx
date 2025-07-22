import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import PostHeader from './PostHeader';
import { ActionBar } from '@/components/elements/ActionBar';
import { useUserNavigation } from '@/hooks/useUserNavigation';

export interface PostData {
  id: string;
  user: {
    username: string;
    avatar: string;
    displayName?: string;
  };
  content: string;
  timeAgo: string;
  images?: string[];
  stats: {
    likes: number;
    comments: number;
    shares: number;
    saves?: number;
  };
  isLiked?: boolean;
  isSaved?: boolean;
}

interface PostProps {
  data: PostData;
  currentUserId?: string; // Add current user ID for navigation logic
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onUserPress?: () => void; // Optional override for user press
  onMorePress?: () => void;
}

export default function Post({ 
  data, 
  currentUserId,
  onLike, 
  onComment, 
  onSave,
  onShare, 
  onUserPress,
  onMorePress
}: PostProps) {
  const { navigateToUserById } = useUserNavigation();

  const handleUserPress = () => {
    if (onUserPress) {
      // Use custom handler if provided
      onUserPress();
    } else {
      // Use default navigation logic
      navigateToUserById(data.user.username, currentUserId);
    }
  };
  return (
    <View style={styles.container}>
      <PostHeader
        user={data.user}
        timeAgo={data.timeAgo}
        onUserPress={handleUserPress}
        onMorePress={onMorePress}
      />

      {/* Nội dung bài viết */}
      <Text style={styles.content}>{data.content}</Text>

      {/* Hình ảnh nếu có */}
      {data.images && data.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {data.images.length === 1 ? (
            <Image source={{ uri: data.images[0] }} style={styles.singleImage} />
          ) : (
            <View style={styles.multipleImages}>
              {data.images.slice(0, 2).map((image, index) => (
                <Image 
                  key={index} 
                  source={{ uri: image }} 
                  style={[
                    styles.multiImage,
                    index === 0 && { marginRight: spacing.xs }
                  ]} 
                />
              ))}
            </View>
          )}
        </View>
      )}

      <ActionBar
        like={{
          icon: data.isLiked ? "heart" : "heart-outline",
          count: data.stats.likes,
          isActive: data.isLiked,
          activeColor: colors.pink,
          onPress: onLike
        }}
        comment={{
          icon: "chatbubble-outline",
          count: data.stats.comments,
          onPress: onComment
        }}
        save={onSave ? {
          icon: data.isSaved ? "bookmark" : "bookmark-outline",
          count: data.stats.saves,
          isActive: data.isSaved,
          activeColor: colors.green,
          onPress: onSave
        } : undefined}
        share={{
          icon: "arrow-redo-outline",
          onPress: onShare
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
    paddingBottom: spacing.xs,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.blackGray,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  imagesContainer: {
    marginBottom: spacing.md,
  },
  singleImage: {
    width: '100%',
    height: 250,
  },
  multipleImages: {
    flexDirection: 'row',
    height: 250,
    gap: 2,
  },
  multiImage: {
    flex: 1,
    height: 250,
  },
}); 