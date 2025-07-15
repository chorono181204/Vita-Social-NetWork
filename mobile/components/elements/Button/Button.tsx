import React from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/theme';
import Image from '../Image';

export interface ButtonProps extends PressableProps {
  text?: string;
  textColor?: string;
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  textWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  
  icon?: any;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  width?: number | string;
  height?: number;
  
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  round?: boolean;
  roundSize?: 'sm' | 'md' | 'lg' | 'full';
  variant?: 'default' | 'icon' | 'primary' | 'secondary' | 'outline';
  
  isLoading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
  
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  image?: any;
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default function Button({
  text,
  textColor = colors.white,
  textSize = 'base',
  textWeight = 'medium',
  
  icon,
  iconSize = 20,
  iconColor,
  iconPosition = 'left',
  leftIcon,
  rightIcon,
  
  width,
  height = 48,
  
  backgroundColor = colors.blackGray,
  borderColor,
  borderWidth = 0,
  round = false,
  roundSize = 'md',
  variant = 'default',
  
  isLoading = false,
  disabled = false,
  loadingColor = colors.white,
  
  title,
  titleStyle,
  image,
  imageStyle,
  style,
  children,
  
  ...pressableProps
}: ButtonProps) {
  const displayText = text || title;
  const displayIcon = icon || image;
  
  const getTextSize = () => {
    const sizes = {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
    };
    return sizes[textSize] || 16;
  };
  
  const getFontWeight = () => {
    const weights: Record<string, any> = {
      normal: 'normal',
      medium: '500',
      semibold: '600',
      bold: 'bold',
    };
    return weights[textWeight] || '500';
  };
  
  const getBorderRadius = () => {
    if (round || variant === 'icon') return height / 2;
    
    const radiusSizes = {
      sm: 4,
      md: 8,
      lg: 12,
      full: height / 2,
    };
    return radiusSizes[roundSize] || 8;
  };

  const getVariantStyles = () => {
    const variants = {
      icon: {
        width: height,
        height: height,
        backgroundColor: colors.transparent,
        padding: 8,
      },
      primary: {
        backgroundColor: colors.green,
      },
      secondary: {
        backgroundColor: colors.lightGrayPurple,
      },
      outline: {
        backgroundColor: colors.transparent,
        borderColor: colors.gray,
        borderWidth: 1,
      },
      default: {},
    };
    return variants[variant] || {};
  };

  const renderIcon = (position: 'left' | 'right') => {
    if (position === 'left' && leftIcon) return leftIcon;
    if (position === 'right' && rightIcon) return rightIcon;
    if (displayIcon && iconPosition === position) {
      return (
        <Image 
          source={displayIcon} 
          style={[
            { 
              width: iconSize, 
              height: iconSize,
              tintColor: iconColor || textColor 
            },
            imageStyle
          ]} 
        />
      );
    }
    return null;
  };

  return (
    <Pressable
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: typeof width === 'number' ? width : undefined,
          height,
          backgroundColor,
          borderColor: borderColor || undefined,
          borderWidth: borderWidth > 0 ? borderWidth : undefined,
          borderRadius: getBorderRadius(),
          opacity: (disabled || isLoading) ? 0.6 : 1,
          gap: 8,
        },
        getVariantStyles(),
        style
      ]}
      disabled={disabled || isLoading}
      {...pressableProps}
    >
      {children}
      
      {isLoading && (
        <ActivityIndicator size="small" color={loadingColor} />
      )}
      
      {!isLoading && renderIcon('left')}
      
      {!isLoading && displayText && (
        <Text 
          style={[
            {
              color: textColor,
              fontSize: getTextSize(),
              fontWeight: getFontWeight(),
            },
            titleStyle
          ]}
        >
          {displayText}
        </Text>
      )}
      
      {!isLoading && renderIcon('right')}
    </Pressable>
  );
}
