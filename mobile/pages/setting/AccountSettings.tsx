import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import Button from '@/components/elements/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

export default function AccountSettings() {
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [allowTagging, setAllowTagging] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const handleChangeEmail = () => {
    Alert.alert('Change Email', 'Email change functionality will be implemented');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality will be implemented');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') }
      ]
    );
  };

  return (
    <MainLayout 
      activeTab="profile"
      headerProps={{
        variant: 'default',
        title: 'Account Settings',
        showBackButton: true,
        onBackPress: () => console.log('Back pressed')
      }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="mail-outline" size={24} color={colors.green} />}
            title="Email Address"
            subtitle="morsalin.nur@example.com"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleChangeEmail}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="lock-closed-outline" size={24} color={colors.green} />}
            title="Password"
            subtitle="Change your password"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleChangePassword}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="person-outline" size={24} color={colors.green} />}
            title="Username"
            subtitle="@morsalin.nur"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => Alert.alert('Username', 'Username change functionality will be implemented')}
          />
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="eye-off-outline" size={24} color={colors.green} />}
            title="Private Account"
            subtitle="Only followers can see your posts"
          >
            <Switch
              value={isPrivateAccount}
              onValueChange={setIsPrivateAccount}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={isPrivateAccount ? colors.green : colors.gray}
            />
          </SettingListItem>
          
          <SettingListItem
            leftIcon={<Ionicons name="pricetag-outline" size={24} color={colors.green} />}
            title="Allow Tagging"
            subtitle="Let others tag you in posts"
          >
            <Switch
              value={allowTagging}
              onValueChange={setAllowTagging}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={allowTagging ? colors.green : colors.gray}
            />
          </SettingListItem>
          
          <SettingListItem
            leftIcon={<Ionicons name="radio-outline" size={24} color={colors.green} />}
            title="Show Online Status"
            subtitle="Let others see when you're active"
          >
            <Switch
              value={showOnlineStatus}
              onValueChange={setShowOnlineStatus}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={showOnlineStatus ? colors.green : colors.gray}
            />
          </SettingListItem>
        </View>

        {/* Data & Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Storage</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="download-outline" size={24} color={colors.green} />}
            title="Download Your Data"
            subtitle="Get a copy of your information"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => Alert.alert('Download Data', 'Data download will start shortly')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="trash-outline" size={24} color={colors.red} />}
            title="Clear Cache"
            subtitle="Free up storage space"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => Alert.alert('Clear Cache', 'Cache cleared successfully')}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.red }]}>Danger Zone</Text>
          
          <Button
            text="Delete Account"
            backgroundColor={colors.lightRed || '#ffebee'}
            textColor={colors.red}
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          />
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
  deleteButton: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    borderRadius: 12,
    height: 48,
  },
}); 