import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { colors } from '@/theme';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectModalProps {
  visible: boolean;
  title?: string;
  options: SelectOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onCancel: () => void;
}

export default function SelectModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onCancel
}: SelectModalProps) {
  const renderOption = ({ item }: { item: SelectOption }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedValue === item.value && styles.selectedOption
      ]}
      onPress={() => onSelect(item.value)}
    >
      <Text style={[
        styles.optionText,
        selectedValue === item.value && styles.selectedOptionText
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {title && (
            <Text style={styles.title}>{title}</Text>
          )}
          
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={renderOption}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsList}
          />
          
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackGray,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsList: {
    paddingBottom: 10,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  optionText: {
    fontSize: 16,
    color: colors.green,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  cancelButtonText: {
    color: colors.gray,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
