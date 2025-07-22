import {
  Pressable,
  PressableProps,
  Text,
  ActivityIndicator,
  GestureResponderEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { colors } from '@/theme';
import Image from '../Image';

export interface ButtonProps extends PressableProps {
  // Text props
  text?: string;
  textColor?: string;
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  textWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  
  // Icon props
  icon?: ImageSourcePropType;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Size props
  width?: number | string;
  height?: number;
  
  // Style props
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  round?: boolean;
  roundSize?: 'sm' | 'md' | 'lg' | 'full';
  variant?: 'default' | 'icon' | 'primary' | 'secondary' | 'outline';
  
  // State props
  isLoading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
  
  // Legacy props (for backward compatibility)
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  image?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

function Button({
  // Text props
  text,
  textColor = colors.white,
  textSize = 'base',
  textWeight = 'medium',
  
  // Icon props
  icon,
  iconSize = 20,
  iconColor,
  iconPosition = 'left',
  leftIcon,
  rightIcon,
  
  // Size props
  width,
  height = 48,
  
  // Style props
  backgroundColor = colors.blackGray,
  borderColor,
  borderWidth = 0,
  round = false,
  roundSize = 'md',
  variant = 'default',
  
  // State props
  isLoading = false,
  disabled = false,
  loadingColor = colors.white,
  
  // Legacy props
  title,
  titleStyle,
  image,
  imageStyle,
  style,
  children,
  
  ...others
}: ButtonProps) {
  // Use text prop or fallback to title for backward compatibility
  const displayText = text || title;
  
  // Use icon prop or fallback to image for backward compatibility
  const displayIcon = icon || image;
  
  // Get text size value
  const getTextSize = () => {
    switch (textSize) {
      case 'xs': return 12;
      case 'sm': return 14;
      case 'base': return 16;
      case 'lg': return 18;
      case 'xl': return 20;
      case '2xl': return 24;
      default: return 16;
    }
  };
  
  // Get font weight value
  const getFontWeight = () => {
    switch (textWeight) {
      case 'normal': return 'normal';
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return 'bold';
      default: return '500';
    }
  };
  
  // Get border radius value
  const getBorderRadius = () => {
    if (round) return height / 2;
    if (variant === 'icon') return height / 2;
    
    switch (roundSize) {
      case 'sm': return 4;
      case 'md': return 8;
      case 'lg': return 12;
      case 'full': return height / 2;
      default: return 8;
    }
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'icon':
        return {
          width: height,
          height: height,
          backgroundColor: colors.transparent,
          padding: 8,
        };
      case 'primary':
        return {
          backgroundColor: colors.green,
        };
      case 'secondary':
        return {
          backgroundColor: colors.lightGrayPurple,
        };
      case 'outline':
        return {
          backgroundColor: colors.transparent,
          borderColor: colors.gray,
          borderWidth: 1,
        };
      default:
        return {};
    }
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
      {...others}>
      {children}
      
      {isLoading && (
        <ActivityIndicator size="small" color={loadingColor} />
      )}
      
      {!isLoading && leftIcon}
      {!isLoading && !leftIcon && displayIcon && iconPosition === 'left' && (
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
      )}
      
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
      
      {!isLoading && rightIcon}
      {!isLoading && !rightIcon && displayIcon && iconPosition === 'right' && (
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
      )}
    </Pressable>
  );
}

export default Button;
