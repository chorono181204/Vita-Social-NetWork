import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { STRINGS } from '@/constants/strings';

interface InstructionsListProps {
  instructions: string[];
  onInstructionsChange: (instructions: string[]) => void;
}

export default function InstructionsList({ 
  instructions, 
  onInstructionsChange 
}: InstructionsListProps) {
  
  const addInstruction = () => {
    const newInstructions = [...instructions, ''];
    onInstructionsChange(newInstructions);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      const newInstructions = instructions.filter((_, i) => i !== index);
      onInstructionsChange(newInstructions);
    }
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = instructions.map((inst, i) => i === index ? value : inst);
    onInstructionsChange(newInstructions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{STRINGS.RECIPE.INSTRUCTIONS}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addInstruction}>
          <Ionicons name="add" size={16} color={colors.white} />
          <Text style={styles.addButtonText}>{STRINGS.RECIPE.ADD_STEP}</Text>
        </TouchableOpacity>
      </View>

      {instructions.map((instruction, index) => (
        <View key={index} style={styles.instructionItem}>
          <View style={styles.instructionHeader}>
            <Text style={styles.stepNumber}>Step {index + 1}</Text>
            {instructions.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeInstruction(index)}
              >
                <Ionicons name="close-circle" size={20} color={colors.red} />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.textInput}
            placeholder={STRINGS.RECIPE.STEP_PLACEHOLDER}
            value={instruction}
            onChangeText={(value) => updateInstruction(index, value)}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
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
  instructionItem: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  instructionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.green,
  },
  removeButton: {
    padding: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 14,
    color: colors.blackGray,
    backgroundColor: colors.white,
    minHeight: 80,
  },
}); 