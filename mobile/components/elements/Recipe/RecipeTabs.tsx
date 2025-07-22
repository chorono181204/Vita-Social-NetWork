import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '@/theme';
import { Recipe } from '@/types';

interface RecipeTabsProps {
  recipe: Recipe;
}

export default function RecipeTabs({ recipe }: RecipeTabsProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Ingredients ({recipe.ingredients.length})</Text>
            {recipe.ingredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientRow}>
                <View style={styles.ingredientDot} />
                <View style={styles.ingredientInfo}>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <Text style={styles.ingredientAmount}>
                    {ingredient.amount} {ingredient.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'instructions':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        );

      case 'nutrition':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionCard}>
              <View style={styles.caloriesSection}>
                <Text style={styles.caloriesLabel}>Calories</Text>
                <Text style={styles.caloriesValue}>{recipe.nutrition.calories}</Text>
                <Text style={styles.caloriesUnit}>kcal</Text>
              </View>
              
              <View style={styles.macrosGrid}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{recipe.nutrition.protein}g</Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{recipe.nutrition.carbs}g</Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{recipe.nutrition.fat}g</Text>
                  <Text style={styles.macroLabel}>Fat</Text>
                </View>
                {recipe.nutrition.fiber && (
                  <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{recipe.nutrition.fiber}g</Text>
                    <Text style={styles.macroLabel}>Fiber</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'instructions' && styles.activeTab]}
          onPress={() => setActiveTab('instructions')}
        >
          <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>
            Instructions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
          onPress={() => setActiveTab('nutrition')}
        >
          <Text style={[styles.tabText, activeTab === 'nutrition' && styles.activeTabText]}>
            Nutrition
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.green,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabText: {
    color: colors.green,
    fontWeight: '600',
  },
  tabContent: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
    marginBottom: spacing.lg,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
    marginRight: spacing.md,
  },
  ingredientInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientName: {
    fontSize: 15,
    color: colors.blackGray,
    flex: 1,
  },
  ingredientAmount: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.blackGray,
  },
  nutritionCard: {
    backgroundColor: colors.lightGray,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  caloriesSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  caloriesLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  caloriesValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.blackGray,
  },
  caloriesUnit: {
    fontSize: 14,
    color: colors.gray,
  },
  macrosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  macroItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
}); 