import type { ApolloQueryResult } from '@apollo/client';
import type { Address } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { graphqlClient } from '$shared/services/graphql/client';
import { GET_S2_BADGE_MULTIPLIER_QUERY } from '$shared/services/graphql/queries';

import type { S2Multipliers } from '../dto/multipliers';
import BadgeMultiplierAdapter from './BadgeMultiplierAdapter';

vi.mock('$shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

const createMockQueryResult = <T>(data: T): ApolloQueryResult<T> => ({
  data,
  loading: false,
  networkStatus: 7,
});

describe('BadgeMultiplierAdapter', () => {
  let adapter: BadgeMultiplierAdapter;
  const mockAddress = '0xTestAddress' as Address;
  const mockSeason = 2;

  beforeEach(() => {
    adapter = new BadgeMultiplierAdapter();
    vi.clearAllMocks();
  });

  describe('fetchS2BadgeMultiplier', () => {
    it('should return valid multipliers', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          s2Multiplier: {
            devMultiplier: '1',
            minnowMultiplier: '2',
            snaefellMultiplier: '3',
            taikoonMultiplier: '4',
            whaleMultiplier: '5',
            globalMultiplier: '6',
          },
        }),
      );

      // When
      const result = await adapter.fetchS2BadgeMultiplier(mockAddress, mockSeason);

      // Then
      const expected: S2Multipliers = {
        devMultiplier: 1,
        minnowMultiplier: 2,
        snaefellMultiplier: 3,
        taikoonMultiplier: 4,
        whaleMultiplier: 5,
        globalMultiplier: 6,
      };
      expect(result).toStrictEqual(expected);
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: GET_S2_BADGE_MULTIPLIER_QUERY,
        variables: { address: mockAddress.toLowerCase() },
      });
    });

    it('should throw if no data in response', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockResolvedValue(createMockQueryResult({}));

      // When // Then
      await expect(adapter.fetchS2BadgeMultiplier(mockAddress, mockSeason)).rejects.toThrowError(
        'Error fetching S2 badge multiplier',
      );
    });
  });
});
