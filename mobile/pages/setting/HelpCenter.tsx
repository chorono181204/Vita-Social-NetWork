import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

export default function HelpCenter() {
  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact us?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: () => Linking.openURL('mailto:support@example.com') },
        { text: 'Live Chat', onPress: () => console.log('Open live chat') }
      ]
    );
  };

  const handleReportBug = () => {
    Alert.alert('Report Bug', 'Bug report functionality will be implemented');
  };

  const handleFeedback = () => {
    Alert.alert('Send Feedback', 'Feedback form will be implemented');
  };

  const handleRateApp = () => {
    Alert.alert(
      'Rate Our App',
      'Would you like to rate our app on the App Store?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Rate Now', onPress: () => console.log('Open app store rating') }
      ]
    );
  };

  const appVersion = '1.0.0';
  const buildNumber = '2024.1';

  return (
    <MainLayout 
      activeTab="profile"
      headerProps={{
        variant: 'default',
        title: 'Help & Support',
        showBackButton: true,
        onBackPress: () => console.log('Back pressed')
      }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Get Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Help</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="help-circle-outline" size={24} color={colors.green} />}
            title="FAQ"
            subtitle="Frequently asked questions"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open FAQ')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="book-outline" size={24} color={colors.green} />}
            title="User Guide"
            subtitle="Learn how to use the app"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open user guide')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="chatbubble-outline" size={24} color={colors.green} />}
            title="Contact Support"
            subtitle="Get help from our team"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleContactSupport}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="videocam-outline" size={24} color={colors.green} />}
            title="Video Tutorials"
            subtitle="Watch how-to videos"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open video tutorials')}
          />
        </View>

        {/* Community */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="people-circle-outline" size={24} color={colors.green} />}
            title="Community Forum"
            subtitle="Connect with other users"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open community forum')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="logo-discord" size={24} color={colors.green} />}
            title="Discord Server"
            subtitle="Join our Discord community"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open Discord invite')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="logo-twitter" size={24} color={colors.green} />}
            title="Follow Us"
            subtitle="Get updates on social media"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open social media links')}
          />
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="bug-outline" size={24} color={colors.orange} />}
            title="Report a Bug"
            subtitle="Help us improve the app"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleReportBug}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="bulb-outline" size={24} color={colors.blue} />}
            title="Suggest a Feature"
            subtitle="Share your ideas with us"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleFeedback}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="star-outline" size={24} color={colors.orange} />}
            title="Rate Our App"
            subtitle="Leave a review on the App Store"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleRateApp}
          />
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="document-text-outline" size={24} color={colors.green} />}
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open terms of service')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="shield-outline" size={24} color={colors.green} />}
            title="Privacy Policy"
            subtitle="How we protect your data"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open privacy policy')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="document-outline" size={24} color={colors.green} />}
            title="Licenses"
            subtitle="Open source licenses"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open licenses')}
          />
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="information-circle-outline" size={24} color={colors.green} />}
            title="App Version"
            subtitle={`Version ${appVersion} (${buildNumber})`}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="refresh-outline" size={24} color={colors.green} />}
            title="Check for Updates"
            subtitle="See if a new version is available"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => Alert.alert('Updates', 'You have the latest version')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="code-outline" size={24} color={colors.green} />}
            title="About"
            subtitle="Learn more about our app"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Open about page')}
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
}); 