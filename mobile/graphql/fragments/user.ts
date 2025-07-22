import { gql } from '@apollo/client';
import { USER_PROFILE_FRAGMENT } from './userProfile';

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    username
    isVerified
    profile {
      ...UserProfileFields
    }
  }
  ${USER_PROFILE_FRAGMENT}
`; 