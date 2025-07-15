import { gql } from '@apollo/client';

export const INTERACTION_FRAGMENT = gql`
  fragment InteractionFields on Interaction {
    id
    userId
    targetId
    targetType
    interactionType
    metadata
    createdAt
    updatedAt
  }
`;

export const INTERACTION_STATS_FRAGMENT = gql`
  fragment InteractionStatsFields on InteractionStats {
    targetId
    targetType
    likesCount
    sharesCount
    savesCount
    isLiked
    isShared
    isSaved
  }
`; 