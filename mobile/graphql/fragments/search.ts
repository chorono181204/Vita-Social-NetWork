import { gql } from '@apollo/client';

export const SEARCH_RESULT_FRAGMENT = gql`
  fragment SearchResultFields on SearchResult {
    id
    title
    content
    type
    score
    image
    author
    category
    tags
    metadata
    createdAt
    updatedAt
  }
`;

export const SEARCH_RESPONSE_FRAGMENT = gql`
  fragment SearchResponseFields on SearchResponse {
    results {
      ...SearchResultFields
    }
    totalCount
    hasMore
    suggestions
    filters
  }
  ${SEARCH_RESULT_FRAGMENT}
`;

export const SEARCH_SUGGESTION_FRAGMENT = gql`
  fragment SearchSuggestionFields on SearchSuggestion {
    text
    type
    count
  }
`;

export const SEARCH_HISTORY_FRAGMENT = gql`
  fragment SearchHistoryFields on SearchHistory {
    id
    query
    userId
    timestamp
    resultCount
  }
`; 