import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';

interface DietaryFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian', color: colors.green },
  { id: 'vegan', label: 'Vegan', color: colors.green },
  { id: 'gluten-free', label: 'Gluten Free', color: colors.blue },
  { id: 'dairy-free', label: 'Dairy Free', color: colors.blue },
  { id: 'keto', label: 'Keto', color: colors.purple },
  { id: 'paleo', label: 'Paleo', color: colors.orange },
  { id: 'low-carb', label: 'Low Carb', color: colors.teal },
  { id: 'high-protein', label: 'High Protein', color: colors.red },
  { id: 'low-sodium', label: 'Low Sodium', color: colors.gray },
  { id: 'sugar-free', label: 'Sugar Free', color: colors.pink },
];

export default function DietaryFilter({ value, onChange }: DietaryFilterProps) {
  const toggleDietary = (dietaryId: string) => {
    if (value.includes(dietaryId)) {
      onChange(value.filter(d => d !== dietaryId));
    } else {
      onChange([...value, dietaryId]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsGrid}>
        {dietaryOptions.map((option) => {
          const isSelected = value.includes(option.id);
          
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.dietaryChip,
                isSelected && { 
                  backgroundColor: option.color, 
                  borderColor: option.color 
                }
              ]}
              onPress={() => toggleDietary(option.id)}
            >
              <Text style={[
                styles.dietaryText,
                isSelected && styles.dietaryTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dietaryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  dietaryText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.blackGray,
  },
  dietaryTextActive: {
    color: colors.white,
  },
}); 