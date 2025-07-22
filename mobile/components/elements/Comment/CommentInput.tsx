import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, sizing } from '@/theme';
import { CommentInputProps } from '@/types';

export default function CommentInput({
  onSubmit,
  placeholder = "Write a comment...",
  autoFocus = false,
  replyTo,
  onCancel
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  const handleCancel = () => {
    setContent('');
    onCancel?.();
  };

  return (
    <View style={styles.container}>
      {replyTo && (
        <View style={styles.replyIndicator}>
          <Text style={styles.replyText}>
            Replying to {replyTo.user.displayName || replyTo.user.username}
          </Text>
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="close" size={18} color={colors.gray} />
          </TouchableOpacity>
        </View>
      )}
      
      <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={500}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, content.trim() && styles.sendButtonActive]}
          onPress={handleSubmit}
          disabled={!content.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={content.trim() ? colors.blue : colors.gray} 
          />
        </TouchableOpacity>
      </View>
      
      {isFocused && (
        <View style={styles.actionsRow}>
          <Text style={styles.characterCount}>
            {content.length}/500
          </Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="camera-outline" size={20} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="happy-outline" size={20} color={colors.gray} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  replyIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  replyText: {
    fontSize: 12,
    color: colors.blue,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 40,
  },
  inputFocused: {
    borderColor: colors.blue,
    backgroundColor: colors.lightBlue,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.blackGray,
    maxHeight: 100,
    paddingVertical: spacing.xs,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  sendButtonActive: {
    backgroundColor: colors.lightBlue,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  characterCount: {
    fontSize: 11,
    color: colors.gray,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
}); 