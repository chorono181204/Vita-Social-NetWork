import { gql } from '@apollo/client';
import { SEARCH_RESPONSE_FRAGMENT, SEARCH_SUGGESTION_FRAGMENT, SEARCH_HISTORY_FRAGMENT } from '../fragments/search';

export const SEARCH_QUERY = gql`
  query Search($query: String!, $type: SearchType) {
    search(query: $query, type: $type) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const SEARCH_WITH_USER_QUERY = gql`
  query SearchWithUser($query: String!, $type: SearchType) {
    searchWithUser(query: $query, type: $type) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const ADVANCED_SEARCH_QUERY = gql`
  query AdvancedSearch($query: String!, $filters: SearchQueryInput!) {
    advancedSearch(query: $query, filters: $filters) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const GET_SUGGESTIONS_QUERY = gql`
  query GetSuggestions($query: String!, $type: SearchType) {
    getSuggestions(query: $query, type: $type) {
      ...SearchSuggestionFields
    }
  }
  ${SEARCH_SUGGESTION_FRAGMENT}
`;

export const GET_SEARCH_HISTORY_QUERY = gql`
  query GetSearchHistory {
    getSearchHistory {
      ...SearchHistoryFields
    }
  }
  ${SEARCH_HISTORY_FRAGMENT}
`;

export const GET_POPULAR_SEARCHES_QUERY = gql`
  query GetPopularSearches {
    getPopularSearches {
      ...SearchSuggestionFields
    }
  }
  ${SEARCH_SUGGESTION_FRAGMENT}
`;

export const SEARCH_POSTS_QUERY = gql`
  query SearchPosts($query: String!, $limit: Int, $offset: Int) {
    searchPosts(query: $query, limit: $limit, offset: $offset) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const SEARCH_RECIPES_QUERY = gql`
  query SearchRecipes($query: String!, $limit: Int, $offset: Int, $difficulty: String, $cuisine: String, $minRating: Float) {
    searchRecipes(query: $query, limit: $limit, offset: $offset, difficulty: $difficulty, cuisine: $cuisine, minRating: $minRating) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($query: String!, $limit: Int, $offset: Int) {
    searchUsers(query: $query, limit: $limit, offset: $offset) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const SEARCH_ARTICLES_QUERY = gql`
  query SearchArticles($query: String!, $limit: Int, $offset: Int) {
    searchArticles(query: $query, limit: $limit, offset: $offset) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`;

export const SEARCH_COMMENTS_QUERY = gql`
  query SearchComments($query: String!, $limit: Int, $offset: Int) {
    searchComments(query: $query, limit: $limit, offset: $offset) {
      ...SearchResponseFields
    }
  }
  ${SEARCH_RESPONSE_FRAGMENT}
`; 