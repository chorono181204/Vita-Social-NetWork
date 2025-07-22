import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '@/theme';

export type SearchCategory = 'all' | 'people' | 'recipes' | 'posts' | 'tags';

interface CategoryTabsProps {
  activeCategory: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
  resultCounts?: Partial<Record<SearchCategory, number>>;
}

const categoryLabels: Record<SearchCategory, string> = {
  all: 'All',
  people: 'People',
  recipes: 'Recipes', 
  posts: 'Posts',
  tags: 'Tags',
};

export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
  resultCounts = {}
}: CategoryTabsProps) {
  const categories: SearchCategory[] = ['all', 'people', 'recipes', 'posts', 'tags'];

  const renderTab = (category: SearchCategory) => {
    const isActive = activeCategory === category;
    const count = resultCounts[category];
    
    return (
      <TouchableOpacity
        key={category}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => onCategoryChange(category)}
      >
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {categoryLabels[category]}
          {count !== undefined && count > 0 && ` (${count})`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(renderTab)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginRight: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.green,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabText: {
    color: colors.green,
    fontWeight: '600',
  },
}); 