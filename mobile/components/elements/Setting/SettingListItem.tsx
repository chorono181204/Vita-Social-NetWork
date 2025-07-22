import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, sizing } from '@/theme';

interface SettingListItemProps {
  leftIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export default function SettingListItem({
  leftIcon,
  title,
  subtitle,
  rightIcon,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  children,
}: SettingListItemProps) {
  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <View style={styles.textCol}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
      </View>
      {children}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2, // 14px
    paddingHorizontal: spacing.listItemPadding,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrayPurple,
    minHeight: sizing.listItemMinHeight,
  },
  leftIcon: {
    marginRight: spacing.listItemIconMargin,
    marginLeft: spacing.sm, // Thụt icon vào trong 8px
  },
  textCol: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackGray,
  },
  subtitle: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  rightIcon: {
    marginLeft: spacing.md,
    marginRight: spacing.sm, // Thụt icon phải vào trong 8px
  },
}); 