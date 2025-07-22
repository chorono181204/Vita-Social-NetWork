import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './user';
import { STATS_FRAGMENT } from './stats';

export const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    type
    content
    title
    difficulty
    category
    tags
    cuisine
    searchText
    published
    createdAt
    author {
      ...UserFields
    }
    stats {
      ...StatsFields
    }
    isLiked
    isSaved
  }
  ${USER_FRAGMENT}
  ${STATS_FRAGMENT}
`; 