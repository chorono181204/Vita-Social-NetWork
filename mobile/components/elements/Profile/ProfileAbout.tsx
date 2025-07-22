import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { capitalizeEachWord } from '@/utils/format';
import MainLayout from '@/components/layouts/Main/MainLayout';

interface ProfileAboutProps {
  userInfo: {
    location?: string;
    bio?: string;
    joinDate?: string;
    website?: string;
    phone?: string;
    email?: string;
    birthday?: string;
    interests?: string[];
    cuisinePreferences?: string[];
    cookingLevel?: string;
    healthGoals?: string[];
    allergies?: string[];
    gender?: string;
  };
  isOwnProfile: boolean;
  onEditPress?: () => void;
}

export default function ProfileAbout({
  userInfo,
  isOwnProfile,
  onEditPress
}: ProfileAboutProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderInfoItem = (
    icon: keyof typeof Ionicons.glyphMap,
    label: string,
    value: string | undefined,
    isLink: boolean = false,
    customIcon?: React.ReactNode
  ) => {
    if (!value) return null;

    return (
      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          {customIcon ? customIcon : <Ionicons name={icon} size={20} color={colors.green} />}
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={[styles.infoValue, isLink && styles.linkText]}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  const renderInterests = () => {
    if (!userInfo.interests || userInfo.interests.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.tagsContainer}>
          {userInfo.interests.map((interest, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Edit Button */}
      {isOwnProfile && (
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Ionicons name="create-outline" size={20} color={colors.green} />
          <Text style={styles.editButtonText}>Edit Info</Text>
        </TouchableOpacity>
      )}

      {/* Bio Section */}
      {userInfo.bio && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{userInfo.bio}</Text>
        </View>
      )}

      {/* Basic Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Info</Text>
        {renderInfoItem('location-outline', 'Location', userInfo.location)}
        {renderInfoItem('person-outline', 'Gender', capitalizeEachWord(userInfo.gender?.toLowerCase().replace(/_/g, ' ') || ''), false,
          userInfo.gender === 'MALE' ? <Ionicons name="male" size={20} color={colors.blue} /> :
          userInfo.gender === 'FEMALE' ? <Ionicons name="female" size={20} color={colors.pink} /> :
          userInfo.gender === 'OTHER' ? <Ionicons name="transgender" size={20} color={colors.purple} /> : undefined
        )}
        {renderInfoItem('calendar-outline', 'Birthday', userInfo.birthday ? formatDate(userInfo.birthday) : undefined)}
        {renderInfoItem('time-outline', 'Joined', userInfo.joinDate ? formatDate(userInfo.joinDate) : undefined)}
        {renderInfoItem('flame-outline', 'Cooking Level', capitalizeEachWord(userInfo.cookingLevel?.toLowerCase().replace(/_/g, ' ') || ''), false,
          userInfo.cookingLevel === 'BEGINNER' ? <Ionicons name="leaf" size={20} color={colors.green} /> :
          userInfo.cookingLevel === 'INTERMEDIATE' ? <Ionicons name="trending-up" size={20} color={colors.orange} /> :
          userInfo.cookingLevel === 'ADVANCED' ? <Ionicons name="star" size={20} color={'#FFD700'} /> :
          userInfo.cookingLevel === 'EXPERT' ? <Ionicons name="trophy" size={20} color={colors.red} /> : undefined
        )}
      </View>

      {/* Cuisine Preferences */}
      {userInfo.cuisinePreferences && userInfo.cuisinePreferences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuisine Preferences</Text>
          <View style={styles.tagsContainer}>
            {userInfo.cuisinePreferences.map((cuisine, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{cuisine}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Health Goals */}
      {userInfo.healthGoals && userInfo.healthGoals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Goals</Text>
          <View style={styles.tagsContainer}>
            {userInfo.healthGoals.map((goal, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Allergies */}
      {userInfo.allergies && userInfo.allergies.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergies</Text>
          <View style={styles.tagsContainer}>
            {userInfo.allergies.map((allergy, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{allergy}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Contact Info */}
      {(userInfo.email || userInfo.phone || userInfo.website) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          {renderInfoItem('mail-outline', 'Email', userInfo.email, true)}
          {renderInfoItem('call-outline', 'Phone', userInfo.phone, true)}
          {renderInfoItem('globe-outline', 'Website', userInfo.website, true)}
        </View>
      )}

      {/* Interests */}
      {renderInterests()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.lightGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.green,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackGray,
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    color: colors.blackGray,
    lineHeight: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.blackGray,
    fontWeight: '500',
  },
  linkText: {
    color: colors.green,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '500',
  },
  languageTag: {
    backgroundColor: colors.lightGray,
  },
  languageTagText: {
    color: colors.blackGray,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingVertical: 8,
  },
  goalText: {
    fontSize: 16,
    color: colors.blackGray,
  },
}); 