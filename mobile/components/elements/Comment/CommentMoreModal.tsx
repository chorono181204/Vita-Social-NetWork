import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

interface CommentMoreModalProps {
  visible: boolean;
  onClose: () => void;
  isOwnComment: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

const CommentMenuItem = ({ 
  icon, 
  title, 
  onPress, 
  destructive = false 
}: {
  icon: string;
  title: string;
  onPress: () => void;
  destructive?: boolean;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons 
      name={icon as any} 
      size={20} 
      color={destructive ? colors.red : colors.blackGray} 
    />
    <Text style={[
      styles.menuText, 
      destructive && { color: colors.red }
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function CommentMoreModal({
  visible,
  onClose,
  isOwnComment,
  onEdit,
  onDelete,
  onReport,
}: CommentMoreModalProps) {
  const ownCommentOptions = [
    {
      icon: 'create-outline',
      title: 'Edit comment',
      onPress: () => {
        onEdit?.();
        onClose();
      },
    },
    {
      icon: 'trash-outline',
      title: 'Delete comment',
      onPress: () => {
        onDelete?.();
        onClose();
      },
      destructive: true,
    },
  ];

  const othersCommentOptions = [
    {
      icon: 'flag-outline',
      title: 'Report comment',
      onPress: () => {
        onReport?.();
        onClose();
      },
      destructive: true,
    },
  ];

  const menuOptions = isOwnComment ? ownCommentOptions : othersCommentOptions;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <SafeAreaView style={styles.container}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            {/* Handle Bar */}
            <View style={styles.handle} />
            
            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {menuOptions.map((option, index) => (
                <CommentMenuItem
                  key={index}
                  icon={option.icon}
                  title={option.title}
                  onPress={option.onPress}
                  destructive={option.destructive}
                />
              ))}
            </View>
            
            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingBottom: spacing.xl,
    maxHeight: '50%',
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  menuContainer: {
    paddingHorizontal: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuText: {
    fontSize: 16,
    color: colors.blackGray,
    marginLeft: spacing.md,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.lightGray,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: colors.blackGray,
    fontWeight: '600',
  },
}); 