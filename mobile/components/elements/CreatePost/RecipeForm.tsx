import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { CreateRecipeData } from '@/types';
import { STRINGS, RecipeCategory, Difficulty, Unit } from '@/constants/strings';
import CategorySelector from './CategorySelector';
import DifficultySelector from './DifficultySelector';
import IngredientsList from './IngredientsList';
import InstructionsList from './InstructionsList';
import ImageUploader from './ImageUploader';

interface RecipeFormProps {
  onSubmit: (data: CreateRecipeData) => void;
  isLoading?: boolean;
}

export default function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<RecipeCategory>('MAIN_COURSE');
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState([
    { name: '', amount: 0, unit: 'GRAMS' as Unit }
  ]);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!title.trim()) {
      Alert.alert(STRINGS.RECIPE.ERROR, STRINGS.RECIPE.TITLE_REQUIRED);
      return;
    }
    if (!image) {
      Alert.alert(STRINGS.RECIPE.ERROR, STRINGS.RECIPE.IMAGE_REQUIRED);
      return;
    }
    if (ingredients.some(ing => !ing.name.trim() || ing.amount <= 0)) {
      Alert.alert(STRINGS.RECIPE.ERROR, STRINGS.RECIPE.INGREDIENTS_REQUIRED);
      return;
    }
    if (instructions.some(inst => !inst.trim())) {
      Alert.alert(STRINGS.RECIPE.ERROR, STRINGS.RECIPE.INSTRUCTIONS_REQUIRED);
      return;
    }

    onSubmit({
      caption: caption.trim() || undefined,
      recipe: {
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        difficulty,
        cookingTime: parseInt(cookingTime) || 0,
        servings: parseInt(servings) || 1,
        image,
        ingredients: ingredients.filter(ing => ing.name.trim() && ing.amount > 0),
        instructions: instructions.filter(inst => inst.trim()),
        tags: tags.split(',').map(t => t.trim()).filter(t => t)
      }
    });
  };

  const isValid = title.trim() && image && 
    ingredients.some(ing => ing.name.trim() && ing.amount > 0) &&
    instructions.some(inst => inst.trim());

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Caption */}
      <View style={styles.section}>
        <Text style={styles.label}>{STRINGS.RECIPE.CAPTION_OPTIONAL}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={STRINGS.RECIPE.CAPTION_PLACEHOLDER}
          value={caption}
          onChangeText={setCaption}
          multiline
          numberOfLines={2}
        />
      </View>

      {/* Basic Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{STRINGS.RECIPE.BASIC_INFO}</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {STRINGS.RECIPE.DISH_NAME} <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={STRINGS.RECIPE.DISH_NAME_PLACEHOLDER}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{STRINGS.RECIPE.DESCRIPTION}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={STRINGS.RECIPE.DESCRIPTION_PLACEHOLDER}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{STRINGS.RECIPE.COOKING_TIME}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="30"
              value={cookingTime}
              onChangeText={setCookingTime}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>{STRINGS.RECIPE.SERVINGS}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="2"
              value={servings}
              onChangeText={setServings}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Category & Difficulty */}
      <View style={styles.section}>
        <CategorySelector
          selectedCategory={category}
          onCategoryChange={setCategory}
        />
        
        <DifficultySelector
          selectedDifficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      </View>

      {/* Image */}
      <View style={styles.section}>
        <ImageUploader
          image={image}
          onImageChange={setImage}
          required
        />
      </View>

      {/* Ingredients */}
      <View style={styles.section}>
        <IngredientsList
          ingredients={ingredients}
          onIngredientsChange={setIngredients}
        />
      </View>

      {/* Instructions */}
      <View style={styles.section}>
        <InstructionsList
          instructions={instructions}
          onInstructionsChange={setInstructions}
        />
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.label}>{STRINGS.RECIPE.TAGS}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={STRINGS.RECIPE.TAGS_PLACEHOLDER}
          value={tags}
          onChangeText={setTags}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          (!isValid || isLoading) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <Text style={styles.submitButtonText}>{STRINGS.RECIPE.POSTING}</Text>
        ) : (
          <>
            <Ionicons name="restaurant" size={16} color={colors.white} />
            <Text style={styles.submitButtonText}>{STRINGS.RECIPE.POST_RECIPE}</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: spacing.sm,
  },
  required: {
    color: colors.red,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.blackGray,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 