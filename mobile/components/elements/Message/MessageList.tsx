import React from 'react';
import { FlatList, StyleSheet, RefreshControl, View, Text } from 'react-native';
import { colors, spacing } from '@/theme';
import MessageItem, { MessageData } from './MessageItem';

interface MessageListProps {
  messages: MessageData[];
  onMessagePress: (message: MessageData) => void;
  onUserPress: (username: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function MessageList({
  messages,
  onMessagePress,
  onUserPress,
  refreshing = false,
  onRefresh,
}: MessageListProps) {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <MessageItem
          message={item}
          onPress={onMessagePress}
          onUserPress={onUserPress}
        />
      )}
      keyExtractor={item => item.id}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.gray}
          />
        ) : undefined
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No messages yet</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
}); 