import { apolloClient } from '@/apollo/clients';
import {
  CREATE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  LIKE_COMMENT_MUTATION,
} from '@/graphql/mutations/comments';

export interface CreateCommentData {
  content: string;
  postId: string;
  parentId?: string;
}

export interface UpdateCommentData {
  content?: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  replies?: Comment[];
}

export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  const { data: result } = await apolloClient.mutate({
    mutation: CREATE_COMMENT_MUTATION,
    variables: { data },
  });
  return result.createComment;
};

export const updateComment = async (id: string, data: UpdateCommentData): Promise<Comment> => {
  const { data: result } = await apolloClient.mutate({
    mutation: UPDATE_COMMENT_MUTATION,
    variables: { id, data },
  });
  return result.updateComment;
};

export const deleteComment = async (id: string): Promise<Comment> => {
  const { data: result } = await apolloClient.mutate({
    mutation: DELETE_COMMENT_MUTATION,
    variables: { id },
  });
  return result.deleteComment;
};

export const likeComment = async (id: string): Promise<Comment> => {
  const { data: result } = await apolloClient.mutate({
    mutation: LIKE_COMMENT_MUTATION,
    variables: { id },
  });
  return result.likeComment;
}; 