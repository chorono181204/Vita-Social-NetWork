import { onError } from '@apollo/client/link/error';
import { fromPromise } from '@apollo/client/link/utils';
import * as toast from '../utils/toast';
import * as tokenUtils from '../utils/token';
import { REFRESH_TOKEN_MUTATION } from '@/graphql/queries/auth';

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

const resolvePending = (token: string) => {
  pendingRequests.forEach(cb => cb(token));
  pendingRequests = [];
};

const fetchNewToken = () => tokenUtils.refreshTokens(REFRESH_TOKEN_MUTATION);

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      toast.showError('Error', message.charAt(0).toUpperCase() + message.slice(1));
    });
  }
  console.log(graphQLErrors);
  const unauthorized = graphQLErrors?.some(err =>
    /unauthorized|not authenticated/i.test(err.message)
  );

  if (unauthorized) {
    if (!isRefreshing) {
      isRefreshing = true;
      return fromPromise(
        fetchNewToken().then(token => {
          isRefreshing = false;
          resolvePending(token || '');
          if (!token) {
            tokenUtils.clearAuthTokens();
            toast.showError('Session expired', 'Please log in again');
            // TODO: Nếu có router, chuyển hướng về màn hình login ở đây
          }
          return token;
        })
      )
        .filter((t): t is string => Boolean(t))
        .flatMap(token => {
          operation.setContext(({ headers = {} }) => ({
            headers: { ...headers, authorization: `Bearer ${token}` },
          }));
          return forward(operation);
        });
    } else {
      return fromPromise(
        new Promise<string>(resolve => {
          pendingRequests.push(resolve);
        })
      ).flatMap(token => {
        operation.setContext(({ headers = {} }) => ({
          headers: { ...headers, authorization: `Bearer ${token}` },
        }));
        return forward(operation);
      });
    }
  }

  if (networkError) {
    toast.showError('Network Error', 'Please check your connection.');
  }
});
