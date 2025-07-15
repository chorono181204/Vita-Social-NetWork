import { gql } from '@apollo/client';
import { INTERACTION_FRAGMENT } from '../fragments/interaction';

export const CREATE_INTERACTION_MUTATION = gql`
  mutation CreateInteraction($data: CreateInteractionInput!) {
    createInteraction(data: $data) {
      ...InteractionFields
    }
  }
  ${INTERACTION_FRAGMENT}
`;

export const LIKE_CONTENT_MUTATION = gql`
  mutation LikeContent($targetId: String!, $targetType: TargetType!) {
    likeContent(targetId: $targetId, targetType: $targetType) {
      ...InteractionFields
    }
  }
  ${INTERACTION_FRAGMENT}
`;

export const SHARE_CONTENT_MUTATION = gql`
  mutation ShareContent($targetId: String!, $targetType: TargetType!, $metadata: String) {
    shareContent(targetId: $targetId, targetType: $targetType, metadata: $metadata) {
      ...InteractionFields
    }
  }
  ${INTERACTION_FRAGMENT}
`;

export const SAVE_CONTENT_MUTATION = gql`
  mutation SaveContent($targetId: String!, $targetType: TargetType!) {
    saveContent(targetId: $targetId, targetType: $targetType) {
      ...InteractionFields
    }
  }
  ${INTERACTION_FRAGMENT}
`;

export const DELETE_INTERACTION_MUTATION = gql`
  mutation DeleteInteraction($id: String!) {
    deleteInteraction(id: $id) {
      ...InteractionFields
    }
  }
  ${INTERACTION_FRAGMENT}
`; 