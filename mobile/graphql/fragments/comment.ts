import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './user';

export const COMMENT_FRAGMENT = gql`
  fragment CommentFields on Comment {
    id
    content
    createdAt
    updatedAt
    user {
      ...UserFields
    }
    parent {
      id
      content
      user {
        id
        username
      }
    }
    replies {
      id
      content
      createdAt
      user {
        id
        username
        displayName
        avatar
      }
      likes
      isLiked
    }
    likes
    isLiked
  }
  ${USER_FRAGMENT}
`; 