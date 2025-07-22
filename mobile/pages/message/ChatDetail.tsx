import React, { useState, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/theme';
import MainLayout from '@/components/layouts/Main/MainLayout';
import { ChatMessageList, ChatInput, ChatMessageData } from '@/components/elements/Message';

const mockUser = {
  username: 'emma_wilson',
  displayName: 'Emma Wilson',
  avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
};

const initialMessages: ChatMessageData[] = [
  {
    id: '1',
    text: 'Hey! How are you?',
    time: '09:00',
    isMe: false,
    user: mockUser,
  },
  {
    id: '2',
    text: 'I am good, thanks! And you?',
    time: '09:01',
    isMe: true,
    user: { username: 'me', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  },
  {
    id: '3',
    text: 'Doing great! Ready for the gym?',
    time: '09:02',
    isMe: false,
    user: mockUser,
  },
];

export default function ChatDetail() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageData[]>(initialMessages);

  // In real app, you would fetch user data and messages based on username
  const user = mockUser; // For now, use mock data

  const handleSend = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        user: { username: 'me', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainLayout
        headerProps={{
          variant: 'default',
          title: user.displayName,
          titleAlignLeft: true,
          leftButton: {
            icon: 'arrow-back',
            onPress: () => router.back(),
          },
          rightButtons: [
            {
              icon: 'call-outline',
              onPress: () => {},
            },
            {
              icon: 'videocam-outline',
              onPress: () => {},
            },
          ],
        }}
      >
        <View style={styles.container}>
          <ChatMessageList messages={messages} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ChatInput onSend={handleSend} />
        </KeyboardAvoidingView>
      </MainLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
}); 