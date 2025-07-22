import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, sizing } from '@/theme';
import { Recipe } from '@/types';

interface RecipeAuthorProps {
  recipe: Recipe;
}

export default function RecipeAuthor({ recipe }: RecipeAuthorProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.author.avatar }} style={styles.authorAvatar} />
      <View style={styles.authorInfo}>
        <Text style={styles.authorName}>Recipe by {recipe.author.username}</Text>
        <Text style={styles.createdDate}>Created {recipe.createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    marginBottom: spacing.lg,
  },
  authorAvatar: {
    width: sizing.avatarMd,
    height: sizing.avatarMd,
    borderRadius: sizing.avatarMd / 2,
    marginRight: spacing.md,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.blackGray,
  },
  createdDate: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
}); 