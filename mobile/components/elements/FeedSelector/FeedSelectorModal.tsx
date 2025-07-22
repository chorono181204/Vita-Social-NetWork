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

export type FeedType = 'following' | 'foryou';

interface FeedSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFeed: FeedType;
  onFeedSelect: (feedType: FeedType) => void;
}

interface FeedOptionProps {
  icon: string;
  title: string;
  description: string;
  isSelected: boolean;
  onPress: () => void;
}

const FeedOption = ({ icon, title, description, isSelected, onPress }: FeedOptionProps) => (
  <TouchableOpacity style={[styles.feedOption, isSelected && styles.selectedOption]} onPress={onPress}>
    <View style={styles.optionContent}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={icon as any} 
          size={24} 
          color={isSelected ? colors.green : colors.blackGray} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.optionTitle, isSelected && styles.selectedText]}>
          {title}
        </Text>
        <Text style={[styles.optionDescription, isSelected && styles.selectedDescription]}>
          {description}
        </Text>
      </View>
    </View>
    {isSelected && (
      <Ionicons name="checkmark-circle" size={20} color={colors.green} />
    )}
  </TouchableOpacity>
);

export default function FeedSelectorModal({
  visible,
  onClose,
  selectedFeed,
  onFeedSelect,
}: FeedSelectorModalProps) {
  const handleBackdropPress = () => {
    onClose();
  };

  const handleFeedSelect = (feedType: FeedType) => {
    onFeedSelect(feedType);
    onClose();
  };

  const feedOptions = [
    {
      type: 'following' as FeedType,
      icon: 'people-outline',
      title: 'Following',
      description: 'See posts from accounts you follow',
    },
    {
      type: 'foryou' as FeedType,
      icon: 'sparkles-outline',
      title: 'For You',
      description: 'Discover new posts curated for you',
    },
  ];

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
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Choose your feed</Text>
              <Text style={styles.headerSubtitle}>
                You can change this anytime in settings
              </Text>
            </View>
            
            {/* Feed Options */}
            <View style={styles.optionsContainer}>
              {feedOptions.map((option) => (
                <FeedOption
                  key={option.type}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  isSelected={selectedFeed === option.type}
                  onPress={() => handleFeedSelect(option.type)}
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
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.blackGray,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  feedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  selectedOption: {
    borderColor: colors.green,
    backgroundColor: `${colors.green}08`,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: 2,
  },
  selectedText: {
    color: colors.green,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 18,
  },
  selectedDescription: {
    color: colors.green,
  },
  cancelButton: {
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.lightGray,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.blackGray,
  },
}); 