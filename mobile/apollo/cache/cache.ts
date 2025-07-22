import { InMemoryCache, FieldFunctionOptions } from '@apollo/client';

const mergeEdges = (existing: any, incoming: any, args: any) => {
  if (!args || args.skip === 0) return incoming;
  return { ...incoming, edges: [...existing.edges, ...incoming.edges] };
};

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ['type', 'category', 'difficulty', 'cuisine'],
          merge: mergeEdges,
        },
        userPosts: {
          keyArgs: ['userId', 'type'],
          merge: mergeEdges,
        },
        comments: {
          keyArgs: ['postId'],
          merge(existing: any[] = [], incoming: any[], { args }: FieldFunctionOptions) {
            if (!args || args.skip === 0) return incoming;
            return [...existing, ...incoming];
          },
        },
        searchPosts: {
          keyArgs: ['query', 'type', 'category', 'difficulty'],
          merge: mergeEdges,
        },
      },
    },
    Post: {
      keyFields: ['id'],
      fields: {
        content: {
          read(existing) {
            if (typeof existing === 'string') {
              try { return JSON.parse(existing); }
              catch { return existing; }
            }
            return existing;
          },
        },
        isLiked: {
          read(existing = false) {
            return existing;
          },
        },
        isSaved: {
          read(existing = false) {
            return existing;
          },
        },
        recipeContent: {
          read(_, { readField }) {
            const content = readField<any>('content');
            const type = readField<string>('type');
            return type === 'RECIPE' && content?.recipe ? content.recipe : null;
          },
        },
      },
    },
    User: {
      keyFields: ['id'],
      fields: {
        isFollowing: {
          read(existing = false) {
            return existing;
          },
        },
      },
    },
    Comment: {
      keyFields: ['id'],
      fields: {
        isLiked: {
          read(existing = false) {
            return existing;
          },
        },
        replies: {
          merge(existing: any[] = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
