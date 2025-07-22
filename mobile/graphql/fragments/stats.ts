import { gql } from '@apollo/client';

export const STATS_FRAGMENT = gql`
  fragment StatsFields on Stats {
    likesCount
    commentsCount
    savesCount
  }
`; 