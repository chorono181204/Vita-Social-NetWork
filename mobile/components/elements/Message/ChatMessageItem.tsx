import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing } from '@/theme';

export interface ChatMessageData {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  user: {
    username: string;
    avatar: string;
  };
}

interface ChatMessageItemProps {
  message: ChatMessageData;
  showAvatar?: boolean;
}

export default function ChatMessageItem({ message, showAvatar = true }: ChatMessageItemProps) {
  const isMe = message.isMe;
  return (
    <View style={[styles.row, isMe ? styles.rowMe : styles.rowOther]}>
      {!isMe && showAvatar && (
        <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
      )}
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={[styles.text, isMe ? styles.textMe : styles.textOther]}>{message.text}</Text>
        <Text style={styles.time}>{message.time}</Text>
      </View>
      {isMe && showAvatar && (
        <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: spacing.lg,
  },
  rowMe: {
    justifyContent: 'flex-end',
  },
  rowOther: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: 2,
  },
  bubbleMe: {
    backgroundColor: colors.green,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: colors.lightGray,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  textMe: {
    color: colors.white,
  },
  textOther: {
    color: colors.blackGray,
  },
  time: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
}); 