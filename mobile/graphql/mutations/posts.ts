import { gql } from '@apollo/client';
import { POST_FRAGMENT } from '../fragments/post';

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: String!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($id: String!) {
    likePost(id: $id) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const SAVE_POST_MUTATION = gql`
  mutation SavePost($id: String!) {
    savePost(id: $id) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`; 