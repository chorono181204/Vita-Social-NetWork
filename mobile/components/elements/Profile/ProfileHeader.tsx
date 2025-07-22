import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import Button from '@/components/elements/Button';

interface ProfileHeaderProps {
  userId: string;
  avatar: string;
  name: string;
  username: string;
  bio?: string;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  isVerified?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onEditProfile?: () => void;
  onEditAvatar?: () => void;
}

export default function ProfileHeader({
  userId,
  avatar,
  name,
  username,
  bio,
  isOwnProfile,
  isFollowing = false,
  isVerified = false,
  onFollow,
  onUnfollow,
  onEditProfile,
  onEditAvatar
}: ProfileHeaderProps) {

  const handleFollowPress = () => {
    if (isFollowing) {
      Alert.alert(
        'Unfollow',
        `Unfollow ${name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Unfollow', onPress: onUnfollow, style: 'destructive' }
        ]
      );
    } else {
      onFollow?.();
    }
  };

  const handleAvatarPress = () => {
    if (isOwnProfile) {
      onEditAvatar?.();
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleAvatarPress} disabled={!isOwnProfile}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          {isOwnProfile && (
            <View style={styles.editAvatarOverlay}>
              <Ionicons name="camera" size={20} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          {isVerified && (
            <Ionicons name="checkmark-circle" size={20} color={colors.blue} />
          )}
        </View>
        <Text style={styles.username}>@{username}</Text>
        {bio && <Text style={styles.bio}>{bio}</Text>}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {isOwnProfile ? (
          <Button
            text="Edit Profile"
            backgroundColor={colors.lightGreen}
            textColor={colors.green}
            style={styles.editButton}
            onPress={onEditProfile}
          />
        ) : (
          <>
            <Button
              text={isFollowing ? "Following" : "Follow"}
              backgroundColor={isFollowing ? colors.lightGray : colors.green}
              textColor={isFollowing ? colors.blackGray : colors.white}
              style={styles.followButton}
              onPress={handleFollowPress}
            />
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color={colors.blackGray} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.green,
  },
  editAvatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blackGray,
  },
  username: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: colors.blackGray,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  editButton: {
    flex: 1,
    maxWidth: 200,
    height: 36,
    borderRadius: 18,
  },
  followButton: {
    flex: 1,
    maxWidth: 140,
    height: 36,
    borderRadius: 18,
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 