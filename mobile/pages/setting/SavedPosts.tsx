import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Alert,
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, sizing, radius } from '@/theme';
import Header from '@/components/elements/Header';
import Button from '@/components/elements/Button';
import MainLayout from '@/components/layouts/Main/MainLayout';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface SavedItem {
  id: string;
  type: 'post' | 'recipe' | 'collection';
  title: string;
  image: string;
  author?: string;
  savedDate: string;
  collectionName?: string;
  itemCount?: number;
}

const MOCK_SAVED_ITEMS: SavedItem[] = [
  {
    id: '1',
    type: 'collection',
    title: 'Healthy Recipes',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    savedDate: '2024-01-15',
    itemCount: 24
  },
  {
    id: '2',
    type: 'collection',
    title: 'Workout Tips',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    savedDate: '2024-01-10',
    itemCount: 12
  },
  {
    id: '3',
    type: 'recipe',
    title: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    author: 'Chef Maria',
    savedDate: '2024-01-20',
    collectionName: 'Healthy Recipes'
  },
  {
    id: '4',
    type: 'post',
    title: 'Morning Yoga Routine',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
    author: 'YogaLife',
    savedDate: '2024-01-18',
    collectionName: 'Workout Tips'
  },
  {
    id: '5',
    type: 'recipe',
    title: 'Avocado Toast Variations',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
    author: 'FoodBlogger',
    savedDate: '2024-01-16'
  },
  {
    id: '6',
    type: 'post',
    title: 'Mental Health Tips',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    author: 'WellnessDoc',
    savedDate: '2024-01-14'
  }
];

export default function SavedPosts() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const tabs = [
    { id: 'all', label: 'All', icon: 'bookmark-outline' },
    { id: 'posts', label: 'Posts', icon: 'document-text-outline' },
    { id: 'recipes', label: 'Recipes', icon: 'restaurant-outline' },
    { id: 'collections', label: 'Collections', icon: 'albums-outline' }
  ];

  const filteredItems = MOCK_SAVED_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author?.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'posts':
        return item.type === 'post' && matchesSearch;
      case 'recipes':
        return item.type === 'recipe' && matchesSearch;
      case 'collections':
        return item.type === 'collection' && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const handleCreateCollection = () => {
    Alert.alert(
      'Create Collection',
      'Enter collection name:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create', onPress: () => console.log('Collection created') }
      ]
    );
  };

  const handleItemPress = (item: SavedItem) => {
    if (item.type === 'collection') {
      // Navigate to collection details
      console.log('Open collection:', item.title);
    } else {
      // Navigate to post/recipe details
      console.log('Open item:', item.title);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remove from Saved',
      'Are you sure you want to remove this item from your saved posts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => console.log('Item removed:', itemId)
        }
      ]
    );
  };

  const renderSavedItem = (item: SavedItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.savedItem}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        {/* Type indicator */}
        <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]}>
          <Ionicons 
            name={getTypeIcon(item.type)} 
            size={12} 
            color={colors.white} 
          />
        </View>

        {/* Collection count */}
        {item.type === 'collection' && item.itemCount && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{item.itemCount}</Text>
          </View>
        )}

        {/* More options */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Ionicons name="ellipsis-vertical" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.author && (
          <Text style={styles.itemAuthor} numberOfLines={1}>
            by {item.author}
          </Text>
        )}
        {item.collectionName && (
          <Text style={styles.collectionName} numberOfLines={1}>
            in {item.collectionName}
          </Text>
        )}
        <Text style={styles.savedDate}>
          Saved {formatDate(item.savedDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <MainLayout
      headerProps={{
        variant: 'default',
        title: 'Saved Posts',
        showBackButton: true,
        onBackPress: () => router.back(),
      }}
      activeTab="profile"
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        {showSearch && (
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={colors.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search saved items..."
                placeholderTextColor={colors.gray}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={colors.gray} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Ionicons
                  name={tab.icon as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={activeTab === tab.id ? colors.green : colors.gray}
                />
                <Text style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.activeTabLabel
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={handleCreateCollection}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="add" size={24} color={colors.green} />
            </View>
            <Text style={styles.quickActionText}>Create Collection</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="share-outline" size={24} color={colors.green} />
            </View>
            <Text style={styles.quickActionText}>Share Collection</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.savedItemsContainer}>
          {filteredItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="bookmark-outline" size={64} color={colors.lightGray} />
              <Text style={styles.emptyTitle}>No saved items found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery ? 'Try a different search term' : 'Start saving posts and recipes you love'}
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredItems.map(renderSavedItem)}
            </View>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
}

// Helper functions
const getTypeColor = (type: string) => {
  switch (type) {
    case 'recipe':
      return colors.orange;
    case 'collection':
      return colors.blue;
    default:
      return colors.green;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'recipe':
      return 'restaurant' as keyof typeof Ionicons.glyphMap;
    case 'collection':
      return 'albums' as keyof typeof Ionicons.glyphMap;
    default:
      return 'document-text' as keyof typeof Ionicons.glyphMap;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.blackGray,
  },
  tabsContainer: {
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    gap: 6,
  },
  activeTab: {
    backgroundColor: colors.lightGreen,
  },
  tabLabel: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: colors.green,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: colors.blackGray,
    fontWeight: '500',
  },
  savedItemsContainer: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  savedItem: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.lightGray,
  },
  typeIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.blackGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  countText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  moreButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  collectionName: {
    fontSize: 12,
    color: colors.green,
    marginBottom: 2,
  },
  savedDate: {
    fontSize: 11,
    color: colors.lightGray,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
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
    paddingHorizontal: 32,
  },
}); 