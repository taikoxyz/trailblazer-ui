import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { PUBLIC_SUBGRAPH_URL } from '$env/static/public';

export const badgesSubGraph = new ApolloClient({
  uri: PUBLIC_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});
