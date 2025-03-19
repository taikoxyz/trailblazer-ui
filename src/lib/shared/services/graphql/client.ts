import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import {
  PUBLIC_BADGES_SUBGRAPH_URL,
  PUBLIC_FBA_SUBGRAPH_URL,
  PUBLIC_PFP_SUBGRAPH_URL,
  PUBLIC_TAIKOONS_SUBGRAPH_URL,
} from '$env/static/public';

export const taikoonsSubgraphClient = new ApolloClient({
  uri: PUBLIC_TAIKOONS_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export const badgesSubgraphClient = new ApolloClient({
  uri: PUBLIC_BADGES_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export const pfpSubgraphClient = new ApolloClient({
  uri: PUBLIC_PFP_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export const fbaSubgraphClient = new ApolloClient({
  uri: PUBLIC_FBA_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});
