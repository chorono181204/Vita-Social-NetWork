import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { STRINGS } from '@/constants/strings';
import { Unit } from '@/constants/strings';
import UnitDropdown from './UnitDropdown';

interface Ingredient {
  name: string;
  amount: number;
  unit: Unit;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  onIngredientsChange: (ingredients: Ingredient[]) => void;
}



export default function IngredientsList({ 
  ingredients, 
  onIngredientsChange 
}: IngredientsListProps) {
  
  const addIngredient = () => {
    const newIngredients = [...ingredients, { name: '', amount: 0, unit: 'GRAMS' as Unit }];
    onIngredientsChange(newIngredients);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      onIngredientsChange(newIngredients);
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = ingredients.map((ing, i) => 
      i === index ? { ...ing, [field]: value } : ing
    );
    onIngredientsChange(newIngredients);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{STRINGS.RECIPE.INGREDIENTS}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Ionicons name="add" size={16} color={colors.white} />
          <Text style={styles.addButtonText}>{STRINGS.RECIPE.ADD_INGREDIENT}</Text>
        </TouchableOpacity>
      </View>

      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <View style={styles.ingredientHeader}>
            <Text style={styles.ingredientNumber}>{index + 1}</Text>
            {ingredients.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeIngredient(index)}
              >
                <Ionicons name="close-circle" size={20} color={colors.red} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.ingredientInputs}>
            <View style={styles.nameInput}>
              <Text style={styles.inputLabel}>{STRINGS.RECIPE.INGREDIENT_NAME}</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Quinoa"
                value={ingredient.name}
                onChangeText={(value) => updateIngredient(index, 'name', value)}
              />
            </View>

            <View style={styles.amountInput}>
              <Text style={styles.inputLabel}>{STRINGS.RECIPE.AMOUNT}</Text>
              <TextInput
                style={styles.textInput}
                placeholder="200"
                value={ingredient.amount.toString()}
                onChangeText={(value) => updateIngredient(index, 'amount', parseInt(value) || 0)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.unitInput}>
              <Text style={styles.inputLabel}>{STRINGS.RECIPE.UNIT}</Text>
              <UnitDropdown
                selectedUnit={ingredient.unit}
                onUnitChange={(unit) => updateIngredient(index, 'unit', unit)}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  ingredientItem: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ingredientNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.green,
  },
  removeButton: {
    padding: 4,
  },
  ingredientInputs: {
    gap: spacing.sm,
  },
  nameInput: {
    flex: 1,
  },
  amountInput: {
    width: 80,
  },
  unitInput: {
    width: 80,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blackGray,
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: 14,
    color: colors.blackGray,
    backgroundColor: colors.white,
  },
});