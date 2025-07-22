import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

interface ActionButtonData {
  icon: string;
  count?: number;
  isActive?: boolean;
  activeColor?: string;
  onPress?: () => void;
}

interface ActionBarProps {
  like: ActionButtonData;
  comment: ActionButtonData;
  save?: ActionButtonData;
  share: ActionButtonData;
  extraActions?: React.ReactNode;
  variant?: 'post' | 'detail'; // post = inline, detail = bottom fixed
}

export default function ActionBar({
  like,
  comment,
  save,
  share,
  extraActions,
  variant = 'post'
}: ActionBarProps) {
  const renderActionButton = (action: ActionButtonData, key: string) => (
    <TouchableOpacity 
      key={key}
      style={styles.actionButton} 
      onPress={action.onPress}
    >
      <Ionicons 
        name={action.icon as any} 
        size={variant === 'detail' ? 24 : 22} 
        color={action.isActive 
          ? (action.activeColor || colors.green) 
          : colors.gray
        } 
      />
      {action.count !== undefined && (
        <Text style={[
          styles.actionText, 
          action.isActive && { color: action.activeColor || colors.green },
          variant === 'detail' && styles.detailActionText
        ]}>
          {action.count}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.actions, variant === 'detail' && styles.detailActions]}>
      <View style={styles.mainActions}>
        {renderActionButton(like, 'like')}
        {renderActionButton(comment, 'comment')}
        {save && renderActionButton(save, 'save')}
        {renderActionButton(share, 'share')}
      </View>
      
      {extraActions && variant !== 'detail' && (
        <View style={styles.extraActionsContainer}>
          {extraActions}
        </View>
      )}
      
      {extraActions && variant === 'detail' && (
        <View style={styles.extraActionsContainer}>
          {extraActions}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginTop: spacing.md,
  },
  detailActions: {
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    borderBottomWidth: 0,
    marginTop: 0,
    backgroundColor: colors.white,
  },
  mainActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  actionText: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  detailActionText: {
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
  extraActionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 