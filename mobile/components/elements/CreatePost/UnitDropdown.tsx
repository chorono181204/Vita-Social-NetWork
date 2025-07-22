import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';
import { STRINGS, Unit } from '@/constants/strings';

interface UnitDropdownProps {
  selectedUnit: Unit;
  onUnitChange: (unit: Unit) => void;
}

const UNITS: Unit[] = ['GRAMS', 'KILOGRAMS', 'MILLILITERS', 'LITERS', 'TABLESPOONS', 'TEASPOONS', 'CUPS', 'PIECES', 'SLICES'];

export default function UnitDropdown({ selectedUnit, onUnitChange }: UnitDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUnitSelect = (unit: Unit) => {
    onUnitChange(unit);
    setIsOpen(false);
  };

  const renderUnitItem = ({ item }: { item: Unit }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        selectedUnit === item && styles.selectedItem
      ]}
      onPress={() => handleUnitSelect(item)}
    >
      <Text style={[
        styles.dropdownItemText,
        selectedUnit === item && styles.selectedItemText
      ]}>
        {STRINGS.UNITS[item]}
      </Text>
      {selectedUnit === item && (
        <Ionicons name="checkmark" size={16} color={colors.green} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.dropdownButtonText}>{STRINGS.UNITS[selectedUnit]}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.gray} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdown}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>{STRINGS.RECIPE.SELECT_UNIT}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsOpen(false)}
              >
                <Ionicons name="close" size={20} color={colors.gray} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={UNITS}
              renderItem={renderUnitItem}
              keyExtractor={(item) => item}
              style={styles.dropdownList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    minHeight: 40,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: colors.blackGray,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    width: '80%',
    maxHeight: '60%',
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
  },
  closeButton: {
    padding: 4,
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  selectedItem: {
    backgroundColor: colors.lightGreen,
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.blackGray,
    flex: 1,
  },
  selectedItemText: {
    fontWeight: '600',
    color: colors.green,
  },
}); 