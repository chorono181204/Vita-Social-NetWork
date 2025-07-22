import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { Recipe } from '@/types';

interface RecipeStatsProps {
  recipe: Recipe;
}

export default function RecipeStats({ recipe }: RecipeStatsProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Ionicons name="time-outline" size={20} color={colors.blue} />
        <Text style={styles.statValue}>{formatTime(recipe.cookingTime)}</Text>
        <Text style={styles.statLabel}>Cook time</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="people-outline" size={20} color={colors.teal} />
        <Text style={styles.statValue}>{recipe.servings}</Text>
        <Text style={styles.statLabel}>Servings</Text>
      </View>
      <View style={styles.statCard}>
        <MaterialIcons name="local-fire-department" size={20} color={colors.orange} />
        <Text style={styles.statValue}>{recipe.nutrition.calories}</Text>
        <Text style={styles.statLabel}>Calories</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
}); 