import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`; 