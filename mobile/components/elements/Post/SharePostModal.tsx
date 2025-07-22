import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';
import { PostData } from './Post';

interface SharePostModalProps {
  visible: boolean;
  onClose: () => void;
  post: PostData;
  onShare?: (postId: string, caption?: string) => void;
}

export default function SharePostModal({
  visible,
  onClose,
  post,
  onShare,
}: SharePostModalProps) {
  const [shareCaption, setShareCaption] = useState('');

  const handleShare = () => {
    onShare?.(post.id, shareCaption.trim() || undefined);
    onClose();
    setShareCaption('');
    Alert.alert('Success', 'Post shared successfully!');
  };

  const handleCancel = () => {
    setShareCaption('');
    onClose();
  };

  const renderPostPreview = () => (
    <View style={styles.postPreview}>
      <View style={styles.previewContent}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewUsername}>@{post.user.username}</Text>
          <Text style={styles.previewTime}>{post.timeAgo}</Text>
        </View>
        <Text style={styles.previewText}>
          {post.content}
        </Text>
        {post.images && post.images.length > 0 && (
          <View style={styles.previewImageIndicator}>
            <Ionicons name="image" size={16} color={colors.gray} />
            <Text style={styles.previewImageText}>
              {post.images.length} image{post.images.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Share Post</Text>
          <TouchableOpacity onPress={handleShare}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Status Input */}
          <View style={styles.statusContainer}>
            <TextInput
              style={styles.statusInput}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.gray}
              value={shareCaption}
              onChangeText={setShareCaption}
              multiline
              maxLength={280}
              autoFocus
            />
            <Text style={styles.characterCount}>
              {shareCaption.length}/280
            </Text>
          </View>

          {/* Post Preview */}
          {renderPostPreview()}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
  },
  cancelText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  shareText: {
    fontSize: 16,
    color: colors.blue,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  statusContainer: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  statusInput: {
    fontSize: 16,
    color: colors.blackGray,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.sm,
  },
  characterCount: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'right',
  },
  postPreview: {
    margin: spacing.lg,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  previewContent: {
    padding: spacing.md,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  previewUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue,
  },
  previewTime: {
    fontSize: 12,
    color: colors.gray,
  },
  previewText: {
    fontSize: 14,
    color: colors.blackGray,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  previewImageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewImageText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: spacing.xs,
  },
}); 