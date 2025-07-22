import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

// Note: In a real app, you would use a library like @react-native-community/slider
// For now, we'll create a mock slider component

interface SliderProps {
  label: string;
  value?: [number, number];
  min: number;
  max: number;
  unit: string;
  onChange: (value: [number, number]) => void;
}

const MockSlider = ({ label, value, min, max, unit, onChange }: SliderProps) => {
  const currentValue = value || [min, max];
  
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
        <Text style={styles.sliderValue}>
          {currentValue[0]}{unit} - {currentValue[1]}{unit}
        </Text>
      </View>
      <View style={styles.sliderTrack}>
        <View style={styles.sliderRange} />
      </View>
    </View>
  );
};

interface NutritionSlidersProps {
  calories?: [number, number];
  protein?: [number, number];
  carbs?: [number, number];
  fat?: [number, number];
  onCaloriesChange: (value: [number, number]) => void;
  onProteinChange: (value: [number, number]) => void;
  onCarbsChange: (value: [number, number]) => void;
  onFatChange: (value: [number, number]) => void;
}

export default function NutritionSliders({
  calories,
  protein,
  carbs,
  fat,
  onCaloriesChange,
  onProteinChange,
  onCarbsChange,
  onFatChange
}: NutritionSlidersProps) {
  return (
    <View style={styles.container}>
      <MockSlider
        label="Calories"
        value={calories}
        min={0}
        max={1000}
        unit=" cal"
        onChange={onCaloriesChange}
      />
      
      <MockSlider
        label="Protein"
        value={protein}
        min={0}
        max={100}
        unit="g"
        onChange={onProteinChange}
      />
      
      <MockSlider
        label="Carbs"
        value={carbs}
        min={0}
        max={150}
        unit="g"
        onChange={onCarbsChange}
      />
      
      <MockSlider
        label="Fat"
        value={fat}
        min={0}
        max={80}
        unit="g"
        onChange={onFatChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sliderContainer: {
    marginBottom: spacing.md,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blackGray,
  },
  sliderValue: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '600',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    position: 'relative',
  },
  sliderRange: {
    height: 4,
    backgroundColor: colors.green,
    borderRadius: 2,
    width: '70%', // Mock selected range
    marginLeft: '15%', // Mock start position
  },
}); 