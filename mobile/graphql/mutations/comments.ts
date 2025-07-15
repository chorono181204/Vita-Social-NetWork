import { gql } from '@apollo/client';
import { COMMENT_FRAGMENT } from '../fragments/comment';

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      ...CommentFields
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($id: String!, $data: UpdateCommentInput!) {
    updateComment(id: $id, data: $data) {
      ...CommentFields
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      ...CommentFields
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const LIKE_COMMENT_MUTATION = gql`
  mutation LikeComment($id: String!) {
    likeComment(id: $id) {
      ...CommentFields
    }
  }
  ${COMMENT_FRAGMENT}
`; 