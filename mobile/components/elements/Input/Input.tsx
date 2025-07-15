import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  placeholder?: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  focusBorderColor?: string;
  focusBackgroundColor?: string;
  focusTextColor?: string;
  error?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  required?: boolean;
}

export default function Input({
  placeholder,
  borderColor = colors.gray,
  textColor = colors.blackGray,
  backgroundColor = colors.white,
  focusBorderColor = colors.green,
  focusBackgroundColor,
  focusTextColor,
  error,
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  required,
  onFocus,
  onBlur,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getCurrentStyles = () => {
    const currentBorderColor = isFocused ? focusBorderColor : borderColor;
    const currentBackgroundColor = isFocused && focusBackgroundColor 
      ? focusBackgroundColor 
      : backgroundColor;
    const currentTextColor = isFocused && focusTextColor 
      ? focusTextColor 
      : textColor;

    return {
      borderColor: currentBorderColor,
      backgroundColor: currentBackgroundColor,
      color: currentTextColor,
    };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          getCurrentStyles(),
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />
      
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blackGray,
    marginBottom: 8,
  },
  required: {
    color: colors.red,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  error: {
    fontSize: 12,
    color: colors.red,
    marginTop: 4,
    marginLeft: 4,
  },
}); 