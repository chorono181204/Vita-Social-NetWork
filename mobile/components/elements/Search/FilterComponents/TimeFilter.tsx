import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@/theme';

interface TimeFilterProps {
  value?: [number, number];
  onChange: (value: [number, number] | undefined) => void;
}

const timeOptions = [
  { label: 'Quick (< 15 min)', value: [0, 15] as [number, number] },
  { label: 'Medium (15-30 min)', value: [15, 30] as [number, number] },
  { label: 'Long (30-60 min)', value: [30, 60] as [number, number] },
  { label: 'Extended (60+ min)', value: [60, 300] as [number, number] },
];

export default function TimeFilter({ value, onChange }: TimeFilterProps) {
  const isSelected = (optionValue: [number, number]) => {
    if (!value) return false;
    return value[0] === optionValue[0] && value[1] === optionValue[1];
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsGrid}>
        {timeOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeOption,
              isSelected(option.value) && styles.timeOptionActive
            ]}
            onPress={() => 
              isSelected(option.value) 
                ? onChange(undefined) 
                : onChange(option.value)
            }
          >
            <Text style={[
              styles.timeOptionText,
              isSelected(option.value) && styles.timeOptionTextActive
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
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
  timeOption: {
    width: '48%',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    marginRight: '2%',
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  timeOptionActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  timeOptionText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.blackGray,
    textAlign: 'center',
  },
  timeOptionTextActive: {
    color: colors.white,
  },
}); 