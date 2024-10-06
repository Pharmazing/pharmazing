import { ApolloClient, HttpLink, from, InMemoryCache } from '@apollo/client';
import {
  appAuthMiddleware,
  webAuthMiddleware,
} from './middleware/authMiddleware';
import { isWeb, isAndroid } from '../../hooks';

const httpLink = new HttpLink({
  uri: isAndroid
    ? 'http://10.0.0.123:4000/graphql'
    : process.env.EXPO_PUBLIC_API_URL,
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: from([isWeb ? webAuthMiddleware : appAuthMiddleware, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
