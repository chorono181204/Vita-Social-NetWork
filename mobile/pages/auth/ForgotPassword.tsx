import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Back button */}
        <Button
          leftIcon={<Ionicons name="arrow-back" size={24} color={colors.white} />}
          backgroundColor={colors.green}
          style={styles.backBtn}
          height={40}
          width={40}
          onPress={() => router.back()}
        />
        {/* Title */}
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email to reset your password</Text>
        {/* Email input */}
        <Input
          label="Email address"
          value={email}
          onChangeText={setEmail}
          borderColor={colors.green}
          focusBorderColor={colors.green}
          textColor={colors.blackGray}
          backgroundColor={colors.white}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {/* Send reset link button */}
        <Button
          text="Send Reset Link"
          backgroundColor={colors.green}
          textColor={colors.white}
          style={styles.sendBtn}
          textSize="base"
          textWeight="bold"
          onPress={() => {}}
        />
        {/* Link to Login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Remember your password? </Text>
          <Button
            text="Sign in"
            textColor={colors.green}
            backgroundColor={colors.white}
            textSize="sm"
            textWeight="bold"
            style={styles.loginLinkBtn}
            onPress={() => router.replace('/auth')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.blackGray,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 32,
    textAlign: 'center',
  },
  sendBtn: {
    width: '100%',
    borderRadius: 12,
    height: 52,
    marginBottom: 24,
    marginTop: 0,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: colors.gray,
    fontSize: 14,
  },
  loginLinkBtn: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: undefined,
    height: undefined,
  },
});
