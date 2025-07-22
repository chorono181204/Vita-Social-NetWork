import { apolloClient } from '@/apollo/clients';
import * as SecureStore from 'expo-secure-store';


export const getAccessToken = () =>
  SecureStore.getItemAsync('access_token');

export const getRefreshToken = () =>
  SecureStore.getItemAsync('refresh_token');

/**
 * Gửi mutation REFRESH_TOKEN_MUTATION để lấy accessToken mới.
 * Trả về accessToken (string) hoặc null nếu thất bại.
 */
export const refreshTokens = async (
  REFRESH_MUTATION: any
): Promise<string | null> => {
  try {
    const refresh = await getRefreshToken();
    if (!refresh) return null;

    const { data } = await apolloClient.mutate({
      mutation: REFRESH_MUTATION,
      variables: { token: refresh },
      fetchPolicy: 'no-cache',
    });

    const { accessToken, refreshToken } = data.refreshToken;
    await SecureStore.setItemAsync('access_token', accessToken);
    await SecureStore.setItemAsync('refresh_token', refreshToken);
    return accessToken;
  } catch (err) {
    console.warn('Error refreshing tokens', err);
    return null;
  }
};

/**
 * Xóa cả 2 token khỏi SecureStore
 */
export const clearAuthTokens = async (): Promise<void> => {
  await Promise.all([
    SecureStore.deleteItemAsync('access_token'),
    SecureStore.deleteItemAsync('refresh_token'),
  ]);
};
