import { User } from '@/types';
import { UPDATE_USER_MUTATION, CHANGE_PASSWORD_MUTATION } from '@/graphql/mutations/user';
import { apolloClient } from '@/apollo/clients';

export interface UpdateUserData {
  displayName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  bio?: string;
  location?: string;
  website?: string;
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  cookingLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  healthGoals?: string[];
  allergies?: string[];
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const updateUserProfile = async (data: UpdateUserData): Promise<User> => {
  const { data: result } = await apolloClient.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: { data },
  });
  return result.updateUser;
};

export const changePassword = async (data: ChangePasswordData): Promise<User> => {
  const { data: result } = await apolloClient.mutate({
    mutation: CHANGE_PASSWORD_MUTATION,
    variables: { data },
  });
  return result.changePassword;
};



