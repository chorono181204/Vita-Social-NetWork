import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { capitalizeEachWord } from '@/utils/format';

interface BasicInfoSectionProps {
  editInfo: any;
  isEditing: boolean;
  setEditInfo: (info: any) => void;
  showGenderModal: boolean;
  setShowGenderModal: (show: boolean) => void;
  showBirthdayPicker: boolean;
  setShowBirthdayPicker: (show: boolean) => void;
  showCookingLevelModal: boolean;
  setShowCookingLevelModal: (show: boolean) => void;
  styles: any;
}

export default function BasicInfoSection({
  editInfo,
  isEditing,
  setEditInfo,
  showGenderModal,
  setShowGenderModal,
  showBirthdayPicker,
  setShowBirthdayPicker,
  showCookingLevelModal,
  setShowCookingLevelModal,
  styles
}: BasicInfoSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderField = (label: string, value: string | undefined, key: string) => {
    if (!isEditing) {
      return <Text style={styles.infoValue}>{value}</Text>;
    }

    if (key === 'gender') {
      return (
        <TouchableOpacity onPress={() => setShowGenderModal(true)}>
          <Text style={styles.infoValue}>
            {value ? capitalizeEachWord(value.toLowerCase()) : 'Select gender'}
          </Text>
        </TouchableOpacity>
      );
    }

    if (key === 'cookingLevel') {
      return (
        <TouchableOpacity onPress={() => setShowCookingLevelModal(true)}>
          <Text style={styles.infoValue}>
            {value ? capitalizeEachWord(value.toLowerCase()) : 'Select level'}
          </Text>
        </TouchableOpacity>
      );
    }

    if (key === 'birthday') {
      return (
        <TouchableOpacity onPress={() => setShowBirthdayPicker(true)}>
          <Text style={styles.infoValue}>
            {value ? formatDate(value) : 'Select birthday'}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TextInput
        style={styles.infoValue}
        value={value || ''}
        onChangeText={text => setEditInfo({ ...editInfo, [key]: text })}
        placeholder={label}
        placeholderTextColor={colors.gray}
      />
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      
      {editInfo.location && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="location" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Location</Text>
            {renderField('Location', editInfo.location, 'location')}
          </View>
        </View>
      )}

      {editInfo.gender && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="person" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Gender</Text>
            {renderField('Gender', editInfo.gender, 'gender')}
          </View>
        </View>
      )}

      {editInfo.birthday && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="calendar" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Birthday</Text>
            {renderField('Birthday', editInfo.birthday, 'birthday')}
          </View>
        </View>
      )}

      {editInfo.cookingLevel && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="restaurant" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Cooking Level</Text>
            {renderField('Cooking Level', editInfo.cookingLevel, 'cookingLevel')}
          </View>
        </View>
      )}
    </View>
  );
} 