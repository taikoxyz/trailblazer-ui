import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const graphqlClient = new ApolloClient({
  uri: 'https://api.goldsky.com/api/public/project_clzgosmls42bq01wi0shn6fpi/subgraphs/tbz/2.1.10/gn',
  cache: new InMemoryCache(),
});
