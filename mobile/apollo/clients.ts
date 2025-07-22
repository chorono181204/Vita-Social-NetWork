import { ApolloClient, ApolloLink, from } from '@apollo/client';
import { httpLink } from './links/http-link';
import { authLink } from './links/auth-link';
import { loadingLink } from './links/loading-link';
import { errorLink } from './links/error-links';
import { cache } from './cache/cache';

export const apolloClient = new ApolloClient({
  link: from([loadingLink, authLink, errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
