import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'query' | 'user' | 'recipe' | 'tag';
  subtitle?: string;
  image?: string;
  verified?: boolean;
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  visible: boolean;
  onSuggestionPress: (suggestion: SearchSuggestion) => void;
  onClearSuggestions?: () => void;
}

export default function SearchSuggestions({
  suggestions,
  visible,
  onSuggestionPress,
  onClearSuggestions
}: SearchSuggestionsProps) {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'user':
        return 'person-outline';
      case 'recipe':
        return 'restaurant-outline';
      case 'tag':
        return 'pricetag-outline';
      default:
        return 'search-outline';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'user':
        return colors.blue;
      case 'recipe':
        return colors.green;
      case 'tag':
        return colors.orange;
      default:
        return colors.gray;
    }
  };

  const renderSuggestion = ({ item }: { item: SearchSuggestion }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => onSuggestionPress(item)}
    >
      <View style={styles.suggestionContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${getSuggestionColor(item.type)}15` }]}>
          <Ionicons 
            name={getSuggestionIcon(item.type) as any} 
            size={16} 
            color={getSuggestionColor(item.type)} 
          />
        </View>
        
        <View style={styles.textContainer}>
          <View style={styles.mainTextRow}>
            <Text style={styles.suggestionText} numberOfLines={1}>
              {item.text}
            </Text>
            {item.verified && (
              <Ionicons name="checkmark-circle" size={14} color={colors.blue} style={styles.verifiedIcon} />
            )}
          </View>
          {item.subtitle && (
            <Text style={styles.suggestionSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.insertButton}>
        <Ionicons name="arrow-up-outline" size={16} color={colors.gray} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.suggestionsList}>
        {suggestions.map((item) => (
          <View key={item.id}>
            {renderSuggestion({ item })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    maxHeight: 300,
  },
  suggestionsList: {
    borderRadius: radius.md,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  suggestionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  mainTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 15,
    color: colors.blackGray,
    fontWeight: '500',
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  suggestionSubtitle: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  insertButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.lightGray,
  },
}); 