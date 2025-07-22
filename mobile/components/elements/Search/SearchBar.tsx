import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (text: string) => void;
  onVoicePress?: () => void;
  onCameraPress?: () => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  onSearch,
  onVoicePress,
  onCameraPress,
  onClear,
  placeholder = "Search people, recipes, posts...",
  autoFocus = false
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
        
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSearch?.(value)}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
        
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.quickActions}>
        {onVoicePress && (
          <TouchableOpacity onPress={onVoicePress} style={styles.actionButton}>
            <Ionicons name="mic-outline" size={22} color={colors.green} />
          </TouchableOpacity>
        )}
        
        {onCameraPress && (
          <TouchableOpacity onPress={onCameraPress} style={styles.actionButton}>
            <Ionicons name="camera-outline" size={22} color={colors.green} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.blackGray,
    paddingVertical: 0,
  },
  clearButton: {
    padding: spacing.xs,
  },
  quickActions: {
    flexDirection: 'row',
    marginLeft: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
}); 