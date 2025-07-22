import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';


export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
          round
          onPress={() => router.back()}
        />
        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        {/* Name input */}
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          borderColor={colors.green}
          focusBorderColor={colors.green}
          textColor={colors.blackGray}
          backgroundColor={colors.white}
          autoCapitalize="words"
        />
        {/* Username input */}
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          borderColor={colors.green}
          focusBorderColor={colors.green}
          textColor={colors.blackGray}
          backgroundColor={colors.white}
          autoCapitalize="none"
          placeholder="@username"
        />
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
        {/* Password input */}
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          backgroundColor={colors.white}
          borderColor={colors.lightGrayPurple}
          focusBorderColor={colors.green}
        />
        {/* Confirm Password input */}
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          backgroundColor={colors.white}
          borderColor={colors.lightGrayPurple}
          focusBorderColor={colors.green}
        />
        {/* Sign up button */}
        <Button
          
          backgroundColor={colors.green}
          textColor={colors.white}
          style={styles.signUpBtn}
          textSize="base"
          textWeight="bold"
          
        />
        {/* Link to Login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
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
  signUpBtn: {
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
