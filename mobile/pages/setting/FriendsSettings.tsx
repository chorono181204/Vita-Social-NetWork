import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isOnline: boolean;
  mutualFriends: number;
  isBlocked?: boolean;
}

export default function FriendsSettings() {
  const [allowFriendRequests, setAllowFriendRequests] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowInvites, setAllowInvites] = useState(true);

  // Mock friends data
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      username: 'chef_gordon',
      displayName: 'Gordon Ramsay',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      isOnline: true,
      mutualFriends: 12,
    },
    {
      id: '2',
      username: 'pasta_lover',
      displayName: 'Maria Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      isOnline: false,
      mutualFriends: 5,
    },
    {
      id: '3',
      username: 'healthy_chef',
      displayName: 'Alex Kim',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      isOnline: true,
      mutualFriends: 8,
    },
  ]);

  const [pendingRequests] = useState([
    {
      id: '4',
      username: 'baking_queen',
      displayName: 'Emma Watson',
      avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
      mutualFriends: 3,
    },
    {
      id: '5',
      username: 'vegan_life',
      displayName: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
      mutualFriends: 1,
    },
  ]);

  const handleUnfriend = (friendId: string, friendName: string) => {
    Alert.alert(
      'Unfriend',
      `Are you sure you want to unfriend ${friendName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unfriend',
          style: 'destructive',
          onPress: () => console.log(`Unfriended ${friendId}`)
        }
      ]
    );
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log(`Accepted friend request: ${requestId}`);
    Alert.alert('Friend Request', 'Friend request accepted!');
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log(`Declined friend request: ${requestId}`);
    Alert.alert('Friend Request', 'Friend request declined');
  };

  const FriendItem = ({ friend }: { friend: Friend }) => (
    <View style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: friend.avatar }} style={styles.avatar} />
          {friend.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{friend.displayName}</Text>
          <Text style={styles.friendUsername}>@{friend.username}</Text>
          <Text style={styles.mutualFriends}>{friend.mutualFriends} mutual friends</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.unfriendButton}
        onPress={() => handleUnfriend(friend.id, friend.displayName)}
      >
        <Ionicons name="person-remove-outline" size={20} color={colors.red} />
      </TouchableOpacity>
    </View>
  );

  const PendingRequestItem = ({ request }: { request: any }) => (
    <View style={styles.requestItem}>
      <View style={styles.friendInfo}>
        <Image source={{ uri: request.avatar }} style={styles.avatar} />
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{request.displayName}</Text>
          <Text style={styles.friendUsername}>@{request.username}</Text>
          <Text style={styles.mutualFriends}>{request.mutualFriends} mutual friends</Text>
        </View>
      </View>
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => handleAcceptRequest(request.id)}
        >
          <Ionicons name="checkmark" size={16} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => handleDeclineRequest(request.id)}
        >
          <Ionicons name="close" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MainLayout 
      activeTab="profile"
      headerProps={{
        variant: 'default',
        title: 'Friends',
        showBackButton: true,
        onBackPress: () => console.log('Back pressed'),
        rightButton: {
          icon: 'person-add-outline',
          onPress: () => console.log('Add friend pressed')
        }
      }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Friend Requests */}
        {pendingRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Friend Requests ({pendingRequests.length})</Text>
            {pendingRequests.map((request) => (
              <PendingRequestItem key={request.id} request={request} />
            ))}
          </View>
        )}

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="person-add-outline" size={24} color={colors.green} />}
            title="Allow Friend Requests"
            subtitle="Anyone can send you friend requests"
          >
            <Switch
              value={allowFriendRequests}
              onValueChange={setAllowFriendRequests}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={allowFriendRequests ? colors.green : colors.gray}
            />
          </SettingListItem>
          
          <SettingListItem
            leftIcon={<Ionicons name="radio-outline" size={24} color={colors.green} />}
            title="Show Online Status"
            subtitle="Let friends see when you're active"
          >
            <Switch
              value={showOnlineStatus}
              onValueChange={setShowOnlineStatus}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={showOnlineStatus ? colors.green : colors.gray}
            />
          </SettingListItem>
          
          <SettingListItem
            leftIcon={<Ionicons name="mail-outline" size={24} color={colors.green} />}
            title="Allow Invites"
            subtitle="Let friends invite you to events"
          >
            <Switch
              value={allowInvites}
              onValueChange={setAllowInvites}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={allowInvites ? colors.green : colors.gray}
            />
          </SettingListItem>
        </View>

        {/* Friend Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Friends</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="search-outline" size={24} color={colors.green} />}
            title="Find Friends"
            subtitle="Search for people you know"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Find friends')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="eye-off-outline" size={24} color={colors.orange} />}
            title="Blocked Users"
            subtitle="Manage blocked accounts"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Blocked users')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="sync-outline" size={24} color={colors.green} />}
            title="Sync Contacts"
            subtitle="Find friends from your contacts"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Sync contacts')}
          />
        </View>

        {/* Friends List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Friends ({friends.length})</Text>
            <TouchableOpacity onPress={() => console.log('View all friends')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {friends.slice(0, 3).map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
          
          {friends.length > 3 && (
            <TouchableOpacity style={styles.showMoreButton} onPress={() => console.log('Show more friends')}>
              <Text style={styles.showMoreText}>Show {friends.length - 3} more friends</Text>
              <Ionicons name="chevron-down" size={16} color={colors.green} />
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '500',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.white,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
  },
  friendUsername: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  mutualFriends: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  unfriendButton: {
    padding: spacing.sm,
  },
  requestActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: colors.green,
  },
  declineButton: {
    backgroundColor: colors.red,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  showMoreText: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '500',
  },
}); 