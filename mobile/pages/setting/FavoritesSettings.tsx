import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

const { width } = Dimensions.get('window');
const itemWidth = (width - spacing.lg * 3 - spacing.md) / 2;

interface FavoriteItem {
  id: string;
  type: 'post' | 'recipe' | 'user';
  title: string;
  image: string;
  author?: string;
  likedDate: string;
}

export default function FavoritesSettings() {
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'recipes' | 'users'>('all');

  // Mock favorites data
  const [favorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      type: 'recipe',
      title: 'Chicken Teriyaki Bowl',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      author: 'Chef Mike',
      likedDate: '2 days ago',
    },
    {
      id: '2',
      type: 'post',
      title: 'Pizza night with homemade dough!',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      author: 'Tony Romano',
      likedDate: '5 days ago',
    },
    {
      id: '3',
      type: 'recipe',
      title: 'Creamy Pasta Carbonara',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
      author: 'Italian Chef',
      likedDate: '1 week ago',
    },
    {
      id: '4',
      type: 'user',
      title: 'Gordon Ramsay',
      image: 'https://randomuser.me/api/portraits/men/8.jpg',
      likedDate: '3 days ago',
    },
    {
      id: '5',
      type: 'post',
      title: 'Healthy meal prep for the week',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      author: 'Healthy Life',
      likedDate: '1 day ago',
    },
    {
      id: '6',
      type: 'recipe',
      title: 'Fresh Garden Salad',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      author: 'Green Kitchen',
      likedDate: '4 days ago',
    },
  ]);

  const getFilteredFavorites = () => {
    if (activeTab === 'all') return favorites;
    return favorites.filter(item => {
      if (activeTab === 'users') return item.type === 'user';
      return item.type === activeTab.slice(0, -1); // Remove 's' from 'posts'/'recipes'
    });
  };

  const getTabCounts = () => {
    const posts = favorites.filter(item => item.type === 'post').length;
    const recipes = favorites.filter(item => item.type === 'recipe').length;
    const users = favorites.filter(item => item.type === 'user').length;
    return { posts, recipes, users, all: favorites.length };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recipe': return 'restaurant-outline';
      case 'post': return 'document-text-outline';
      case 'user': return 'person-outline';
      default: return 'heart-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recipe': return colors.orange;
      case 'post': return colors.blue;
      case 'user': return colors.green;
      default: return colors.gray;
    }
  };

  const tabCounts = getTabCounts();
  const filteredFavorites = getFilteredFavorites();

  const TabButton = ({ 
    tab, 
    label, 
    count 
  }: { 
    tab: 'all' | 'posts' | 'recipes' | 'users'; 
    label: string; 
    count: number; 
  }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );

  const FavoriteCard = ({ item }: { item: FavoriteItem }) => (
    <TouchableOpacity style={styles.favoriteCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.favoriteImage} />
        <View style={styles.typeIndicator}>
          <Ionicons 
            name={getTypeIcon(item.type) as any} 
            size={14} 
            color={getTypeColor(item.type)} 
          />
        </View>
      </View>
      
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteTitle} numberOfLines={2}>{item.title}</Text>
        {item.author && (
          <Text style={styles.favoriteAuthor} numberOfLines={1}>by {item.author}</Text>
        )}
        <Text style={styles.favoriteDate}>{item.likedDate}</Text>
      </View>
      
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart" size={16} color={colors.red} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <MainLayout 
      activeTab="profile"
      headerProps={{
        variant: 'default',
        title: 'Favorites',
        showBackButton: true,
        onBackPress: () => console.log('Back pressed'),
        rightButton: {
          icon: 'ellipsis-horizontal',
          onPress: () => console.log('More options')
        }
      }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Favorites Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Favorites</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{tabCounts.all}</Text>
              <Text style={styles.statLabel}>Total Items</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{tabCounts.recipes}</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{tabCounts.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{tabCounts.users}</Text>
              <Text style={styles.statLabel}>Users</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorites Settings</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="download-outline" size={24} color={colors.green} />}
            title="Export Favorites"
            subtitle="Download your favorites as a file"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Export favorites')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="sync-outline" size={24} color={colors.green} />}
            title="Sync Across Devices"
            subtitle="Keep favorites synced on all devices"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Sync settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="notifications-outline" size={24} color={colors.green} />}
            title="Favorite Notifications"
            subtitle="Get notified about favorite content updates"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Notification settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="share-outline" size={24} color={colors.green} />}
            title="Share Favorites"
            subtitle="Create shareable favorite collections"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Share settings')}
          />
        </View>

        {/* Privacy & Organization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Organization</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="eye-off-outline" size={24} color={colors.green} />}
            title="Private Favorites"
            subtitle="Keep your favorites private"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Privacy settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="albums-outline" size={24} color={colors.green} />}
            title="Create Collections"
            subtitle="Organize favorites into collections"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Collections')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="funnel-outline" size={24} color={colors.green} />}
            title="Smart Filters"
            subtitle="Auto-organize favorites by content type"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Smart filters')}
          />
        </View>

        {/* Content Tabs */}
        <View style={styles.section}>
          <View style={styles.tabsHeader}>
            <Text style={styles.sectionTitle}>Browse Favorites</Text>
          </View>
          
          <View style={styles.tabsContainer}>
            <TabButton tab="all" label="All" count={tabCounts.all} />
            <TabButton tab="recipes" label="Recipes" count={tabCounts.recipes} />
            <TabButton tab="posts" label="Posts" count={tabCounts.posts} />
            <TabButton tab="users" label="Users" count={tabCounts.users} />
          </View>
        </View>

        {/* Favorites Grid */}
        <View style={styles.section}>
          <View style={styles.favoritesHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'all' ? 'All Favorites' : 
               activeTab === 'recipes' ? 'Favorite Recipes' :
               activeTab === 'posts' ? 'Favorite Posts' : 'Favorite Users'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.sortText}>Sort by Date</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.favoritesGrid}>
            {filteredFavorites.map((item) => (
              <FavoriteCard key={item.id} item={item} />
            ))}
          </View>
          
          {filteredFavorites.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={48} color={colors.lightGray} />
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptySubtitle}>
                Start liking posts and recipes to see them here
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.blackGray,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  tabsHeader: {
    paddingBottom: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.green,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabButtonText: {
    color: colors.white,
  },
  favoritesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sortText: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '500',
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  favoriteCard: {
    width: itemWidth,
    backgroundColor: colors.white,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  favoriteImage: {
    width: itemWidth,
    height: itemWidth * 0.75,
    borderRadius: radius.md,
  },
  typeIndicator: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  favoriteInfo: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  favoriteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: 4,
    lineHeight: 18,
  },
  favoriteAuthor: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  favoriteDate: {
    fontSize: 11,
    color: colors.lightGray,
  },
  removeButton: {
    position: 'absolute',
    top: itemWidth * 0.75 + spacing.sm,
    right: 0,
    padding: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 