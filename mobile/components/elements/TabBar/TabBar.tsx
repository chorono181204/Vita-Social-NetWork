import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  iconType?: 'ionicons' | 'material';
  route: string;
  label: string;
}

const tabs: TabItem[] = [
  {
    name: 'home',
    icon: 'home',
    iconType: 'ionicons',
    route: '/(main)/home',
    label: 'Home',
  },
  {
    name: 'messages',
    icon: 'mail',
    iconType: 'ionicons',
    route: '/(main)/messages',
    label: 'Messages',
  },
  {
    name: 'add',
    icon: 'add-circle',
    iconType: 'ionicons',
    route: '/(main)/post/create-post',
    label: 'Add',
  },
  {
    name: 'activity',
    icon: 'notifications',
    iconType: 'ionicons',
    route: '/(main)/notification',
    label: 'Notifications',
  },
  {
    name: 'profile',
    icon: 'person',
    iconType: 'ionicons',
    route: '/(main)/setting',
    label: 'Profile',
  },
];

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  const isActiveTab = (route: string) => {
    return pathname.includes(route.split('/').pop() || '');
  };

  // Smart Cross-Platform Safe Area Handling
  const getBottomPadding = () => {
    if (Platform.OS === 'ios') {
      // iOS: Handle Home Indicator elegantly
      if (insets.bottom > 0) {
        // iPhone with Home Indicator (X/11/12/13/14/15)
        return insets.bottom + 2; // Minimal extra padding above indicator
      } else {
        // iPhone 6/7/8 or iPad
        return 8; // Reduced bottom padding for lower height
      }
    } else {
      // Android: Detect navigation type
      if (insets.bottom > 20) {
        // 3-Button Navigation (~48dp)
        return insets.bottom + 4; // Reduced extra padding
      } else {
        // Gesture Navigation (~0dp)
        return Math.max(insets.bottom, 8); // Minimal padding for lower profile
      }
    }
  };

  const renderIcon = (tab: TabItem, isActive: boolean) => {
    const color = isActive ? colors.green : colors.gray;
    const size = 24; // Compact size for lower profile

    if (tab.iconType === 'material') {
      return (
        <MaterialIcons 
          name={tab.icon as keyof typeof MaterialIcons.glyphMap} 
          size={size} 
          color={color} 
        />
      );
    }

    return (
      <Ionicons 
        name={tab.icon as keyof typeof Ionicons.glyphMap} 
        size={size} 
        color={color} 
      />
    );
  };

  return (
    <View style={[styles.container, { 
      paddingBottom: getBottomPadding()
    }]}>
      {tabs.map((tab) => {
        const isActive = isActiveTab(tab.route);
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(tab.route)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {renderIcon(tab, isActive)}
              {isActive && <View style={styles.activeIndicator} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 8,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrayPurple,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.green,
  },
}); 