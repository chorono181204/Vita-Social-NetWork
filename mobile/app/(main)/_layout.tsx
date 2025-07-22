import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '@/theme';

export default function MainLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Hiển thị loading spinner khi đang check auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    );
  }

  // Nếu chưa login thì redirect về auth
  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  // Nếu đã login thì hiển thị main app
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ẩn header cho toàn bộ main stack
      }}
    />
  );
} 