import { apolloClient } from '@/apollo/clients';
import { LOGIN_MUTATION, ME_QUERY } from '@/graphql/queries/auth';
import * as SecureStore from 'expo-secure-store';
import type { AuthUser } from '@/types/user';
import { clearAuthTokens } from '@/apollo/utils/token';
import { showToast } from '@/utils/toast';
import { useAuth } from '@/providers/AuthProvider';

// Login service: chỉ lưu token, không cần user data
export async function login(email: string, password: string): Promise<AuthUser> {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: { data: { email, password } },
      fetchPolicy: 'no-cache',
    });
    
    const { accessToken, refreshToken } = data.login;
    
    // Lưu tokens vào SecureStore
    try {
      await SecureStore.setItemAsync('access_token', accessToken);
      await SecureStore.setItemAsync('refresh_token', refreshToken);
    } catch (error) {
      throw new Error('Failed to save authentication tokens');
    }
    
    // Hiển thị toast thành công
    showToast({
      type: 'success',
      text1: 'Login successful',
      text2: 'Welcome back!'
    });
    return { accessToken, refreshToken };
}

// Logout service: clears tokens
export async function logout() {
  try {
    await clearAuthTokens();
    // Hiển thị toast thành công
    showToast({
      type: 'success',
      text1: 'Logged out successfully',
      text2: 'You have been signed out of your account'
    });
    
  } catch (error) {
    throw error;
  }
}
export async function getMe() {
  const { data } = await apolloClient.query({
    query: ME_QUERY,
    fetchPolicy: 'cache-first', 
  }); 
  return data.me;
}