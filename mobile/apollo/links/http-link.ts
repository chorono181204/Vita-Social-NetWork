import { createHttpLink } from '@apollo/client';

export const httpLink = createHttpLink({
  uri: 'http://192.168.1.8:3000/graphql',
});
