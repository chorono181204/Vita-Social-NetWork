import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

export interface SearchUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
  followersCount: number;
  specialization?: string;
  isFollowing?: boolean;
}

interface UserResultCardProps {
  user: SearchUser;
  onPress: () => void;
  onFollowPress?: () => void;
}

export default function UserResultCard({
  user,
  onPress,
  onFollowPress
}: UserResultCardProps) {
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clickableContent} onPress={onPress}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        
        <View style={styles.userInfo}>
          <View style={styles.userHeader}>
            <Text style={styles.displayName}>{user.displayName}</Text>
            {user.verified && (
              <Ionicons name="checkmark-circle" size={16} color={colors.blue} style={styles.verifiedIcon} />
            )}
          </View>
          
          <Text style={styles.username}>@{user.username}</Text>
          
          <View style={styles.userStats}>
            <Text style={styles.followersCount}>
              {formatFollowers(user.followersCount)} followers
            </Text>
            {user.specialization && (
              <>
                <Text style={styles.separator}> • </Text>
                <Text style={styles.specialization}>{user.specialization}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      {onFollowPress && (
        <TouchableOpacity 
          style={[styles.followButton, user.isFollowing && styles.followingButton]}
          onPress={onFollowPress}
        >
          <Text style={[styles.followText, user.isFollowing && styles.followingText]}>
            {user.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  clickableContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blackGray,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  username: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 6,
    fontWeight: '500',
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersCount: {
    fontSize: 13,
    color: colors.gray,
    fontWeight: '600',
  },
  separator: {
    fontSize: 13,
    color: colors.gray,
  },
  specialization: {
    fontSize: 13,
    color: colors.green,
    fontWeight: '600',
  },
  followButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.green,
    borderRadius: radius.md,
    minWidth: 90,
    alignItems: 'center',
    shadowColor: colors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  followingButton: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.gray,
    shadowColor: colors.gray,
    shadowOpacity: 0.1,
  },
  followText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  followingText: {
    color: colors.blackGray,
    fontWeight: '600',
  },
}); 