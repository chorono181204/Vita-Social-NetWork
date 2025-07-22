import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';
import { SearchCategory } from './CategoryTabs';
import { Post, PostData, RecipeCard } from '@/components/elements/Post';
import { RecipePostData } from '@/types';
import { UserResultCard, SearchUser } from './ResultCards';

export interface SearchResults {
  all: Array<{
    type: 'user' | 'recipe' | 'post';
    data: SearchUser | RecipePostData | PostData;
  }>;
  people: SearchUser[];
  recipes: RecipePostData[];
  posts: PostData[];
  tags: Array<{
    id: string;
    name: string;
    count: number;
    trending?: boolean;
  }>;
}

interface SearchResultsProps {
  results: SearchResults;
  category: SearchCategory;
  loading?: boolean;
  onUserPress: (user: SearchUser) => void;
  onRecipePress: (recipe: RecipePostData) => void;
  onPostPress: (post: PostData) => void;
  onUserFollow: (userId: string) => void;
  onRecipeLike: (recipeId: string) => void;
  onRecipeSave: (recipeId: string) => void;
  onPostLike: (postId: string) => void;
  onPostComment: (postId: string) => void;
  onPostShare: (postId: string) => void;
}

export default function SearchResults({
  results,
  category,
  loading = false,
  onUserPress,
  onRecipePress,
  onPostPress,
  onUserFollow,
  onRecipeLike,
  onRecipeSave,
  onPostLike,
  onPostComment,
  onPostShare,
}: SearchResultsProps) {
  const renderMixedResult = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'user':
        return (
          <UserResultCard
            user={item.data}
            onPress={() => onUserPress(item.data)}
            onFollowPress={() => onUserFollow(item.data.id)}
          />
        );
      case 'recipe':
        return (
          <View style={styles.postContainer}>
            <RecipeCard
              data={item.data}
              onLike={() => onRecipeLike(item.data.id)}
              onComment={() => onPostComment(item.data.id)}
              onSave={() => onRecipeSave(item.data.id)}
              onShare={() => onPostShare(item.data.id)}
              onViewRecipe={() => onRecipePress(item.data)}
              onUserPress={() => onUserPress(item.data.user)}
              onMorePress={() => console.log('More options for recipe:', item.data.id)}
            />
          </View>
        );
      case 'post':
        return (
          <View style={styles.postContainer}>
            <Post
              data={item.data}
              onLike={() => onPostLike(item.data.id)}
              onComment={() => onPostComment(item.data.id)}
              onShare={() => onPostShare(item.data.id)}
              onSave={() => onPostLike(item.data.id)} // Reuse like handler for save
              onUserPress={() => onUserPress(item.data.user)}
              onMorePress={() => console.log('More options for post:', item.data.id)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const renderUserResult = ({ item }: { item: SearchUser }) => (
    <UserResultCard
      user={item}
      onPress={() => onUserPress(item)}
      onFollowPress={() => onUserFollow(item.id)}
    />
  );

  const renderRecipeResult = ({ item }: { item: RecipePostData }) => (
    <View style={styles.postContainer}>
      <RecipeCard
        data={item}
        onLike={() => onRecipeLike(item.id)}
        onComment={() => onPostComment(item.id)}
        onSave={() => onRecipeSave(item.id)}
        onShare={() => onPostShare(item.id)}
        onViewRecipe={() => onRecipePress(item)}
        onUserPress={() => onUserPress(item.user)}
        onMorePress={() => console.log('More options for recipe:', item.id)}
      />
    </View>
  );

  const renderPostResult = ({ item }: { item: PostData }) => (
    <View style={styles.postContainer}>
      <Post
        data={item}
        onLike={() => onPostLike(item.id)}
        onComment={() => onPostComment(item.id)}
        onShare={() => onPostShare(item.id)}
        onSave={() => onPostLike(item.id)} // Reuse like handler for save
        onUserPress={() => onUserPress(item.user)}
        onMorePress={() => console.log('More options for post:', item.id)}
      />
    </View>
  );

  const renderTagResult = ({ item }: { item: any }) => (
    <View style={styles.tagItem}>
      <View style={styles.tagInfo}>
        <Text style={styles.tagName}>#{item.name}</Text>
        <Text style={styles.tagCount}>{item.count} posts</Text>
      </View>
      {item.trending && (
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>Trending</Text>
        </View>
      )}
    </View>
  );

  const getResultsData = () => {
    switch (category) {
      case 'all':
        return results.all;
      case 'people':
        return results.people;
      case 'recipes':
        return results.recipes;
      case 'posts':
        return results.posts;
      case 'tags':
        return results.tags;
      default:
        return [];
    }
  };

  const getRenderItem = () => {
    switch (category) {
      case 'all':
        return renderMixedResult;
      case 'people':
        return renderUserResult;
      case 'recipes':
        return renderRecipeResult;
      case 'posts':
        return renderPostResult;
      case 'tags':
        return renderTagResult;
      default:
        return () => null;
    }
  };

  const data = getResultsData();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Searching...</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No results found</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your search terms or filters
        </Text>
      </View>
    );
  }

  const renderItem = getRenderItem();
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={
            category === 'all' 
              ? `${item.type}-${item.data.id}`
              : `${category}-${item.id || index}`
          }>
            {renderItem({ item })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingVertical: spacing.sm,
  },
  postContainer: {
    backgroundColor: colors.lightGray,
    paddingVertical: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  loadingText: {
    fontSize: 16,
    color: colors.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tagInfo: {
    flex: 1,
  },
  tagName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blue,
  },
  tagCount: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  trendingBadge: {
    backgroundColor: colors.orange,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
}); 