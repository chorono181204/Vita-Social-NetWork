export interface User {
  id: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'CHEF' | 'USER';
  isVerified: boolean;
  isActive: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  bio?: string;
  location?: string;
  website?: string;
  dietaryPreferences: string[];
  cuisinePreferences: string[];
  cookingLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  healthGoals: string[];
  allergies: string[];
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface AuthUser {
  accessToken: string;
  refreshToken: string;
  
}
