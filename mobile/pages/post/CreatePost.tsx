import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';
import { PostMode, CreatePostData, CreatePostFormProps } from '@/types';
import { STRINGS } from '@/constants/strings';
import { PostTypeSelector, StatusForm, RecipeForm } from '@/components/elements/CreatePost';
import { useRouter } from 'expo-router';
import MainLayout from '@/components/layouts/Main/MainLayout';

interface CreatePostProps extends CreatePostFormProps {
  defaultMode?: PostMode;
}

export default function CreatePost({
  onSubmit,
  onCancel,
  isLoading = false,
  defaultMode = 'status'
}: CreatePostProps) {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<PostMode>(defaultMode);
  const [showTypeSelector, setShowTypeSelector] = useState(true);

  const handleModeSelect = (mode: PostMode) => {
    setSelectedMode(mode);
    setShowTypeSelector(false);
  };

  const handleBack = () => {
    if (!showTypeSelector) {
      setShowTypeSelector(true);
    } else {
      // Navigate back instead of calling onCancel
      router.back();
    }
  };

  const handleStatusSubmit = (data: any) => {
    if (onSubmit) {
      onSubmit({
        mode: 'status',
        data
      });
    } else {
      // Default handling if no onSubmit provided
      console.log('Creating status post:', data);
      router.back();
    }
  };

  const handleRecipeSubmit = (data: any) => {
    if (onSubmit) {
      onSubmit({
        mode: 'recipe',
        data
      });
    } else {
      // Default handling if no onSubmit provided
      console.log('Creating recipe post:', data);
      router.back();
    }
  };

  const getTitle = () => {
    if (showTypeSelector) return STRINGS.MODAL.CREATE_POST;
    return selectedMode === 'status' ? STRINGS.MODAL.POST_STATUS : STRINGS.MODAL.POST_RECIPE;
  };

  const getSubtitle = () => {
    if (showTypeSelector) return STRINGS.MODAL.SELECT_TYPE_SUBTITLE;
    return selectedMode === 'status' 
      ? STRINGS.MODAL.STATUS_SUBTITLE 
      : STRINGS.MODAL.RECIPE_SUBTITLE;
  };

  return (
    <MainLayout headerProps={{ title: 'Create Post', variant: 'default' }}>
      {/* Content */}
      <View style={styles.content}>
        {showTypeSelector ? (
          <View style={styles.typeSelectorContainer}>
            <PostTypeSelector
              selectedMode={selectedMode}
              onModeChange={handleModeSelect}
            />
            
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => setShowTypeSelector(false)}
            >
              <Text style={styles.continueButtonText}>{STRINGS.MODAL.CONTINUE}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            {selectedMode === 'status' ? (
              <StatusForm
                onSubmit={handleStatusSubmit}
                isLoading={isLoading}
              />
            ) : (
              <RecipeForm
                onSubmit={handleRecipeSubmit}
                isLoading={isLoading}
              />
            )}
          </View>
        )}
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.blackGray,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  typeSelectorContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    justifyContent: 'space-between',
  },
  continueButton: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
}); 