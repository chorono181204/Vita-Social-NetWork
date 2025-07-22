import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

interface SearchEmptyProps {
  recentSearches: string[];
  trendingSearches: string[];
  onSearchPress: (query: string) => void;
  onClearHistory?: () => void;
}

export default function SearchEmpty({
  recentSearches,
  trendingSearches,
  onSearchPress,
  onClearHistory
}: SearchEmptyProps) {
  const renderSearchItem = (query: string, index: number, isRecent: boolean = false) => (
    <TouchableOpacity
      key={`${isRecent ? 'recent' : 'trending'}-${index}`}
      style={styles.searchItem}
      onPress={() => onSearchPress(query)}
    >
      <Ionicons 
        name={isRecent ? "time-outline" : "trending-up"} 
        size={18} 
        color={colors.gray} 
        style={styles.searchIcon}
      />
      <Text style={styles.searchText}>{query}</Text>
      {!isRecent && (
        <Ionicons name="chevron-forward" size={16} color={colors.gray} />
      )}
    </TouchableOpacity>
  );

  const trendingTags = [
    { tag: 'healthy meals', color: colors.green },
    { tag: 'quick recipes', color: colors.blue },
    { tag: 'meal prep', color: colors.orange },
    { tag: 'protein rich', color: colors.purple },
    { tag: 'low carb', color: colors.teal },
    { tag: 'vegetarian', color: colors.green },
  ];

  return (
    <View style={styles.container}>
      {/* Trending Topics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="flame" size={20} color={colors.orange} />
          <Text style={styles.sectionTitle}>Trending Now</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          {trendingTags.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.trendingTag, { borderColor: item.color }]}
              onPress={() => onSearchPress(item.tag)}
            >
              <Text style={[styles.trendingTagText, { color: item.color }]}>
                #{item.tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={20} color={colors.gray} />
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {onClearHistory && (
              <TouchableOpacity onPress={onClearHistory}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {recentSearches.slice(0, 5).map((query, index) => 
            renderSearchItem(query, index, true)
          )}
        </View>
      )}

      {/* Popular Searches */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="trending-up" size={20} color={colors.blue} />
          <Text style={styles.sectionTitle}>Popular This Week</Text>
        </View>
        
        {trendingSearches.map((query, index) => 
          renderSearchItem(query, index, false)
        )}
      </View>

      {/* Quick Discovery */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="compass-outline" size={20} color={colors.green} />
          <Text style={styles.sectionTitle}>Discover</Text>
        </View>
        
        <View style={styles.discoveryGrid}>
          <TouchableOpacity 
            style={styles.discoveryCard}
            onPress={() => onSearchPress('healthy breakfast')}
          >
            <Ionicons name="sunny-outline" size={24} color={colors.orange} />
            <Text style={styles.discoveryTitle}>Healthy Breakfast</Text>
            <Text style={styles.discoverySubtitle}>Start your day right</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.discoveryCard}
            onPress={() => onSearchPress('quick dinner')}
          >
            <Ionicons name="flash-outline" size={24} color={colors.blue} />
            <Text style={styles.discoveryTitle}>Quick Dinner</Text>
            <Text style={styles.discoverySubtitle}>Ready in 30 mins</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.discoveryCard}
            onPress={() => onSearchPress('meal prep')}
          >
            <Ionicons name="calendar-outline" size={24} color={colors.green} />
            <Text style={styles.discoveryTitle}>Meal Prep</Text>
            <Text style={styles.discoverySubtitle}>Plan ahead</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.discoveryCard}
            onPress={() => onSearchPress('healthy snacks')}
          >
            <Ionicons name="nutrition-outline" size={24} color={colors.purple} />
            <Text style={styles.discoveryTitle}>Healthy Snacks</Text>
            <Text style={styles.discoverySubtitle}>Guilt-free munching</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginLeft: spacing.sm,
    flex: 1,
  },
  clearText: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: '500',
  },
  tagsContainer: {
    paddingHorizontal: spacing.lg,
  },
  trendingTag: {
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },
  trendingTagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchText: {
    flex: 1,
    fontSize: 15,
    color: colors.blackGray,
  },
  discoveryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
  },
  discoveryCard: {
    width: '48%',
    backgroundColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.md,
    marginRight: '2%',
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  discoveryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blackGray,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  discoverySubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
    textAlign: 'center',
  },
}); 