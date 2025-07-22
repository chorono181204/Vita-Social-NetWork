import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing } from '@/theme';

export type NotificationTabType = 'all' | 'mentions' | 'follows' | 'likes' | 'comments' | 'recipes';

interface NotificationTab {
  id: NotificationTabType;
  label: string;
  count?: number;
}

interface NotificationTabsProps {
  tabs: NotificationTab[];
  activeTab: NotificationTabType;
  onTabPress: (tabId: NotificationTabType) => void;
}

export default function NotificationTabs({ 
  tabs, 
  activeTab, 
  onTabPress 
}: NotificationTabsProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
            {tab.count !== undefined && tab.count > 0 && (
              <View style={[
                styles.badge,
                activeTab === tab.id && styles.activeBadge
              ]}>
                <Text style={[
                  styles.badgeText,
                  activeTab === tab.id && styles.activeBadgeText
                ]}>
                  {tab.count > 99 ? '99+' : tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  activeTab: {
    backgroundColor: colors.green,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: spacing.xs,
    minWidth: 20,
    alignItems: 'center',
  },
  activeBadge: {
    backgroundColor: colors.white,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
  activeBadgeText: {
    color: colors.green,
  },
}); 