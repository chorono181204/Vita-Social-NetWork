import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

export default function ThemeSettings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoPlayVideos, setAutoPlayVideos] = useState(true);
  const [showPreviewImages, setShowPreviewImages] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const themeOptions = [
    { id: 'light', name: 'Light', icon: 'sunny-outline' },
    { id: 'dark', name: 'Dark', icon: 'moon-outline' },
    { id: 'auto', name: 'System', icon: 'phone-portrait-outline' }
  ];

  const [selectedTheme, setSelectedTheme] = useState('light');

  return (
    <MainLayout 
      activeTab="profile"
      headerProps={{
        variant: 'default',
        title: 'Display & Theme',
        showBackButton: true,
        onBackPress: () => console.log('Back pressed')
      }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          
          {themeOptions.map((theme) => (
            <SettingListItem
              key={theme.id}
              leftIcon={<Ionicons name={theme.icon as any} size={24} color={colors.green} />}
              title={theme.name}
              onPress={() => setSelectedTheme(theme.id)}
            >
              <View style={[
                styles.radioButton, 
                selectedTheme === theme.id && styles.radioButtonSelected
              ]}>
                {selectedTheme === theme.id && <View style={styles.radioButtonInner} />}
              </View>
            </SettingListItem>
          ))}
        </View>

        {/* Display Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="text-outline" size={24} color={colors.green} />}
            title="Font Size"
            subtitle="Medium"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Font size settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="image-outline" size={24} color={colors.green} />}
            title="Show Preview Images"
            subtitle="Display image previews in feed"
          >
            <Switch
              value={showPreviewImages}
              onValueChange={setShowPreviewImages}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={showPreviewImages ? colors.green : colors.gray}
            />
          </SettingListItem>
          
          <SettingListItem
            leftIcon={<Ionicons name="play-circle-outline" size={24} color={colors.green} />}
            title="Auto-play Videos"
            subtitle="Videos play automatically in feed"
          >
            <Switch
              value={autoPlayVideos}
              onValueChange={setAutoPlayVideos}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={autoPlayVideos ? colors.green : colors.gray}
            />
          </SettingListItem>
        </View>

        {/* Accessibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="accessibility-outline" size={24} color={colors.green} />}
            title="Reduce Motion"
            subtitle="Minimize animations and effects"
          >
            <Switch
              value={reducedMotion}
              onValueChange={setReducedMotion}
              trackColor={{ false: colors.lightGray, true: colors.lightGreen }}
              thumbColor={reducedMotion ? colors.green : colors.gray}
            />
          </SettingListItem>
          
          <SettingListItem
            leftIcon={<Ionicons name="contrast-outline" size={24} color={colors.green} />}
            title="High Contrast"
            subtitle="Increase color contrast"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('High contrast settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="volume-high-outline" size={24} color={colors.green} />}
            title="Sound Effects"
            subtitle="Play sounds for interactions"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Sound settings')}
          />
        </View>

        {/* Language & Region */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language & Region</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="language-outline" size={24} color={colors.green} />}
            title="Language"
            subtitle="English (US)"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Language settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="location-outline" size={24} color={colors.green} />}
            title="Region"
            subtitle="United States"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Region settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="time-outline" size={24} color={colors.green} />}
            title="Date & Time Format"
            subtitle="12-hour clock"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Date format settings')}
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
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  radioButtonSelected: {
    borderColor: colors.green,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.green,
  },
}); 