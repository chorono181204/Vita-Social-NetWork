import { gql } from '@apollo/client';

export const COMMENT_FRAGMENT = gql`
  fragment CommentFields on Comment {
    id
    content
    authorId
    postId
    parentId
    likesCount
    repliesCount
    isLiked
    createdAt
    updatedAt
    author {
      id
      name
      email
      avatar
    }
    replies {
      id
      content
      authorId
      postId
      parentId
      likesCount
      repliesCount
      isLiked
      createdAt
      updatedAt
      author {
        id
        name
        email
        avatar
      }
    }
  }
`; 