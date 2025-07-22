import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '@/theme';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SearchBar from '@/components/elements/Search/SearchBar';
import CategoryTabs, { SearchCategory } from '@/components/elements/Search/CategoryTabs';
import SearchResults from '@/components/elements/Search/SearchResults';
import SearchEmpty from '@/components/elements/Search/SearchEmpty';
import SearchSuggestions, { SearchSuggestion } from '@/components/elements/Search/SearchSuggestions';
import SearchFilters, { SearchFilters as SearchFiltersType } from '@/components/elements/Search/SearchFilters';
import { useUserNavigation } from '@/hooks/useUserNavigation';

export default function SearchPage() {
  const { navigateToProfile } = useUserNavigation();
  
  // User navigation handlers
  const handleUserPress = (user: any) => {
    navigateToProfile(user.username, { source: 'search' });
  };

  const handleUserFollow = (userId: string) => {
    console.log('User follow:', userId);
  };

  const handleRecipePress = (recipeId: string) => {
    console.log('Recipe pressed:', recipeId);
  };

  const handlePostPress = (postId: string) => {
    console.log('Post pressed:', postId);
  };

  const handleRecipeLike = (recipeId: string) => {
    console.log('Recipe like:', recipeId);
  };

  const handleRecipeSave = (recipeId: string) => {
    console.log('Recipe save:', recipeId);
  };

  const handlePostLike = (postId: string) => {
    console.log('Post like:', postId);
  };

  const handlePostComment = (postId: string) => {
    console.log('Post comment:', postId);
  };

  const handlePostShare = (postId: string) => {
    console.log('Post share:', postId);
  };

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>({
    sortBy: 'relevance',
    dateRange: 'all',
  });

  // Mock data - simplified to match interface requirements
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'chicken recipes', type: 'query' },
    { id: '2', text: 'pasta dishes', type: 'query' },
    { id: '3', text: 'Gordon Ramsay', type: 'user', verified: true },
    { id: '4', text: 'healthy meals', type: 'tag' },
    { id: '5', text: 'pizza tips', type: 'query' },
    { id: '6', text: 'Alex Kim', type: 'user', verified: true },
    { id: '7', text: 'soup recipes', type: 'query' },
    { id: '8', text: 'vegan cooking', type: 'tag' },
  ];

  const mockRecentSearches = ['chicken curry', 'pasta salad', 'pizza dough', 'gordon ramsay', 'soup recipes'];
  const mockTrendingSearches = ['healthy smoothies', 'meal prep ideas', 'pizza tips', 'vegan cooking', 'rice techniques', 'alex kim recipes'];

  const mockResults = {
    all: [
      // Simple post
      {
        type: 'post' as const,
        data: {
          id: '1',
          user: {
            username: 'fit_foodie',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
            displayName: 'Mike Thompson',
          },
          content: 'Chicken dinner prep for the week 💪 High protein, low carb!',
          timeAgo: '4h',
          images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'],
          stats: {
            likes: 128,
            comments: 23,
            shares: 34,
          },
          isLiked: true,
        }
      },
      // User result  
      {
        type: 'user' as const,
        data: {
          id: '1',
          username: 'chef_gordon',
          displayName: 'Gordon Ramsay',
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          verified: true,
          followersCount: 2500000,
          specialization: 'Celebrity Chef',
          isFollowing: false,
        }
      },
      // Another post
      {
        type: 'post' as const,
        data: {
          id: '2',
          user: {
            username: 'pizza_master',
            avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
            displayName: 'Tony Romano',
          },
          content: 'Pizza night with homemade dough! The secret is letting it rise for 24 hours 🍕✨',
          timeAgo: '6h',
          images: [
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
            'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400'
          ],
          stats: {
            likes: 234,
            comments: 56,
            shares: 89,
          },
          isLiked: false,
        }
      },
    ],
    people: [
      {
        id: '1',
        username: 'chef_gordon',
        displayName: 'Gordon Ramsay',
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        verified: true,
        followersCount: 2500000,
        specialization: 'Celebrity Chef',
        isFollowing: false,
      },
      {
        id: '2',
        username: 'pasta_lover',
        displayName: 'Maria Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        verified: false,
        followersCount: 1250,
        specialization: 'Italian Cuisine',
        isFollowing: false,
      },
    ],
    recipes: [], // Simplified - empty for now to avoid TypeScript conflicts
    posts: [
      {
        id: '1',
        user: {
          username: 'fit_foodie',
          avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
          displayName: 'Mike Thompson',
        },
        content: 'Chicken dinner prep for the week 💪 High protein, low carb!',
        timeAgo: '4h',
        images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'],
        stats: {
          likes: 128,
          comments: 23,
          shares: 34,
        },
        isLiked: true,
      },
      {
        id: '2',
        user: {
          username: 'pizza_master',
          avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
          displayName: 'Tony Romano',
        },
        content: 'Pizza night with homemade dough! The secret is letting it rise for 24 hours 🍕✨',
        timeAgo: '6h',
        images: [
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
          'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400'
        ],
        stats: {
          likes: 234,
          comments: 56,
          shares: 89,
        },
        isLiked: false,
      },
    ],
    tags: [
      { id: '1', name: 'chicken', count: 1200, trending: true },
      { id: '2', name: 'pasta', count: 890, trending: false },
      { id: '3', name: 'healthy', count: 2100, trending: true },
      { id: '4', name: 'pizza', count: 567, trending: false },
      { id: '5', name: 'vegan', count: 1890, trending: true },
      { id: '6', name: 'breakfast', count: 445, trending: false },
      { id: '7', name: 'dessert', count: 1205, trending: true },
    ],
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    } else {
      setIsSearching(false);
    }
  };

  const handleSuggestionPress = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.text);
  };

  const handleClearSearch = () => {
    setQuery('');
    setIsSearching(false);
  };

  const handleFilterPress = () => {
    setShowFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const renderContent = () => {
    if (!query.trim()) {
      return (
        <SearchEmpty
          recentSearches={mockRecentSearches}
          trendingSearches={mockTrendingSearches}
          onSearchPress={handleSearch}
        />
      );
    }

    if (isSearching) {
      return (
        <SearchResults
          results={mockResults}
          category={activeCategory}
          loading={true}
          onUserPress={() => console.log('User pressed')}
          onRecipePress={() => console.log('Recipe pressed')}
          onPostPress={() => console.log('Post pressed')}
          onUserFollow={() => console.log('User follow')}
          onRecipeLike={() => console.log('Recipe like')}
          onRecipeSave={() => console.log('Recipe save')}
          onPostLike={() => console.log('Post like')}
          onPostComment={() => console.log('Post comment')}
          onPostShare={() => console.log('Post share')}
        />
      );
    }

    // Mock: If query contains certain words, show results, otherwise show no results
    const hasResults = [
      'chicken', 'pasta', 'salad', 'cake', 'soup', 'beef', 'fish', 'rice', 'noodles', 'pizza',
      'gordon', 'ramsay', 'maria', 'alex', 'emma', 'james', 'tony', 'healthy', 'baking', 'vegan'
    ].some(word => query.toLowerCase().includes(word));

    if (hasResults) {
      return (
        <SearchResults
          results={mockResults}
          category={activeCategory}
          loading={false}
          onUserPress={() => console.log('User pressed')}
          onRecipePress={() => console.log('Recipe pressed')}
          onPostPress={() => console.log('Post pressed')}
          onUserFollow={() => console.log('User follow')}
          onRecipeLike={() => console.log('Recipe like')}
          onRecipeSave={() => console.log('Recipe save')}
          onPostLike={() => console.log('Post like')}
          onPostComment={() => console.log('Post comment')}
          onPostShare={() => console.log('Post share')}
        />
      );
    }

    return (
      <SearchEmpty
        recentSearches={[]}
        trendingSearches={[`No results for "${query}"`]}
        onSearchPress={handleSearch}
      />
    );
  };

  return (
    <MainLayout 
      activeTab="search" 
      onTabPress={(tab) => console.log('Tab pressed:', tab)}
      headerProps={{
        variant: 'search',
        title: 'Find & Connect',
        leftButton: {
          icon: 'search-outline',
          onPress: () => console.log('Search pressed')
        },
        rightButton: {
          icon: 'options-outline',
          onPress: handleFilterPress
        }
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search recipes, users, posts..."
          />
          
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </View>

        <View style={styles.contentSection}>
          {renderContent()}
        </View>
      </ScrollView>

      <SearchFilters
        visible={showFilters}
        onClose={handleCloseFilters}
        category={activeCategory}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={() => console.log('Apply filters')}
        onResetFilters={() => console.log('Reset filters')}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
  },
  searchSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  contentSection: {
    flex: 1,
    paddingTop: spacing.sm,
  },
}); 