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

interface PostMoreModalProps {
  visible: boolean;
  onClose: () => void;
  isOwnPost: boolean;
  userName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onNotInterested?: () => void;
  onUnfollow?: () => void;
  onReport?: () => void;
}

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  color?: string;
  destructive?: boolean;
}

const MenuItem = ({ icon, title, onPress, color, destructive }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons 
      name={icon as any} 
      size={22} 
      color={destructive ? colors.red : (color || colors.blackGray)} 
    />
    <Text style={[
      styles.menuText, 
      destructive && { color: colors.red }
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function PostMoreModal({
  visible,
  onClose,
  isOwnPost,
  userName,
  onEdit,
  onDelete,
  onNotInterested,
  onUnfollow,
  onReport,
}: PostMoreModalProps) {
  const handleBackdropPress = () => {
    onClose();
  };

  const ownPostOptions = [
    {
      icon: 'create-outline',
      title: 'Edit post',
      onPress: () => {
        onEdit?.();
        onClose();
      },
    },
    {
      icon: 'trash-outline',
      title: 'Delete post',
      onPress: () => {
        onDelete?.();
        onClose();
      },
      destructive: true,
    },
  ];

  const othersPostOptions = [
    {
      icon: 'eye-off-outline',
      title: 'Not interested',
      onPress: () => {
        onNotInterested?.();
        onClose();
      },
    },
    {
      icon: 'person-remove-outline',
      title: `Unfollow @${userName}`,
      onPress: () => {
        onUnfollow?.();
        onClose();
      },
    },
    {
      icon: 'flag-outline',
      title: 'Report post',
      onPress: () => {
        onReport?.();
        onClose();
      },
      destructive: true,
    },
  ];

  const menuOptions = isOwnPost ? ownPostOptions : othersPostOptions;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <SafeAreaView style={styles.container}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            {/* Handle Bar */}
            <View style={styles.handle} />
            
            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {menuOptions.map((option, index) => (
                <MenuItem
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
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingBottom: spacing.xl,
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