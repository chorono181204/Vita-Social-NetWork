import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

type SortOption = 'relevance' | 'recent' | 'popular' | 'rating';

interface SortOptionsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: {
  value: SortOption;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: 'relevance',
    label: 'Relevance',
    description: 'Best match for your search',
    icon: 'search'
  },
  {
    value: 'recent',
    label: 'Most Recent',
    description: 'Newest content first',
    icon: 'time'
  },
  {
    value: 'popular',
    label: 'Most Popular',
    description: 'Highest engagement',
    icon: 'trending-up'
  },
  {
    value: 'rating',
    label: 'Highest Rated',
    description: 'Best reviews and ratings',
    icon: 'star'
  },
];

export default function SortOptions({ value, onChange }: SortOptionsProps) {
  return (
    <View style={styles.container}>
      {sortOptions.map((option) => {
        const isSelected = value === option.value;
        
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.sortOption,
              isSelected && styles.sortOptionActive
            ]}
            onPress={() => onChange(option.value)}
          >
            <View style={styles.sortContent}>
              <Ionicons 
                name={option.icon as any} 
                size={20} 
                color={isSelected ? colors.green : colors.gray} 
              />
              <View style={styles.sortText}>
                <Text style={[
                  styles.sortLabel,
                  isSelected && styles.sortLabelActive
                ]}>
                  {option.label}
                </Text>
                <Text style={styles.sortDescription}>
                  {option.description}
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.radioButton,
              isSelected && styles.radioButtonActive
            ]}>
              {isSelected && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  sortOptionActive: {
    borderColor: colors.green,
    backgroundColor: `${colors.green}08`,
  },
  sortContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sortText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  sortLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.blackGray,
  },
  sortLabelActive: {
    color: colors.green,
  },
  sortDescription: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: colors.green,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.green,
  },
}); 