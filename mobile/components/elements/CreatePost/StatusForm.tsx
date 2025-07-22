import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { CreateStatusData } from '@/types';
import { STRINGS } from '@/constants/strings';

interface StatusFormProps {
  onSubmit: (data: CreateStatusData) => void;
  isLoading?: boolean;
}

export default function StatusForm({ onSubmit, isLoading }: StatusFormProps) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (content.trim().length === 0) {
      Alert.alert(STRINGS.STATUS.ERROR, STRINGS.STATUS.CONTENT_REQUIRED);
      return;
    }

    onSubmit({
      content: content.trim(),
      images: images.length > 0 ? images : undefined
    });
  };

  const handleAddImage = () => {
    // Simulate image picker - trong thực tế sẽ dùng expo-image-picker
    const mockImages = [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
      'https://picsum.photos/400/300?random=4',
      'https://picsum.photos/400/300?random=5',
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    if (images.length < 4) {
      setImages(prev => [...prev, randomImage]);
    } else {
      Alert.alert(STRINGS.STATUS.ERROR, STRINGS.STATUS.CHARACTER_LIMIT);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const isValid = content.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={styles.label}>{STRINGS.STATUS.CONTENT_LABEL}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={STRINGS.STATUS.PLACEHOLDER}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={500}
        />
        <Text style={styles.characterCount}>
          {content.length}/500
        </Text>
      </View>

      <View style={styles.mediaSection}>
        <View style={styles.mediaSectionHeader}>
          <Text style={styles.label}>{STRINGS.STATUS.IMAGES_LABEL}</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddImage}
            disabled={images.length >= 4}
          >
            <Ionicons name="add" size={20} color={colors.white} />
            <Text style={styles.addButtonText}>{STRINGS.STATUS.ADD_IMAGE}</Text>
          </TouchableOpacity>
        </View>

        {images.length > 0 && (
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close-circle" size={24} color={colors.red} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!isValid || isLoading) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <Text style={styles.submitButtonText}>{STRINGS.STATUS.POSTING}</Text>
        ) : (
          <>
            <Ionicons name="send" size={16} color={colors.white} />
            <Text style={styles.submitButtonText}>{STRINGS.STATUS.POST}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.blackGray,
    backgroundColor: colors.white,
    minHeight: 120,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  mediaSection: {
    marginBottom: spacing.lg,
  },
  mediaSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  imageItem: {
    position: 'relative',
    width: '48%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.md,
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    gap: spacing.xs,
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray,
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 