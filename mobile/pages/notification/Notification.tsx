import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import MainLayout from '@/components/layouts/Main/MainLayout';
import { 
  NotificationItem, 
  NotificationTabs, 
  NotificationEmpty,
  NotificationData,
  NotificationTabType 
} from '@/components/elements/Notification';
import { useUserNavigation } from '@/hooks/useUserNavigation';

// Mock notification data
const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'like',
    user: {
      username: 'fitness_lover',
      displayName: 'Mark Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    },
    content: 'liked your post',
    timeAgo: '2 minutes ago',
    isRead: false,
    postId: 'post_1',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100',
  },
  {
    id: '2',
    type: 'comment',
    user: {
      username: 'healthy_eats',
      displayName: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    content: 'commented on your post',
    timeAgo: '5 minutes ago',
    isRead: false,
    postId: 'post_1',
    commentId: 'comment_1',
  },
  {
    id: '3',
    type: 'follow',
    user: {
      username: 'nutrition_nerd',
      displayName: 'Dr. Sarah Kim',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    content: 'started following you',
    timeAgo: '10 minutes ago',
    isRead: false,
  },
  {
    id: '4',
    type: 'recipe',
    user: {
      username: 'chef_anna',
      displayName: 'Anna Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    content: 'shared a new recipe',
    timeAgo: '1 hour ago',
    isRead: true,
    recipeId: 'recipe_1',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=100',
  },
  {
    id: '5',
    type: 'mention',
    user: {
      username: 'workout_warrior',
      displayName: 'Jake Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
    },
    content: 'mentioned you in a comment',
    timeAgo: '2 hours ago',
    isRead: true,
    postId: 'post_2',
    commentId: 'comment_2',
  },
  {
    id: '6',
    type: 'like',
    user: {
      username: 'prep_master',
      displayName: 'Alex Chen',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    content: 'liked your recipe',
    timeAgo: '3 hours ago',
    isRead: true,
    recipeId: 'recipe_2',
  },
  {
    id: '7',
    type: 'system',
    user: {
      username: 'system',
      displayName: 'HealthApp',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    content: 'Welcome to HealthApp! Start sharing your healthy recipes and connect with other food lovers.',
    timeAgo: '1 day ago',
    isRead: true,
  },
];

const notificationTabs = [
  { id: 'all' as NotificationTabType, label: 'All', count: 7 },
  { id: 'mentions' as NotificationTabType, label: 'Mentions', count: 1 },
  { id: 'follows' as NotificationTabType, label: 'Follows', count: 1 },
  { id: 'likes' as NotificationTabType, label: 'Likes', count: 2 },
  { id: 'comments' as NotificationTabType, label: 'Comments', count: 1 },
  { id: 'recipes' as NotificationTabType, label: 'Recipes', count: 1 },
];

export default function Notification() {
  const router = useRouter();
  const { navigateToProfile } = useUserNavigation();
  const [notifications, setNotifications] = useState<NotificationData[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<NotificationTabType>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') {
      return notifications;
    }
    
    return notifications.filter(notification => {
      switch (activeTab) {
        case 'mentions':
          return notification.type === 'mention';
        case 'follows':
          return notification.type === 'follow';
        case 'likes':
          return notification.type === 'like';
        case 'comments':
          return notification.type === 'comment';
        case 'recipes':
          return notification.type === 'recipe';
        default:
          return true;
      }
    });
  }, [notifications, activeTab]);

  // Update tab counts
  const updatedTabs = useMemo(() => {
    return notificationTabs.map(tab => {
      if (tab.id === 'all') {
        return { ...tab, count: notifications.filter(n => !n.isRead).length };
      }
      
      const count = notifications.filter(notification => {
        switch (tab.id) {
          case 'mentions':
            return notification.type === 'mention' && !notification.isRead;
          case 'follows':
            return notification.type === 'follow' && !notification.isRead;
          case 'likes':
            return notification.type === 'like' && !notification.isRead;
          case 'comments':
            return notification.type === 'comment' && !notification.isRead;
          case 'recipes':
            return notification.type === 'recipe' && !notification.isRead;
          default:
            return false;
        }
      }).length;
      
      return { ...tab, count: count > 0 ? count : undefined };
    });
  }, [notifications]);

  const handleTabPress = (tabId: NotificationTabType) => {
    setActiveTab(tabId);
  };

  const handleNotificationPress = (notification: NotificationData) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Navigate based on notification type
    if (notification.type === 'system') {
      Alert.alert('System Notification', notification.content);
      return;
    }

    if (notification.postId) {
      // Navigate to post (in real app, this would go to the specific post)
      console.log('Navigate to post:', notification.postId);
      Alert.alert('Navigate to Post', `Would navigate to post ${notification.postId}`);
    } else if (notification.recipeId) {
      // Navigate to recipe
      console.log('Navigate to recipe:', notification.recipeId);
      Alert.alert('Navigate to Recipe', `Would navigate to recipe ${notification.recipeId}`);
    }
  };

  const handleUserPress = (username: string) => {
    navigateToProfile(username, { source: 'notification' });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderNotification = ({ item }: { item: NotificationData }) => (
    <NotificationItem
      notification={item}
      onPress={handleNotificationPress}
      onUserPress={handleUserPress}
    />
  );

  const renderEmpty = () => (
    <NotificationEmpty type={activeTab} />
  );

  return (
    <MainLayout 
      activeTab="activity" 
      onTabPress={(tab: string) => console.log('Tab pressed:', tab)}
      headerProps={{
        variant: 'default',
        title: 'Notifications',
        titleAlignLeft: true,
        rightButtons: [
          {
            icon: 'checkmark-done',
            onPress: () => {
              setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
              Alert.alert('Marked as Read', 'All notifications marked as read');
            }
          }
        ]
      }}
    >
      <View style={styles.container}>
        <NotificationTabs
          tabs={updatedTabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
        
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.gray}
            />
          }
          ListEmptyComponent={renderEmpty}
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
  list: {
    flex: 1,
  },
}); 