import React from 'react';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DatePickerModalProps {
  visible: boolean;
  value: Date;
  title?: string;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

export default function DatePickerModal({
  visible,
  value,
  title,
  onConfirm,
  onCancel
}: DatePickerModalProps) {
  return (
    <DateTimePickerModal
      isVisible={visible}
      mode="date"
      date={value}
      onConfirm={onConfirm}
      onCancel={onCancel}
      display={Platform.OS === 'ios' ? 'inline' : 'default'}
      maximumDate={new Date()}
      minimumDate={new Date(1900, 0, 1)}
    />
  );
} 