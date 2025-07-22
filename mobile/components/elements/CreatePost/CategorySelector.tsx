import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { STRINGS } from '@/constants/strings';
import { RecipeCategory } from '@/constants/strings';

interface CategorySelectorProps {
  selectedCategory: RecipeCategory;
  onCategoryChange: (category: RecipeCategory) => void;
}

const CATEGORIES: RecipeCategory[] = [
  'BREAKFAST', 'LUNCH', 'DINNER', 'MAIN_COURSE', 
  'DESSERT', 'BEVERAGES', 'SNACKS', 'SALADS', 'SOUPS'
];

export default function CategorySelector({ 
  selectedCategory, 
  onCategoryChange 
}: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{STRINGS.RECIPE.CATEGORY}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryItem,
              selectedCategory === cat && styles.selectedCategory
            ]}
            onPress={() => onCategoryChange(cat)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === cat && styles.selectedCategoryText
            ]}>
              {STRINGS.CATEGORIES[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: spacing.sm,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryScrollContent: {
    paddingRight: spacing.lg,
  },
  categoryItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.lightGray,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedCategory: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blackGray,
  },
  selectedCategoryText: {
    color: colors.white,
  },
}); 