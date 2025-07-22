import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { STRINGS } from '@/constants/strings';

interface ImageUploaderProps {
  image: string;
  onImageChange: (image: string) => void;
  required?: boolean;
}

export default function ImageUploader({ 
  image, 
  onImageChange, 
  required = false 
}: ImageUploaderProps) {
  
  const handleAddImage = () => {
    // Mock image picker - in real app would use expo-image-picker
    const mockImages = [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500',
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    onImageChange(randomImage);
  };

  const removeImage = () => {
    onImageChange('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.label}>
          {STRINGS.RECIPE.DISH_IMAGE}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
          <Ionicons name="camera" size={16} color={colors.white} />
          <Text style={styles.addButtonText}>{STRINGS.RECIPE.ADD_IMAGE}</Text>
        </TouchableOpacity>
      </View>

      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.recipeImage} />
          <TouchableOpacity 
            style={styles.removeImageButton}
            onPress={removeImage}
          >
            <Ionicons name="close-circle" size={24} color={colors.red} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="camera-outline" size={48} color={colors.gray} />
          <Text style={styles.placeholderText}>No image selected</Text>
          <Text style={styles.placeholderSubtext}>Tap "Add image" to upload</Text>
        </View>
      )}
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
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
  },
  required: {
    color: colors.red,
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
  imageContainer: {
    position: 'relative',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: radius.md,
  },
  removeImageButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  placeholder: {
    height: 200,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray,
    marginTop: spacing.sm,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
}); 