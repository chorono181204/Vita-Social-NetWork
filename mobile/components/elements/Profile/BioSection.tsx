import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface BioSectionProps {
  bio: string;
  isEditing: boolean;
  setBio: (bio: string) => void;
  styles: any;
}

export default function BioSection({ bio, isEditing, setBio, styles }: BioSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>
      {isEditing ? (
        <TextInput
          style={styles.infoValue}
          value={bio || ''}
          onChangeText={setBio}
          placeholder="About"
          placeholderTextColor={styles.infoLabel.color || '#6B7280'}
          multiline
        />
      ) : (
        <Text style={styles.infoValue}>{bio}</Text>
      )}
    </View>
  );
} 