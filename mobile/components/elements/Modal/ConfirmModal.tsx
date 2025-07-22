import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

export interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  
  // Content props
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackgroundColor?: string;
  
  // Button props
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmTextColor?: string;
  cancelTextColor?: string;
  
  // Style props
  confirmButtonStyle?: 'danger' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  showCancelButton?: boolean;
}

export default function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  loading = false,
  
  // Content defaults
  title = 'Confirm Action',
  subtitle = 'Are you sure you want to proceed?',
  icon = 'help-circle-outline',
  iconColor = colors.gray,
  iconBackgroundColor = colors.lightGray,
  
  // Button defaults
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonColor,
  cancelButtonColor = colors.lightGray,
  confirmTextColor,
  cancelTextColor = colors.blackGray,
  
  // Style defaults
  confirmButtonStyle = 'primary',
  size = 'medium',
  showCancelButton = true,
}: ConfirmModalProps) {
  
  // Get button colors based on style
  const getConfirmButtonColor = () => {
    if (confirmButtonColor) return confirmButtonColor;
    
    switch (confirmButtonStyle) {
      case 'danger':
        return colors.red;
      case 'primary':
        return colors.green;
      case 'secondary':
        return colors.blue;
      default:
        return colors.green;
    }
  };
  
  const getConfirmTextColor = () => {
    if (confirmTextColor) return confirmTextColor;
    return colors.white;
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          maxWidth: 280,
          padding: spacing.lg,
          titleSize: 20,
          subtitleSize: 14,
          iconSize: 24,
          iconContainerSize: 48,
        };
      case 'large':
        return {
          maxWidth: 360,
          padding: spacing.xxl,
          titleSize: 28,
          subtitleSize: 18,
          iconSize: 40,
          iconContainerSize: 80,
        };
      default: // medium
        return {
          maxWidth: 320,
          padding: spacing.xl,
          titleSize: 24,
          subtitleSize: 16,
          iconSize: 32,
          iconContainerSize: 64,
        };
    }
  };
  
  const sizeStyles = getSizeStyles();
  const finalConfirmButtonColor = getConfirmButtonColor();
  const finalConfirmTextColor = getConfirmTextColor();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { 
          maxWidth: sizeStyles.maxWidth,
          padding: sizeStyles.padding 
        }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { 
              width: sizeStyles.iconContainerSize,
              height: sizeStyles.iconContainerSize,
              borderRadius: sizeStyles.iconContainerSize / 2,
              backgroundColor: iconBackgroundColor,
            }]}>
              <Ionicons 
                name={icon} 
                size={sizeStyles.iconSize} 
                color={iconColor} 
              />
            </View>
            <Text style={[styles.title, { fontSize: sizeStyles.titleSize }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, { fontSize: sizeStyles.subtitleSize }]}>
              {subtitle}
            </Text>
          </View>

          {/* Actions */}
          <View style={[styles.actions, !showCancelButton && styles.singleAction]}>
            {showCancelButton && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, { backgroundColor: cancelButtonColor }]}
                onPress={onClose}
                disabled={loading}
              >
                <Text style={[styles.cancelButtonText, { color: cancelTextColor }]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[
                styles.button, 
                styles.confirmButton, 
                { backgroundColor: finalConfirmButtonColor },
                loading && styles.disabledButton,
                !showCancelButton && styles.fullWidthButton
              ]}
              onPress={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="ellipsis-horizontal" size={20} color={finalConfirmTextColor} />
                </View>
              ) : (
                <Text style={[styles.confirmButtonText, { color: finalConfirmTextColor }]}>
                  {confirmText}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: 'bold',
    color: colors.blackGray,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  singleAction: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  cancelButton: {
    // backgroundColor set dynamically
  },
  confirmButton: {
    // backgroundColor set dynamically
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 