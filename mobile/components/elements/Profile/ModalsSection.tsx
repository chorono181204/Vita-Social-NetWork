import React from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectModal from '@/components/elements/Modal/SelectModal';

interface ModalsSectionProps {
  showGenderModal: boolean;
  setShowGenderModal: (show: boolean) => void;
  showCookingLevelModal: boolean;
  setShowCookingLevelModal: (show: boolean) => void;
  editInfo: any;
  setEditInfo: (info: any) => void;
  styles: any;
}

export default function ModalsSection({
  showGenderModal,
  setShowGenderModal,
  showCookingLevelModal,
  setShowCookingLevelModal,
  editInfo,
  setEditInfo
}: ModalsSectionProps) {
  const genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];

  const cookingLevelOptions = [
    { label: 'Beginner', value: 'BEGINNER' },
    { label: 'Intermediate', value: 'INTERMEDIATE' },
    { label: 'Advanced', value: 'ADVANCED' },
    { label: 'Expert', value: 'EXPERT' },
  ];

  return (
    <View>
      <SelectModal
        visible={showGenderModal}
        title="Select Gender"
        options={genderOptions}
        selectedValue={editInfo.gender}
        onSelect={(value) => {
          setEditInfo({ ...editInfo, gender: value });
          setShowGenderModal(false);
        }}
        onCancel={() => setShowGenderModal(false)}
      />

      <SelectModal
        visible={showCookingLevelModal}
        title="Select Cooking Level"
        options={cookingLevelOptions}
        selectedValue={editInfo.cookingLevel}
        onSelect={(value) => {
          setEditInfo({ ...editInfo, cookingLevel: value });
          setShowCookingLevelModal(false);
        }}
        onCancel={() => setShowCookingLevelModal(false)}
      />
    </View>
  );
} 