import type { ApolloQueryResult } from '@apollo/client';

export const createMockQueryResult = <T>(data: T): ApolloQueryResult<T> => ({
  data,
  loading: false,
  networkStatus: 7,
});
