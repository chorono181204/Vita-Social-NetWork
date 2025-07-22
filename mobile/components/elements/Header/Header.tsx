import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, images, spacing, sizing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface HeaderButton {
  icon?: keyof typeof Ionicons.glyphMap;
  text?: string;
  onPress: () => void;
  badge?: number;
  style?: 'default' | 'primary' | 'secondary';
}

export interface DynamicHeaderProps {
  variant?: 'default' | 'search' | 'profile' | 'minimal' | 'center-logo';
  title?: string;
  subtitle?: string;
  leftButton?: HeaderButton;
  rightButton?: HeaderButton;
  rightButtons?: HeaderButton[]; // Multiple buttons
  showBackButton?: boolean;
  backgroundColor?: string;
  showLogo?: boolean;
  centerTitle?: boolean;
  titleAlignLeft?: boolean; // Align title với content padding
  contentPadding?: number; // Custom padding cho title
  onBackPress?: () => void;
}

export default function Header({
  variant = 'default',
  title,
  subtitle,
  leftButton,
  rightButton,
  rightButtons,
  showBackButton = false,
  backgroundColor = colors.white,
  showLogo = false,
  centerTitle = false,
  titleAlignLeft = false,
  contentPadding = 0,
  onBackPress,
}: DynamicHeaderProps) {
  const insets = useSafeAreaInsets();

  const renderLeftContent = () => {
    if (showBackButton) {
      return (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onBackPress || (() => console.log('Back pressed'))}
        >
          <Ionicons name="arrow-back" size={sizing.iconMd} color={colors.blackGray} />
        </TouchableOpacity>
      );
    }

    if (leftButton) {
      return (
        <TouchableOpacity style={styles.actionButton} onPress={leftButton.onPress}>
          {leftButton.icon && (
            <Ionicons name={leftButton.icon} size={sizing.iconMd} color={colors.blackGray} />
          )}
          {leftButton.text && (
            <Text style={styles.buttonText}>{leftButton.text}</Text>
          )}
        </TouchableOpacity>
      );
    }

    // Default menu for certain variants
    if (variant === 'default' || variant === 'center-logo') {
      return (
        <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Menu pressed')}>
          <Ionicons name="menu" size={sizing.iconMd} color={colors.blackGray} />
        </TouchableOpacity>
      );
    }

    return <View style={styles.actionButton} />;
  };

  const renderCenterContent = () => {
    if (variant === 'center-logo' || showLogo) {
      return (
        <View style={styles.centerContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
      );
    }

    if (variant === 'minimal') {
      return <View style={styles.centerContainer} />;
    }

    // Custom styling cho title align left  
    // Để align với khối bọc ngoài: contentPadding - header padding
    const titleContainerStyle = [
      styles.centerContainer,
      centerTitle && styles.centerAligned,
      titleAlignLeft && contentPadding ? { 
        paddingLeft: Math.max(0, contentPadding - spacing.lg),
        paddingRight: 0
      } : null
    ].filter(Boolean);

    const titleTextStyle = [
      styles.title,
      centerTitle && styles.titleCentered,
      titleAlignLeft && styles.titleAlignLeft
    ];

    return (
      <View style={titleContainerStyle}>
        {title && (
          <Text style={titleTextStyle} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitle, titleAlignLeft && styles.titleAlignLeft]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  const renderRightContent = () => {
    const buttons = rightButtons || (rightButton ? [rightButton] : []);
    
    if (buttons.length === 0) {
      // Default search for certain variants
      if (variant === 'default' || variant === 'center-logo') {
        return (
          <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Search pressed')}>
            <Ionicons name="search" size={sizing.iconMd} color={colors.blackGray} />
          </TouchableOpacity>
        );
      }
      return <View style={styles.actionButton} />;
    }

    return (
      <View style={styles.rightButtonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.actionButton, index > 0 && styles.buttonSpacing]} 
            onPress={button.onPress}
          >
            {button.icon && (
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={button.icon} 
                  size={sizing.iconMd} 
                  color={button.style === 'primary' ? colors.green : colors.blackGray} 
                />
                {button.badge && button.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {button.badge > 99 ? '99+' : button.badge.toString()}
                    </Text>
                  </View>
                )}
              </View>
            )}
            {button.text && (
              <Text style={[
                styles.buttonText,
                button.style === 'primary' && styles.primaryButtonText
              ]}>
                {button.text}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor }]}>
      <View style={styles.content}>
        {renderLeftContent()}
        {renderCenterContent()}
        {renderRightContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGrayPurple,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    height: sizing.headerHeight,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  centerAligned: {
    alignItems: 'center',
  },
  logo: {
    width: sizing.logoLg,
    height: sizing.logoLg,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
  },
  titleCentered: {
    textAlign: 'center',
  },
  titleAlignLeft: {
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  buttonText: {
    fontSize: 16,
    color: colors.blackGray,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: colors.green,
    fontWeight: '600',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacing: {
    marginLeft: spacing.sm,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.pink,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
}); 