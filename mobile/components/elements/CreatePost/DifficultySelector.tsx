import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { STRINGS } from '@/constants/strings';
import { Difficulty } from '@/constants/strings';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

export default function DifficultySelector({ 
  selectedDifficulty, 
  onDifficultyChange 
}: DifficultySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{STRINGS.RECIPE.DIFFICULTY}</Text>
      <View style={styles.difficultyContainer}>
        {DIFFICULTIES.map((diff) => (
          <TouchableOpacity
            key={diff}
            style={[
              styles.difficultyItem,
              selectedDifficulty === diff && styles.selectedDifficulty
            ]}
            onPress={() => onDifficultyChange(diff)}
          >
            <Text style={[
              styles.difficultyText,
              selectedDifficulty === diff && styles.selectedDifficultyText
            ]}>
              {STRINGS.DIFFICULTIES[diff]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  difficultyContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  difficultyItem: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedDifficulty: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blackGray,
  },
  selectedDifficultyText: {
    color: colors.white,
  },
}); 