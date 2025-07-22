import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import Badge from '@/components/elements/Badge';
import Button from '@/components/elements/Button';
import ConfirmModal from '@/components/elements/Modal/ConfirmModal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, sizing, radius } from '@/theme';
import { useUserNavigation } from '@/hooks/useUserNavigation';
import { useAuth } from '@/providers/AuthProvider';
import { logout as logoutService } from '@/services/auth.service';
const AVATAR_URL = 'https://randomuser.me/api/portraits/men/32.jpg';

export default function Setting() {
  const router = useRouter();
  const { navigateToOwnProfile } = useUserNavigation();
  const { logout } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Navigation handlers for setting pages
  const handleAccountSettings = () => {
    router.push('/(main)/setting/account');
  };

  const handleUserCardPress = () => {
    navigateToOwnProfile();
  };

  const handleSavedPosts = () => {
    router.push('/(main)/setting/saved-posts');
  };

  const handleAlbums = () => {
    router.push('/(main)/setting/albums');
  };

  const handleHelpCenter = () => {
    router.push('/(main)/setting/help');
  };

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setLogoutLoading(true);
      await logoutService();
      logout();
    } catch (error) {
      
      // Có thể hiển thị error toast ở đây nếu cần
    } finally {
      setLogoutLoading(false);
      setLogoutModalVisible(false);
    }
  };

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  };

  return (
    <MainLayout 
      activeTab="profile" 
      onTabPress={(tab) => console.log('Tab pressed:', tab)}
      headerProps={{
        variant: 'profile',
        title: 'Profile',
        titleAlignLeft: true,
        contentPadding: 20, // Same padding như scroll để align với khối bọc ngoài
        rightButtons: [
          {
            icon: 'settings-outline' as keyof typeof Ionicons.glyphMap,
            onPress: () => console.log('Settings pressed')
          },
          {
            icon: 'share-outline' as keyof typeof Ionicons.glyphMap,
            onPress: () => console.log('Share pressed')
          }
        ]
      }}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <TouchableOpacity style={styles.userCard} onPress={handleUserCardPress}>
          <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>Morsalin Nur</Text>
            <Text style={styles.userHandle}>@morsalin.nur</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.gray} />
        </TouchableOpacity>
        
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>572</Text>
            <Text style={styles.statLabel}>Post</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>6.3k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2.5k</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        
        {/* Settings List */}
        <View style={styles.section}>
          <SettingListItem
            leftIcon={<Ionicons name="person-circle-outline" size={24} color={colors.green} />}
            title="Account Settings"
            subtitle="Manage your account and privacy"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleAccountSettings}
          />
          <SettingListItem
            leftIcon={<Ionicons name="bookmark-outline" size={24} color={colors.green} />}
            title="Saved Posts"
            subtitle="Your saved posts and recipes"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleSavedPosts}
          />
          <SettingListItem
            leftIcon={<Ionicons name="images" size={24} color={colors.green} />}
            title="Albums"
            subtitle="Your saved photo collections"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleAlbums}
          />
          <SettingListItem
            leftIcon={<Ionicons name="help-circle-outline" size={24} color={colors.green} />}
            title="Help & Support"
            subtitle="Get help and contact support"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleHelpCenter}
          />
        </View>
        
        {/* Logout Button */}
        <Button
          text="Log out"
          backgroundColor={colors.lightGreen}
          textColor={colors.green}
          style={styles.logoutBtn}
          textWeight="bold"
          onPress={handleLogoutPress}
        />
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        visible={logoutModalVisible}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        loading={logoutLoading}
        
        // Logout specific props
        title="Log Out"
        subtitle="Are you sure you want to log out? You'll need to sign in again to access your account."
        icon="log-out-outline"
        iconColor={colors.red}
        iconBackgroundColor="#ffebee"
        
        // Button props
        confirmText="Log Out"
        cancelText="Cancel"
        confirmButtonStyle="danger"
        
        // Size
        size="medium"
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: colors.white,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.green,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackGray,
  },
  userHandle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackGray,
  },
  statLabel: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  logoutBtn: {
    width: '100%',
    borderRadius: 12,
    height: 48,
    marginTop: 16,
    backgroundColor: colors.lightGreen,
    alignSelf: 'center',
  },
}); 