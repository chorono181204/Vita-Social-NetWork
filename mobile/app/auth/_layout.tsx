import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '@/theme';

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Hiển thị loading spinner khi đang check auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    );
  }

  // Nếu đã login thì redirect về main app
  if (isAuthenticated) {
    return <Redirect href="/(main)/home" />;
  }

  // Nếu chưa login thì hiển thị auth screens
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ẩn header cho toàn bộ auth stack
      }}
    />
  );
} 