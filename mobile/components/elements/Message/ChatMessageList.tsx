import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { colors } from '@/theme';
import ChatMessageItem, { ChatMessageData } from './ChatMessageItem';

interface ChatMessageListProps {
  messages: ChatMessageData[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <FlatList
      data={messages}
      renderItem={({ item, index }) => (
        <ChatMessageItem
          message={item}
          showAvatar={
            // Only show avatar if next message is from different user or last message
            index === messages.length - 1 || messages[index + 1]?.user.username !== item.user.username
          }
        />
      )}
      keyExtractor={item => item.id}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      inverted
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
  contentContainer: {
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
}); 