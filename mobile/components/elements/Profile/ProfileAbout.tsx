import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { capitalizeEachWord } from '@/utils/format';
import Button from '@/components/elements/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import BasicInfoSection from '@/components/elements/Profile/BasicInfoSection';
import TagSection from '@/components/elements/Profile/TagSection';
import ContactInfoSection from '@/components/elements/Profile/ContactInfoSection';
import BioSection from '@/components/elements/Profile/BioSection';
import ModalsSection from '@/components/elements/Profile/ModalsSection';
import { updateUserProfile, UpdateUserData } from '@/services/user.service';

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
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function ProfileAbout({
  userInfo,
  isOwnProfile,
  onEditPress,
  isEditing = false,
  onSave,
  onCancel
}: ProfileAboutProps) {
  const [editInfo, setEditInfo] = useState<ProfileAboutProps['userInfo']>(userInfo);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showCookingLevelModal, setShowCookingLevelModal] = useState(false);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [cuisineTagInput, setCuisineTagInput] = useState('');
  const [healthTagInput, setHealthTagInput] = useState('');
  const [allergyTagInput, setAllergyTagInput] = useState('');
  const [interestTagInput, setInterestTagInput] = useState('');
  const [bio, setBio] = useState(editInfo.bio || '');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSave = async () => {
    try {
      const updateData: UpdateUserData = {
        bio: bio,
        location: editInfo.location,
        website: editInfo.website,
        phone: editInfo.phone,
        dateOfBirth: editInfo.birthday ? new Date(editInfo.birthday) : undefined,
        gender: editInfo.gender as any,
        dietaryPreferences: editInfo.interests,
        cuisinePreferences: editInfo.cuisinePreferences,
        cookingLevel: editInfo.cookingLevel as any,
        healthGoals: editInfo.healthGoals,
        allergies: editInfo.allergies,
      };

      await updateUserProfile(updateData);
      setEditInfo(prev => ({ ...prev, bio }));
      onSave?.();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAddTag = (key: keyof ProfileAboutProps['userInfo'], value: string) => {
    if (!value.trim()) return;
    setEditInfo(prev => ({
      ...prev,
      [key]: [...(prev[key] as string[] || []), value.trim()]
    }));
  };

  const handleRemoveTag = (key: keyof ProfileAboutProps['userInfo'], idx: number) => {
    setEditInfo(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).filter((_, i) => i !== idx)
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <BioSection
        bio={bio}
        isEditing={isEditing}
        setBio={setBio}
        styles={styles}
      />
      
      <BasicInfoSection
        editInfo={editInfo}
        isEditing={isEditing}
        setEditInfo={setEditInfo}
        showGenderModal={showGenderModal}
        setShowGenderModal={setShowGenderModal}
        showBirthdayPicker={showBirthdayPicker}
        setShowBirthdayPicker={setShowBirthdayPicker}
        showCookingLevelModal={showCookingLevelModal}
        setShowCookingLevelModal={setShowCookingLevelModal}
        styles={styles}
      />
      
      {typeof editInfo.cuisinePreferences !== 'undefined' && (
        <TagSection
          title="Cuisine Preferences"
          tags={editInfo.cuisinePreferences}
          isEditing={isEditing}
          tagInput={cuisineTagInput}
          setTagInput={setCuisineTagInput}
          onAddTag={(val: string) => handleAddTag('cuisinePreferences', val)}
          onRemoveTag={(idx: number) => handleRemoveTag('cuisinePreferences', idx)}
          styles={styles}
        />
      )}
      
      {typeof editInfo.healthGoals !== 'undefined' && (
        <TagSection
          title="Health Goals"
          tags={editInfo.healthGoals}
          isEditing={isEditing}
          tagInput={healthTagInput}
          setTagInput={setHealthTagInput}
          onAddTag={(val: string) => handleAddTag('healthGoals', val)}
          onRemoveTag={(idx: number) => handleRemoveTag('healthGoals', idx)}
          styles={styles}
        />
      )}
      
      {typeof editInfo.allergies !== 'undefined' && (
        <TagSection
          title="Allergies"
          tags={editInfo.allergies}
          isEditing={isEditing}
          tagInput={allergyTagInput}
          setTagInput={setAllergyTagInput}
          onAddTag={(val: string) => handleAddTag('allergies', val)}
          onRemoveTag={(idx: number) => handleRemoveTag('allergies', idx)}
          styles={styles}
        />
      )}
      
      {typeof editInfo.interests !== 'undefined' && (
        <TagSection
          title="Interests"
          tags={editInfo.interests}
          isEditing={isEditing}
          tagInput={interestTagInput}
          setTagInput={setInterestTagInput}
          onAddTag={(val: string) => handleAddTag('interests', val)}
          onRemoveTag={(idx: number) => handleRemoveTag('interests', idx)}
          styles={styles}
        />
      )}
      
      {(editInfo.email || editInfo.phone || editInfo.website) && (
        <ContactInfoSection
          editInfo={editInfo}
          isEditing={isEditing}
          setEditInfo={setEditInfo}
          styles={styles}
        />
      )}
      
      {isEditing && (
        <View style={styles.actionButtons}>
          <Button
            text="Save"
            backgroundColor={colors.green}
            textColor={colors.white}
            style={styles.actionButton}
            onPress={handleSave}
          />
          <Button
            text="Cancel"
            backgroundColor={colors.lightGray}
            textColor={colors.gray}
            style={styles.actionButton}
            onPress={onCancel}
          />
        </View>
      )}
      
      <ModalsSection
        showGenderModal={showGenderModal}
        setShowGenderModal={setShowGenderModal}
        showCookingLevelModal={showCookingLevelModal}
        setShowCookingLevelModal={setShowCookingLevelModal}
        editInfo={editInfo}
        setEditInfo={setEditInfo}
        styles={styles}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    margin: 20,
  },
  actionButton: {
    flex: 1,
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
  input: {
    fontSize: 16,
    color: colors.blackGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 4,
  },
  selectField: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 8,
  },
  tagsEditContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  tagInput: {
    minWidth: 60,
    fontSize: 14,
    color: colors.green,
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
}); 