import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { Post, PostData } from '@/components/elements/Post';

interface ProfileFeedProps {
  posts: PostData[];
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onSave?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onUserPress?: (userId: string) => void;
  onMorePress?: (postId: string) => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export default function ProfileFeed({
  posts,
  onLoadMore,
  isLoading = false,
  hasMore = true,
  onLike,
  onComment,
  onSave,
  onShare,
  onUserPress,
  onMorePress,
  ListHeaderComponent
}: ProfileFeedProps) {

  const renderPost = ({ item }: { item: PostData }) => {
    return (
      <Post
        data={item}
        onLike={() => onLike?.(item.id)}
        onComment={() => onComment?.(item.id)}
        onSave={() => onSave?.(item.id)}
        onShare={() => onShare?.(item.id)}
        onUserPress={() => onUserPress?.(item.user.username)}
        onMorePress={() => onMorePress?.(item.id)}
      />
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color={colors.lightGray} />
      <Text style={styles.emptyTitle}>No posts yet</Text>
      <Text style={styles.emptySubtitle}>Posts will appear here</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading && !hasMore) return null;
    
    return (
      <View style={styles.footerContainer}>
        {isLoading && (
          <Text style={styles.loadingText}>Loading more posts...</Text>
        )}
        {!hasMore && posts.length > 0 && (
          <Text style={styles.endText}>No more posts</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    paddingTop: 8,
  },
  separator: {
    height: 8,
    backgroundColor: colors.lightGray,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray,
  },
  endText: {
    fontSize: 14,
    color: colors.lightGray,
  },
}); 