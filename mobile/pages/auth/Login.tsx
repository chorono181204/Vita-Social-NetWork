import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';
import { login as loginService } from '@/services/auth.service';
import { validateEmail, validatePassword } from '@/utils/validate';
import { useAuth } from '@/providers/AuthProvider';

export default function Login() {
  const { checkAuthStatus } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {login} = useAuth();
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(validateEmail(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
  };

  const handleLogin = async () => {
    // Check real-time validation errors
    if (emailError || passwordError) {
      return; // Không submit nếu có validation errors
    }
      await loginService(email, password);
      login();
  };
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
          onPress={() =>   router.back()}
        />
        {/* Title */}
        <Text style={styles.title}>Hello Again!</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        {/* Email input */}
        <Input
          label="Email address"
          value={email}
          onChangeText={handleEmailChange}
          borderColor={emailError ? colors.red : colors.green}
          focusBorderColor={colors.green}
          textColor={colors.blackGray}
          backgroundColor={colors.white}
          keyboardType="email-address"
          autoCapitalize="none"
          inputStyle={{ fontWeight: 'bold' }}
          placeholder="Enter your email"
          textContentType="emailAddress"
          autoComplete="email"
          error={emailError || undefined}
        />
        {/* Password input */}
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          backgroundColor={colors.white}
          borderColor={passwordError ? colors.red : colors.lightGrayPurple}
          focusBorderColor={colors.green}
          inputStyle={{ fontWeight: 'bold' }}
          textContentType="password"
          error={passwordError || undefined}
        />
        {/* Forgot password */}
        <Button
          text="Forgot your password?"
          textColor={colors.green}
          backgroundColor={colors.white}
          style={styles.forgotBtn}
          textSize="sm"
          textWeight="medium"
          onPress={() => router.push('/auth/forgot-password')}
        />
        {/* Sign in button */}
        <Button
          text={ "Sign in"}
          backgroundColor={colors.green}
          textColor={colors.white}
          style={styles.signInBtn}
          textSize="base"
          textWeight="bold"
          onPress={handleLogin}
        />
        {/* Or with divider */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or with</Text>
          <View style={styles.divider} />
        </View>
        {/* Social buttons */}
        <Button
          text="Sign in with Google"
          leftIcon={<AntDesign name="google" size={20} color={colors.blackGray} style={{ marginRight: 8 }} />}
          backgroundColor={colors.white}
          textColor={colors.blackGray}
          style={styles.socialBtn}
          borderColor={colors.lightGrayPurple}
          borderWidth={1}
          textWeight="medium"
          onPress={() => {}}
        />
        {/* Sign up link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have account? </Text>
          <Button
            text="Let's Sign up"
            textColor={colors.green}
            backgroundColor={colors.white}
            textSize="sm"
            textWeight="bold"
            style={styles.signupLinkBtn}
            onPress={() => router.push('/auth/register')}
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 24,
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: undefined,
    height: undefined,
  },
  signInBtn: {
    width: '100%',
    borderRadius: 12,
    height: 52,
    marginBottom: 24,
    marginTop: 0,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGrayPurple,
  },
  orText: {
    marginHorizontal: 12,
    color: colors.gray,
    fontSize: 14,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    color: colors.gray,
    fontSize: 14,
  },
  signupLinkBtn: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: undefined,
    height: undefined,
  },
}); 