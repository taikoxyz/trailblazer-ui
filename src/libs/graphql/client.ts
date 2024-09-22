import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { PUBLIC_SUBGRAPH_URL } from '$env/static/public';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: PUBLIC_SUBGRAPH_URL,
});

const link = ApolloLink.from([errorLink, httpLink]);

export const graphqlClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
