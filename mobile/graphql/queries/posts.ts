import { gql } from '@apollo/client';
import { POST_FRAGMENT } from '../fragments/post';
import { COMMENT_FRAGMENT } from '../fragments/comment';

export const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int, $after: String, $type: PostType, $category: RecipeCategory, $difficulty: Difficulty) {
    posts(first: $first, after: $after, type: $type, category: $category, difficulty: $difficulty) {
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

export const GET_POST_QUERY = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      isLiked
      stats {
        likesCount
      }
    }
  }
`;

export const SAVE_POST_MUTATION = gql`
  mutation SavePost($postId: ID!) {
    savePost(postId: $postId) {
      id
      isSaved
      stats {
        savesCount
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query GetComments($first: Int, $after: String, $postId: ID!) {
    comments(first: $first, after: $after, postId: $postId) {
      edges {
        cursor
        node {
          ...CommentFields
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
  ${COMMENT_FRAGMENT}
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      ...CommentFields
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const LIKE_COMMENT_MUTATION = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      id
      isLiked
      likes
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      isFollowing
      followersCount
    }
  }
`

export const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      id
      isFollowing
      followersCount
    }
  }
`

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      id
      username
      displayName
      firstName
      lastName
      avatar
      isVerified
      isActive
      createdAt
      profile {
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
      isFollowing
    }
  }
`

export const GET_USER_POSTS_QUERY = gql`
  query GetUserPosts($userId: ID!, $first: Int, $after: String, $type: PostType) {
    userPosts(userId: $userId, first: $first, after: $after, type: $type) {
      edges {
        cursor
        node {
          id
          type
          content
          title
          difficulty
          category
          tags
          cuisine
          published
          createdAt
          stats {
            likesCount
            commentsCount
            savesCount
          }
          isLiked
          isSaved
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
`

// Search queries
export const SEARCH_POSTS_QUERY = gql`
  query SearchPosts($query: String!, $type: PostType, $category: RecipeCategory, $difficulty: Difficulty, $first: Int, $after: String) {
    searchPosts(query: $query, type: $type, category: $category, difficulty: $difficulty, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          type
          content
          title
          difficulty
          category
          tags
          cuisine
          published
          createdAt
          author {
            id
            username
            displayName
            avatar
            isVerified
          }
          stats {
            likesCount
            commentsCount
            savesCount
          }
          isLiked
          isSaved
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
` 