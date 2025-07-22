import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Header, { DynamicHeaderProps } from '@/components/elements/Header/Header';
import TabBar from '@/components/elements/TabBar/TabBar';
import Loading from '@/components/elements/Loading/Loading';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabPress?: (tab: string) => void;
  headerProps?: DynamicHeaderProps;
  loading?: boolean;
}

export default function MainLayout({ children, activeTab, onTabPress, headerProps, loading }: MainLayoutProps) {
  const showHeader = headerProps?.variant === 'profile' || headerProps?.variant === 'center-logo' || headerProps;
  const insets = useSafeAreaInsets();
  
  // Smart TabBar height calculation (match TabBar logic exactly)
  const getTabBarHeight = () => {
    const topPadding = 8; // paddingTop (reduced)
    const contentHeight = 32 + 12; // icon container (32) + paddingVertical (6*2) = 44
    
    // Must match TabBar component logic exactly
    if (Platform.OS === 'ios') {
      // iOS: Handle Home Indicator elegantly
      if (insets.bottom > 0) {
        // iPhone with Home Indicator
        return topPadding + contentHeight + (insets.bottom + 2);
      } else {
        // iPhone 6/7/8 or iPad
        return topPadding + contentHeight + 8;
      }
    } else {
      // Android: Detect navigation type
      if (insets.bottom > 20) {
        // 3-Button Navigation
        return topPadding + contentHeight + (insets.bottom + 4);
      } else {
        // Gesture Navigation
        return topPadding + contentHeight + Math.max(insets.bottom, 8);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      {showHeader ? (
        <Header 
          {...headerProps}
        />
      ) : null}
      <View style={[styles.content, { paddingBottom: getTabBarHeight() }]}>
        {children}
        {loading && <Loading />}
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
