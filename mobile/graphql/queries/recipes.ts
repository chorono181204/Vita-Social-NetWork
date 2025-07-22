import { gql } from '@apollo/client';
import { POST_FRAGMENT } from '../fragments/post';
import { USER_FRAGMENT } from '../fragments/user';
import { STATS_FRAGMENT } from '../fragments/stats';

export const GET_RECIPES_QUERY = gql`
  query GetRecipes($first: Int, $after: String, $category: RecipeCategory, $difficulty: Difficulty, $cuisine: String) {
    recipes(first: $first, after: $after, category: $category, difficulty: $difficulty, cuisine: $cuisine) {
      edges {
        cursor
        node {
          ...PostFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_RECIPE_QUERY = gql`
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($data: CreateRecipeInput!) {
    createRecipe(data: $data) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipe($id: ID!, $data: UpdateRecipeInput!) {
    updateRecipe(id: $id, data: $data) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export const LIKE_RECIPE_MUTATION = gql`
  mutation LikeRecipe($recipeId: ID!) {
    likeRecipe(recipeId: $recipeId) {
      id
      isLiked
      stats {
        likesCount
      }
    }
  }
`;

export const SAVE_RECIPE_MUTATION = gql`
  mutation SaveRecipe($recipeId: ID!) {
    saveRecipe(recipeId: $recipeId) {
      id
      isSaved
      stats {
        savesCount
      }
    }
  }
`;

export const GET_SAVED_RECIPES_QUERY = gql`
  query GetSavedRecipes($first: Int, $after: String) {
    savedRecipes(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...PostFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${POST_FRAGMENT}
`; 