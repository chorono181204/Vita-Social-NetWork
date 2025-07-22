import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/theme';

interface ProfileStatsProps {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  onPostsPress?: () => void;
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
}

export default function ProfileStats({
  postsCount,
  followersCount,
  followingCount,
  onPostsPress,
  onFollowersPress,
  onFollowingPress
}: ProfileStatsProps) {

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.statItem} 
        onPress={onPostsPress}
        disabled={!onPostsPress}
      >
        <Text style={styles.statNumber}>{formatCount(postsCount)}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity 
        style={styles.statItem} 
        onPress={onFollowersPress}
        disabled={!onFollowersPress}
      >
        <Text style={styles.statNumber}>{formatCount(followersCount)}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity 
        style={styles.statItem} 
        onPress={onFollowingPress}
        disabled={!onFollowingPress}
      >
        <Text style={styles.statNumber}>{formatCount(followingCount)}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackGray,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  separator: {
    width: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: 8,
  },
}); 