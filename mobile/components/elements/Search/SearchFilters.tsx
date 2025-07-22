import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { SearchCategory } from './CategoryTabs';
import {
  NutritionSliders,
  TimeFilter,
  DifficultyFilter,
  DietaryFilter,
  SortOptions
} from './FilterComponents';

export interface SearchFilters {
  // Universal filters
  sortBy: 'relevance' | 'recent' | 'popular' | 'rating';
  dateRange?: 'today' | 'week' | 'month' | 'all';
  
  // Recipe specific
  cookingTime?: [number, number];
  difficulty?: ('Easy' | 'Medium' | 'Hard')[];
  calories?: [number, number];
  protein?: [number, number];
  carbs?: [number, number];
  fat?: [number, number];
  dietary?: string[];
  rating?: number;
  
  // People specific
  verified?: boolean;
  followersRange?: [number, number];
  specializations?: string[];
  
  // Posts specific
  postType?: ('tip' | 'question' | 'general')[];
  engagement?: 'high' | 'medium' | 'low';
}

interface SearchFiltersProps {
  visible: boolean;
  onClose: () => void;
  category: SearchCategory;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export default function SearchFilters({
  visible,
  onClose,
  category,
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters
}: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: SearchFilters = {
      sortBy: 'relevance',
      dateRange: 'all',
    };
    setLocalFilters(defaultFilters);
    onResetFilters();
  };

  const renderRecipeFilters = () => (
    <>
      <Text style={styles.sectionTitle}>Nutrition</Text>
      <NutritionSliders
        calories={localFilters.calories}
        protein={localFilters.protein}
        carbs={localFilters.carbs}
        fat={localFilters.fat}
        onCaloriesChange={(value) => updateFilter('calories', value)}
        onProteinChange={(value) => updateFilter('protein', value)}
        onCarbsChange={(value) => updateFilter('carbs', value)}
        onFatChange={(value) => updateFilter('fat', value)}
      />
      
      <Text style={styles.sectionTitle}>Cooking Details</Text>
      <TimeFilter
        value={localFilters.cookingTime}
        onChange={(value) => updateFilter('cookingTime', value)}
      />
      
      <DifficultyFilter
        value={localFilters.difficulty || []}
        onChange={(value) => updateFilter('difficulty', value)}
      />
      
      <Text style={styles.sectionTitle}>Dietary Preferences</Text>
      <DietaryFilter
        value={localFilters.dietary || []}
        onChange={(value) => updateFilter('dietary', value)}
      />
    </>
  );

  const renderPeopleFilters = () => (
    <>
      <Text style={styles.sectionTitle}>User Type</Text>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Verified users only</Text>
        <TouchableOpacity
          style={[styles.toggle, localFilters.verified && styles.toggleActive]}
          onPress={() => updateFilter('verified', !localFilters.verified)}
        >
          {localFilters.verified && (
            <Ionicons name="checkmark" size={16} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  const renderPostsFilters = () => (
    <>
      <Text style={styles.sectionTitle}>Post Type</Text>
      <View style={styles.chipContainer}>
        {['tip', 'question', 'general'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.chip,
              localFilters.postType?.includes(type as any) && styles.chipActive
            ]}
            onPress={() => {
              const currentTypes = localFilters.postType || [];
              const newTypes = currentTypes.includes(type as any)
                ? currentTypes.filter(t => t !== type)
                : [...currentTypes, type as any];
              updateFilter('postType', newTypes);
            }}
          >
            <Text style={[
              styles.chipText,
              localFilters.postType?.includes(type as any) && styles.chipTextActive
            ]}>
              {type === 'tip' ? 'Tips' : type === 'question' ? 'Questions' : 'General'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderCategoryFilters = () => {
    switch (category) {
      case 'recipes':
        return renderRecipeFilters();
      case 'people':
        return renderPeopleFilters();
      case 'posts':
        return renderPostsFilters();
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Sort Options */}
          <Text style={styles.sectionTitle}>Sort By</Text>
          <SortOptions
            value={localFilters.sortBy}
            onChange={(value) => updateFilter('sortBy', value)}
          />
          
          {/* Category Specific Filters */}
          {renderCategoryFilters()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  cancelText: {
    fontSize: 16,
    color: colors.blue,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
  },
  resetText: {
    fontSize: 16,
    color: colors.red,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  toggleLabel: {
    fontSize: 15,
    color: colors.blackGray,
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.gray,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  chipText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.white,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  applyButton: {
    backgroundColor: colors.green,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
}); 