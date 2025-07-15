import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface TagSectionProps {
  title: string;
  tags: string[];
  isEditing: boolean;
  tagInput: string;
  setTagInput: (input: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  styles: any;
}

export default function TagSection({
  title,
  tags,
  isEditing,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
  styles
}: TagSectionProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue('');
      setTagInput('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {isEditing ? (
        <View>
          <View style={styles.tagsEditContainer}>
            <TextInput
              style={styles.tagInput}
              value={inputValue}
              onChangeText={setInputValue}
              onKeyPress={handleKeyPress}
              placeholder={`Add ${title.toLowerCase()}`}
              placeholderTextColor={colors.gray}
            />
            <TouchableOpacity onPress={handleAddTag}>
              <Ionicons name="add-circle" size={24} color={colors.green} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsRow}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={() => onRemoveTag(index)}>
                  <Ionicons name="close-circle" size={16} color={colors.green} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
} 