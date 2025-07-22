import { useRouter } from 'expo-router';

interface UserNavigationOptions {
  source?: string; // Track where navigation came from
  prefetch?: boolean; // Whether to prefetch user data
}

export const useUserNavigation = () => {
  const router = useRouter();

  const navigateToProfile = (userId: string, options?: UserNavigationOptions) => {
    // Log analytics if needed
    if (options?.source) {
      console.log(`Profile navigation from ${options.source} to user ${userId}`);
    }

    // Navigate to user profile
    router.push(`/(main)/profile/${userId}`);
  };

  const navigateToOwnProfile = () => {
    router.push('/(main)/profile');
  };

  const navigateToUserById = (userId: string, currentUserId?: string) => {
    if (userId === currentUserId) {
      navigateToOwnProfile();
    } else {
      navigateToProfile(userId);
    }
  };

  return {
    navigateToProfile,
    navigateToOwnProfile,
    navigateToUserById
  };
}; 