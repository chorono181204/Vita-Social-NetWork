import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface DifficultyFilterProps {
  value: Difficulty[];
  onChange: (value: Difficulty[]) => void;
}

const difficultyOptions: { 
  level: Difficulty; 
  color: string; 
  icon: string;
  description: string;
}[] = [
  { 
    level: 'Easy', 
    color: colors.green, 
    icon: 'checkmark-circle',
    description: 'Quick & simple'
  },
  { 
    level: 'Medium', 
    color: colors.orange, 
    icon: 'time',
    description: 'Some skill needed'
  },
  { 
    level: 'Hard', 
    color: colors.red, 
    icon: 'flame',
    description: 'Expert level'
  },
];

export default function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  const toggleDifficulty = (difficulty: Difficulty) => {
    if (value.includes(difficulty)) {
      onChange(value.filter(d => d !== difficulty));
    } else {
      onChange([...value, difficulty]);
    }
  };

  return (
    <View style={styles.container}>
      {difficultyOptions.map((option) => {
        const isSelected = value.includes(option.level);
        
        return (
          <TouchableOpacity
            key={option.level}
            style={[
              styles.difficultyOption,
              isSelected && { backgroundColor: `${option.color}15`, borderColor: option.color }
            ]}
            onPress={() => toggleDifficulty(option.level)}
          >
            <View style={styles.difficultyHeader}>
              <View style={styles.difficultyInfo}>
                <Ionicons 
                  name={option.icon as any} 
                  size={20} 
                  color={isSelected ? option.color : colors.gray} 
                />
                <View style={styles.difficultyText}>
                  <Text style={[
                    styles.difficultyLevel,
                    isSelected && { color: option.color }
                  ]}>
                    {option.level}
                  </Text>
                  <Text style={styles.difficultyDescription}>
                    {option.description}
                  </Text>
                </View>
              </View>
              
              <View style={[
                styles.checkbox,
                isSelected && { backgroundColor: option.color, borderColor: option.color }
              ]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                )}
              </View>
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
  difficultyOption: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  difficultyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  difficultyText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  difficultyLevel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.blackGray,
  },
  difficultyDescription: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 