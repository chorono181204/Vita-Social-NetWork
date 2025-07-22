import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { RecipePostData } from '@/types';
import PostHeader from './PostHeader';
import { ActionBar } from '@/components/elements/ActionBar';

interface RecipeCardProps {
  data: RecipePostData;
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onUserPress?: () => void;
  onViewRecipe?: () => void;
  onMorePress?: () => void;
}

export default function RecipeCard({ 
  data, 
  onLike, 
  onComment, 
  onSave,
  onShare, 
  onUserPress,
  onViewRecipe,
  onMorePress
}: RecipeCardProps) {
  const { recipe } = data;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return colors.green;
      case 'Medium': return colors.orange;
      case 'Hard': return colors.red;
      default: return colors.gray;
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}p`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}p` : `${hours}h`;
  };

  return (
    <View style={styles.container}>
      <PostHeader
        user={data.user}
        timeAgo={data.timeAgo}
        onUserPress={onUserPress}
        badge={{
          icon: "restaurant",
          text: "Recipe",
          backgroundColor: colors.lightGreen,
          textColor: colors.green
        }}
        onMorePress={onMorePress}
      />

      {/* Caption nếu có */}
      {data.caption && (
        <Text style={styles.caption}>{data.caption}</Text>
      )}

      {/* Recipe Main Content - Wrap in Pressable to make clickable */}
      <Pressable 
        style={({ pressed }) => [
          styles.recipeContainer,
          pressed && styles.recipeContainerPressed
        ]} 
        onPress={onViewRecipe}
      >
        {/* Recipe Image */}
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        
        {/* Recipe overlay info */}
        <View style={styles.recipeOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{recipe.category}</Text>
          </View>
          <View style={styles.difficultyBadge}>
            <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(recipe.difficulty) }]} />
            <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
          </View>
        </View>

        {/* Recipe Info */}
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          {recipe.description && (
            <Text style={styles.recipeDescription} numberOfLines={2}>
              {recipe.description}
            </Text>
          )}
          
          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.gray} />
              <Text style={styles.statText}>{formatTime(recipe.cookingTime)}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={16} color={colors.gray} />
              <Text style={styles.statText}>{recipe.servings} servings</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="local-fire-department" size={16} color={colors.orange} />
              <Text style={styles.statText}>{recipe.nutrition.calories} kcal</Text>
            </View>
          </View>

          {/* Ingredients Preview */}
          <View style={styles.ingredientsPreview}>
            <Text style={styles.ingredientsTitle}>Main ingredients:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ingredientsList}>
              {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                <View key={ingredient.id} style={styles.ingredientTag}>
                  <Text style={styles.ingredientText}>
                    {ingredient.name}
                  </Text>
                </View>
              ))}
              {recipe.ingredients.length > 4 && (
                <View style={[styles.ingredientTag, styles.moreIngredientsTag]}>
                  <Text style={styles.moreIngredientsText}>
                    +{recipe.ingredients.length - 4}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Nutrition Quick View */}
          <View style={styles.nutritionPreview}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.protein}g</Text>
            </View>
            <View style={styles.nutritionDivider} />
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Carbs</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.carbs}g</Text>
            </View>
            <View style={styles.nutritionDivider} />
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fat</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.fat}g</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <ActionBar
        like={{
          icon: data.isLiked ? "heart" : "heart-outline",
          count: data.stats.likes,
          isActive: data.isLiked,
          activeColor: colors.pink,
          onPress: onLike
        }}
        comment={{
          icon: "chatbubble-outline",
          count: data.stats.comments,
          onPress: onComment
        }}
        save={{
          icon: data.isSaved ? "bookmark" : "bookmark-outline",
          count: data.stats.saves,
          isActive: data.isSaved,
          activeColor: colors.green,
          onPress: onSave
        }}
        share={{
          icon: "arrow-redo-outline",
          onPress: onShare
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
    paddingBottom: spacing.xs,
  },
  caption: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.blackGray,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  recipeContainer: {
    position: 'relative',
  },
  recipeContainerPressed: {
    opacity: 0.9,
  },
  recipeImage: {
    width: '100%',
    height: 280,
  },
  recipeOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  difficultyText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  recipeInfo: {
    padding: spacing.lg,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
    marginBottom: spacing.xs,
  },
  recipeDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  quickStats: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  statText: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: 4,
    fontWeight: '500',
  },
  ingredientsPreview: {
    marginBottom: spacing.md,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: spacing.xs,
  },
  ingredientsList: {
    flexDirection: 'row',
  },
  ingredientTag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginRight: spacing.xs,
  },
  ingredientText: {
    fontSize: 12,
    color: colors.blackGray,
    fontWeight: '500',
  },
  moreIngredientsTag: {
    backgroundColor: colors.lightGreen,
  },
  moreIngredientsText: {
    fontSize: 12,
    color: colors.green,
    fontWeight: '600',
  },
  nutritionPreview: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.md,
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.blackGray,
  },
  nutritionDivider: {
    width: 1,
    backgroundColor: colors.gray,
    opacity: 0.3,
  },
}); 