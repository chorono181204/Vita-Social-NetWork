import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface ContactInfoSectionProps {
  editInfo: any;
  isEditing: boolean;
  setEditInfo: (info: any) => void;
  styles: any;
}

export default function ContactInfoSection({
  editInfo,
  isEditing,
  setEditInfo,
  styles
}: ContactInfoSectionProps) {
  const renderField = (label: string, value: string | undefined, key: string) => {
    if (!isEditing) {
      return <Text style={styles.infoValue}>{value}</Text>;
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
      <Text style={styles.sectionTitle}>Contact Information</Text>
      
      {editInfo.email && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="mail" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            {renderField('Email', editInfo.email, 'email')}
          </View>
        </View>
      )}

      {editInfo.phone && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="call" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            {renderField('Phone', editInfo.phone, 'phone')}
          </View>
        </View>
      )}

      {editInfo.website && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="globe" size={20} color={colors.green} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Website</Text>
            {renderField('Website', editInfo.website, 'website')}
          </View>
        </View>
      )}
    </View>
  );
} 