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

const Input: React.FC<InputProps> = ({
  placeholder,
  borderColor = '#E5E7EB',
  textColor = '#1F2937',
  backgroundColor = '#FFFFFF',
  focusBorderColor = '#22C55E',
  focusBackgroundColor,
  focusTextColor,
  error,
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const currentBorderColor = isFocused ? focusBorderColor : borderColor;
  const currentBackgroundColor = isFocused && focusBackgroundColor 
    ? focusBackgroundColor 
    : backgroundColor;
  const currentTextColor = isFocused && focusTextColor 
    ? focusTextColor 
    : textColor;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: currentBorderColor,
            backgroundColor: currentBackgroundColor,
            color: currentTextColor,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
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
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input; 