import { apolloClient } from '@/apollo/clients';
import {
  CREATE_INTERACTION_MUTATION,
  LIKE_CONTENT_MUTATION,
  SHARE_CONTENT_MUTATION,
  SAVE_CONTENT_MUTATION,
  DELETE_INTERACTION_MUTATION,
} from '@/graphql/mutations/interactions';

export enum InteractionType {
  LIKE = 'LIKE',
  SHARE = 'SHARE',
  SAVE = 'SAVE',
}

export enum TargetType {
  POST = 'POST',
  COMMENT = 'COMMENT',
  RECIPE = 'RECIPE',
  ARTICLE = 'ARTICLE',
}

export interface CreateInteractionData {
  targetId: string;
  targetType: TargetType;
  interactionType: InteractionType;
  metadata?: string;
}

export interface Interaction {
  id: string;
  userId: string;
  targetId: string;
  targetType: string;
  interactionType: string;
  metadata?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InteractionStats {
  targetId: string;
  targetType: string;
  likesCount: number;
  sharesCount: number;
  savesCount: number;
  isLiked: boolean;
  isShared: boolean;
  isSaved: boolean;
}

export const createInteraction = async (data: CreateInteractionData): Promise<Interaction> => {
  const { data: result } = await apolloClient.mutate({
    mutation: CREATE_INTERACTION_MUTATION,
    variables: { data },
  });
  return result.createInteraction;
};

export const likeContent = async (targetId: string, targetType: TargetType): Promise<Interaction> => {
  const { data: result } = await apolloClient.mutate({
    mutation: LIKE_CONTENT_MUTATION,
    variables: { targetId, targetType },
  });
  return result.likeContent;
};

export const shareContent = async (
  targetId: string,
  targetType: TargetType,
  metadata?: string,
): Promise<Interaction> => {
  const { data: result } = await apolloClient.mutate({
    mutation: SHARE_CONTENT_MUTATION,
    variables: { targetId, targetType, metadata },
  });
  return result.shareContent;
};

export const saveContent = async (targetId: string, targetType: TargetType): Promise<Interaction> => {
  const { data: result } = await apolloClient.mutate({
    mutation: SAVE_CONTENT_MUTATION,
    variables: { targetId, targetType },
  });
  return result.saveContent;
};

export const deleteInteraction = async (id: string): Promise<Interaction> => {
  const { data: result } = await apolloClient.mutate({
    mutation: DELETE_INTERACTION_MUTATION,
    variables: { id },
  });
  return result.deleteInteraction;
}; 