import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
}

export default function Loading({
  size = 'large',
  color = colors.green,
  text,
  overlay = true
}: LoadingProps) {
  const LoadingContent = () => (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  );

  if (overlay) {
    return (
      <View style={styles.overlay}>
        <LoadingContent />
      </View>
    );
  }

  return <LoadingContent />;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.blackGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    minHeight: 100,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
}); 