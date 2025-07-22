import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { PostMode } from '@/types';
import { STRINGS } from '@/constants/strings';

interface PostTypeSelectorProps {
  selectedMode: PostMode;
  onModeChange: (mode: PostMode) => void;
}

export default function PostTypeSelector({ 
  selectedMode, 
  onModeChange 
}: PostTypeSelectorProps) {
  const modes = [
    {
      id: 'status' as PostMode,
      title: STRINGS.POST_TYPE.STATUS,
      subtitle: STRINGS.POST_TYPE.STATUS_SUBTITLE,
      icon: 'chatbubble-outline',
      color: colors.green
    },
    {
      id: 'recipe' as PostMode,
      title: STRINGS.POST_TYPE.RECIPE,
      subtitle: STRINGS.POST_TYPE.RECIPE_SUBTITLE,
      icon: 'restaurant-outline',
      color: colors.green
    }
  ];

  const renderModeOption = (mode: typeof modes[0]) => {
    const isSelected = selectedMode === mode.id;
    
    return (
      <TouchableOpacity
        key={mode.id}
        style={[
          styles.modeOption,
          isSelected && styles.selectedOption,
          { borderColor: mode.color }
        ]}
        onPress={() => onModeChange(mode.id)}
      >
        <View style={[
          styles.iconContainer,
          isSelected && { backgroundColor: mode.color }
        ]}>
          <Ionicons 
            name={mode.icon as any} 
            size={24} 
            color={isSelected ? colors.white : mode.color} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[
            styles.modeTitle,
            isSelected && { color: mode.color }
          ]}>
            {mode.title}
          </Text>
          <Text style={styles.modeSubtitle}>
            {mode.subtitle}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={20} color={mode.color} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{STRINGS.POST_TYPE.SELECT_POST_TYPE}</Text>
      <View style={styles.optionsContainer}>
        {modes.map(renderModeOption)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: spacing.md,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  modeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },
  selectedOption: {
    backgroundColor: colors.lightGrayPurple,
    borderWidth: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: 2,
  },
  modeSubtitle: {
    fontSize: 14,
    color: colors.gray,
  },
  checkmark: {
    marginLeft: spacing.sm,
  },
}); 