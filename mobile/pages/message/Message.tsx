import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import MainLayout from '@/components/layouts/Main/MainLayout';
import { MessageList, MessageData } from '@/components/elements/Message';
import { useUserNavigation } from '@/hooks/useUserNavigation';

const mockMessages: MessageData[] = [
  {
    id: '1',
    user: {
      username: 'emma_wilson',
      displayName: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    lastMessage: 'See you at the gym tomorrow! 💪',
    timeAgo: '2m',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    user: {
      username: 'mark_johnson',
      displayName: 'Mark Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    },
    lastMessage: 'Thanks for the recipe!',
    timeAgo: '10m',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    user: {
      username: 'chef_anna',
      displayName: 'Anna Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    lastMessage: 'Let’s collaborate on a new healthy dish!',
    timeAgo: '1h',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    user: {
      username: 'alex_chen',
      displayName: 'Alex Chen',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    lastMessage: 'Great workout today!',
    timeAgo: '3h',
    unreadCount: 0,
    isOnline: false,
  },
];

export default function Message() {
  const router = useRouter();
  const { navigateToProfile } = useUserNavigation();
  const [messages, setMessages] = useState<MessageData[]>(mockMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleMessagePress = (message: MessageData) => {
    // Navigate to chat detail
    router.push(`/(main)/messages/${message.user.username}`);
    // Mark as read
    setMessages(prev => prev.map(m => m.id === message.id ? { ...m, unreadCount: 0 } : m));
  };

  const handleUserPress = (username: string) => {
    navigateToProfile(username, { source: 'message' });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <MainLayout
      activeTab="messages"
      onTabPress={(tab: string) => console.log('Tab pressed:', tab)}
      headerProps={{
        variant: 'default',
        title: 'Messages',
        titleAlignLeft: true,
        rightButtons: [
          {
            icon: 'create-outline',
            onPress: () => Alert.alert('New Message', 'Start a new conversation!'),
          },
        ],
      }}
    >
      <View style={styles.container}>
        <MessageList
          messages={messages}
          onMessagePress={handleMessagePress}
          onUserPress={handleUserPress}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
}); 