import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/theme';

interface BadgeProps {
  value?: number | string;
  color?: string;
  backgroundColor?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export default function Badge({
  value,
  color = colors.white,
  backgroundColor = colors.green,
  size = 22,
  style,
  textStyle,
  children,
}: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          minWidth: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      {children ? (
        children
      ) : (
        <Text
          style={[
            styles.text,
            { color, fontSize: size * 0.7 },
            textStyle,
          ]}
        >
          {value}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
  },
}); 