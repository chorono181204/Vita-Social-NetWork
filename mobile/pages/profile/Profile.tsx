import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/theme';
import Header from '@/components/elements/Header';
import { 
  ProfileHeader, 
  ProfileStats, 
  ProfileTabs, 
  ProfileAbout,
  ProfileFeed 
} from '@/components/elements/Profile';
import { PostData } from '@/components/elements/Post';
import { useUserNavigation } from '@/hooks/useUserNavigation';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '@/graphql/queries/auth';
import { getMe } from '@/services/auth.service';
import type { User } from '@/types/user';
import MainLayout from '@/components/layouts/Main/MainLayout';




interface ProfileProps {
  userId?: string; // undefined = own profile
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('posts');
  const loading = !user;

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  const profile = user?.profile;

  return (
    <MainLayout headerProps={{ title: 'Profile' }} loading={loading}>
      {user && (
        activeTab === 'posts' ? (
          <FlatList
            data={[]}
            renderItem={null}
            keyExtractor={() => ''}
            ListHeaderComponent={
              <>
                <ProfileHeader
                  userId={user.id}
                  avatar={profile?.avatar || ''}
                  name={profile?.displayName || user.username || ''}
                  username={user.username || ''}
                  bio={profile?.bio || ''}
                  isOwnProfile={true}
                />
                <ProfileStats
                  postsCount={profile?.postsCount || 0}
                  followersCount={profile?.followersCount || 0}
                  followingCount={profile?.followingCount || 0}
                />
                <ProfileTabs
                  tabs={[
                    { id: 'posts', label: 'Posts', icon: 'grid-outline', count: profile?.postsCount || 0 },
                    { id: 'about', label: 'About', icon: 'person-outline' }
                  ]}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </>
            }
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No posts yet</Text>}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <ProfileHeader
              userId={user.id}
              avatar={profile?.avatar || ''}
              name={profile?.displayName || user.username || ''}
              username={user.username || ''}
              bio={profile?.bio || ''}
              isOwnProfile={true}
            />
            <ProfileStats
              postsCount={profile?.postsCount || 0}
              followersCount={profile?.followersCount || 0}
              followingCount={profile?.followingCount || 0}
            />
            <ProfileTabs
              tabs={[
                { id: 'posts', label: 'Posts', icon: 'grid-outline', count: profile?.postsCount || 0 },
                { id: 'about', label: 'About', icon: 'person-outline' }
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <ProfileAbout
              userInfo={{
                location: profile?.location || '',
                bio: profile?.bio || '',
                website: profile?.website || '',
                phone: profile?.phone || '',
                email: user.email || '',
                birthday: profile?.dateOfBirth || '',
                joinDate: (user as any).createdAt || '',
                interests: profile?.dietaryPreferences || [],
                cuisinePreferences: profile?.cuisinePreferences || [],
                cookingLevel: profile?.cookingLevel || '',
                healthGoals: profile?.healthGoals || [],
                allergies: profile?.allergies || [],
                gender: profile?.gender || '',
              }}
              isOwnProfile={true}
            />
          </ScrollView>
        )
      )}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  aboutContainer: {
    flex: 1,
  },
}); 