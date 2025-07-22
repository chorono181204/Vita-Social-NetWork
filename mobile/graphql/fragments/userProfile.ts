import { gql } from '@apollo/client';

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfileFields on UserProfile {
    id
    userId
    displayName
    avatar
    phone
    dateOfBirth
    gender
    bio
    location
    website
    dietaryPreferences
    cuisinePreferences
    cookingLevel
    healthGoals
    allergies
    followersCount
    followingCount
    postsCount
  }
`; 