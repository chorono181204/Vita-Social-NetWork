import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { Recipe } from '@/types';

interface RecipeHeaderProps {
  recipe: Recipe;
  isSaved?: boolean;
  onBack: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export default function RecipeHeader({ 
  recipe, 
  isSaved = false, 
  onBack, 
  onShare, 
  onSave 
}: RecipeHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return colors.green;
      case 'Medium': return colors.orange;
      case 'Hard': return colors.red;
      default: return colors.gray;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.heroImage} />
      
      {/* Header Overlay */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onShare} style={styles.headerActionButton}>
            <Ionicons name="arrow-redo-outline" size={22} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSave} style={styles.headerActionButton}>
            <Ionicons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={22} 
              color={isSaved ? colors.green : colors.white} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recipe Badges */}
      <View style={styles.badgesContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{recipe.category}</Text>
        </View>
        <View style={styles.difficultyBadge}>
          <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(recipe.difficulty) }]} />
          <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  badgesContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
  },
  categoryText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  difficultyText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
}); 