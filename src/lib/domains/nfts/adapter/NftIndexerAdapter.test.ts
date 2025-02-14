/*import { type Address, zeroAddress } from 'viem';

import { Movements } from '$lib/domains/profile/types/types';
import { badgesSubgraphClient } from '$lib/shared/services/graphql/client';

import { NftIndexerAdapter } from './NftIndexerAdapter';
*/
describe('NftIndexerAdapter', () => {
  it('should return badges when user has S1 badges', async () => {});
});
/*
vi.mock('axios', () => ({
    get: vi.fn(),
}))
vi.mock('@wagmi/core', () => ({
  readContract: vi.fn(),
}));

describe('NftIndexerAdapter', () => {
  let indexerAdapter: NftIndexerAdapter;
  const mockAddress: Address = zeroAddress;

  beforeEach(() => {
    indexerAdapter = new NftIndexerAdapter();
    vi.clearAllMocks();
  });

  describe('fetchTaikoTokensForUser', () => {
    it('should return sentinels when the user has any', async () => {
      // Given
      const mockTokens = [
        {
          badgeId: 1,
          contract: '0xContract',
          erc: 777,
          id: '',
          movement: '',
          owner: '',
          tokenId: 33,
          uri: 'uri',
        },
      ];

      vi.mocked(badgesSubgraphClient.query).mockResolvedValue({
        loading: false,
        networkStatus: 7,
        data: {
          tokens: mockTokens,
        },
      });

      // When
      const result = await indexerAdapter.fetchTokenForUser(mockAddress);

      // Then
      expect(badgesSubgraphClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toStrictEqual([
        {
          address: '0xContract',
          metadata: {
            badgeId: 1,
            erc: 777,
            movement: Movements.Dev,
            frozenS2: false,
            frozenS3: false,
          },
          tokenId: 33,
          tokenUri: 'uri',
        },
      ]);
    });

    /*
    it('should return all false when user has no S1 badges', async () => {
      // Given
      vi.mocked(badgesSubgraphClient.query).mockResolvedValue(
        createMockQueryResult({
          account: {
            id: mockAddress.toLowerCase(),
            tokens: [],
          },
        }),
      );

      // When
      const result = await indexerAdapter.fetchTaikoTokensForUser(mockAddress);

      // Then
      expect(badgesSubgraphClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toStrictEqual([]);
    });

    it('should return all false when account does not exist', async () => {
      // Given
      vi.mocked(badgesSubgraphClient.query).mockResolvedValue(
        createMockQueryResult({
          account: null,
        }),
      );

      // When
      const result = await indexerAdapter.fetchTaikoTokensForUser(mockAddress);

      // Then
      expect(badgesSubgraphClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toEqual([]);
    });

    it('should handle GraphQL errors gracefully', async () => {
      // Given
      vi.mocked(badgesSubgraphClient.query).mockRejectedValue(new Error('GraphQL Error'));

      // When
      await expect(indexerAdapter.fetchTaikoTokensForUser(mockAddress)).rejects.toThrow('GraphQL Error');

      //Then
      expect(badgesSubgraphClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });
    });

  });
});
*/
