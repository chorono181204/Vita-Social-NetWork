import { apolloClient } from '@/apollo/clients';
import {
  SEARCH_QUERY,
  SEARCH_WITH_USER_QUERY,
  ADVANCED_SEARCH_QUERY,
  GET_SUGGESTIONS_QUERY,
  GET_SEARCH_HISTORY_QUERY,
  GET_POPULAR_SEARCHES_QUERY,
  SEARCH_POSTS_QUERY,
  SEARCH_RECIPES_QUERY,
  SEARCH_USERS_QUERY,
  SEARCH_ARTICLES_QUERY,
  SEARCH_COMMENTS_QUERY,
} from '@/graphql/queries/search';

export enum SearchType {
  ALL = 'ALL',
  POSTS = 'POSTS',
  RECIPES = 'RECIPES',
  USERS = 'USERS',
  ARTICLES = 'ARTICLES',
  COMMENTS = 'COMMENTS',
}

export enum SortOrder {
  RELEVANCE = 'RELEVANCE',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  POPULAR = 'POPULAR',
  RATING = 'RATING',
}

export interface SearchQueryInput {
  query: string;
  type?: SearchType;
  sortBy?: SortOrder;
  categories?: string[];
  tags?: string[];
  authors?: string[];
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
  difficulty?: string;
  cuisine?: string;
  minRating?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  content?: string;
  type: string;
  score: number;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  metadata?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  hasMore: boolean;
  suggestions: string[];
  filters: string[];
}

export interface SearchSuggestion {
  text: string;
  type: string;
  count: number;
}

export interface SearchHistory {
  id: string;
  query: string;
  userId: string;
  timestamp: string;
  resultCount?: number;
}

export const search = async (query: string, type?: SearchType): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_QUERY,
    variables: { query, type },
  });
  return data.search;
};

export const searchWithUser = async (query: string, type?: SearchType): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_WITH_USER_QUERY,
    variables: { query, type },
  });
  return data.searchWithUser;
};

export const advancedSearch = async (query: string, filters: SearchQueryInput): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: ADVANCED_SEARCH_QUERY,
    variables: { query, filters },
  });
  return data.advancedSearch;
};

export const getSuggestions = async (query: string, type?: SearchType): Promise<SearchSuggestion[]> => {
  const { data } = await apolloClient.query({
    query: GET_SUGGESTIONS_QUERY,
    variables: { query, type },
  });
  return data.getSuggestions;
};

export const getSearchHistory = async (): Promise<SearchHistory[]> => {
  const { data } = await apolloClient.query({
    query: GET_SEARCH_HISTORY_QUERY,
  });
  return data.getSearchHistory;
};

export const getPopularSearches = async (): Promise<SearchSuggestion[]> => {
  const { data } = await apolloClient.query({
    query: GET_POPULAR_SEARCHES_QUERY,
  });
  return data.getPopularSearches;
};

export const searchPosts = async (
  query: string,
  limit?: number,
  offset?: number,
): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_POSTS_QUERY,
    variables: { query, limit, offset },
  });
  return data.searchPosts;
};

export const searchRecipes = async (
  query: string,
  limit?: number,
  offset?: number,
  difficulty?: string,
  cuisine?: string,
  minRating?: number,
): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_RECIPES_QUERY,
    variables: { query, limit, offset, difficulty, cuisine, minRating },
  });
  return data.searchRecipes;
};

export const searchUsers = async (
  query: string,
  limit?: number,
  offset?: number,
): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_USERS_QUERY,
    variables: { query, limit, offset },
  });
  return data.searchUsers;
};

export const searchArticles = async (
  query: string,
  limit?: number,
  offset?: number,
): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_ARTICLES_QUERY,
    variables: { query, limit, offset },
  });
  return data.searchArticles;
};

export const searchComments = async (
  query: string,
  limit?: number,
  offset?: number,
): Promise<SearchResponse> => {
  const { data } = await apolloClient.query({
    query: SEARCH_COMMENTS_QUERY,
    variables: { query, limit, offset },
  });
  return data.searchComments;
}; 