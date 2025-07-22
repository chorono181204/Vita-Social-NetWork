import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface Tab {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  count?: number;
}

interface ProfileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ProfileTabs({
  tabs,
  activeTab,
  onTabChange
}: ProfileTabsProps) {

  const renderTab = (tab: Tab) => {
    const isActive = tab.id === activeTab;
    
    return (
      <TouchableOpacity
        key={tab.id}
        style={[
          styles.tab,
          isActive && styles.activeTab
        ]}
        onPress={() => onTabChange(tab.id)}
      >
        <View style={styles.tabContent}>
          {tab.icon && (
            <Ionicons
              name={tab.icon}
              size={18}
              color={isActive ? colors.green : colors.gray}
            />
          )}
          <Text style={[
            styles.tabLabel,
            isActive && styles.activeTabLabel
          ]}>
            {tab.label}
          </Text>
          {tab.count !== undefined && (
            <View style={[
              styles.countBadge,
              isActive && styles.activeCountBadge
            ]}>
              <Text style={[
                styles.countText,
                isActive && styles.activeCountText
              ]}>
                {tab.count}
              </Text>
            </View>
          )}
        </View>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map(renderTab)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tabsContainer: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    position: 'relative',
  },
  activeTab: {
    // Active tab styles handled by indicator
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabLabel: {
    color: colors.green,
    fontWeight: '600',
  },
  countBadge: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  activeCountBadge: {
    backgroundColor: colors.lightGreen,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray,
  },
  activeCountText: {
    color: colors.green,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.green,
    borderRadius: 1,
  },
}); 