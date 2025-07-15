import { apolloClient } from '@/apollo/clients';
import {
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  LIKE_POST_MUTATION,
  SAVE_POST_MUTATION,
} from '@/graphql/mutations/posts';

export interface CreatePostData {
  title: string;
  content?: string;
  tags?: string[];
  category?: string;
  cuisine?: string;
  difficulty?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
  cuisine?: string;
  difficulty?: string;
  published?: boolean;
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  category?: string;
  cuisine?: string;
  difficulty?: string;
  tags: string[];
  searchText?: string;
  authorId: string;
  author?: any;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  createdAt: string;
  updatedAt: string;
}

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const { data: result } = await apolloClient.mutate({
    mutation: CREATE_POST_MUTATION,
    variables: { data },
  });
  return result.createPost;
};

export const updatePost = async (id: string, data: UpdatePostData): Promise<Post> => {
  const { data: result } = await apolloClient.mutate({
    mutation: UPDATE_POST_MUTATION,
    variables: { id, data },
  });
  return result.updatePost;
};

export const deletePost = async (id: string): Promise<Post> => {
  const { data: result } = await apolloClient.mutate({
    mutation: DELETE_POST_MUTATION,
    variables: { id },
  });
  return result.deletePost;
};

export const likePost = async (id: string): Promise<Post> => {
  const { data: result } = await apolloClient.mutate({
    mutation: LIKE_POST_MUTATION,
    variables: { id },
  });
  return result.likePost;
};

export const savePost = async (id: string): Promise<Post> => {
  const { data: result } = await apolloClient.mutate({
    mutation: SAVE_POST_MUTATION,
    variables: { id },
  });
  return result.savePost;
}; 