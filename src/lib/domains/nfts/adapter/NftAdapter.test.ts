import { type Address, zeroAddress } from 'viem';

import { graphqlClient } from '$lib/shared/services/graphql/client';
import { createMockQueryResult } from '$lib/shared/utils/test/createMockQueryResult';

import { NftAdapter } from './NftAdapter';

vi.mock('$lib/shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

vi.mock('@wagmi/core', () => ({
  readContract: vi.fn(),
  reconnect: vi.fn(),
}));

describe('NftAdapter', () => {
  let nftAdapter: NftAdapter;
  const mockAddress: Address = zeroAddress;

  beforeEach(() => {
    nftAdapter = new NftAdapter();
    vi.clearAllMocks();
  });

  describe('fetchTaikoTokensForUser', () => {
    it('should return badges when user has S1 badges', async () => {
      // Given
      const mockBadges = [
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

      vi.mocked(graphqlClient.query).mockResolvedValue({
        loading: false,
        networkStatus: 7,
        data: {
          tokens: mockBadges,
        },
      });

      // When
      const result = await nftAdapter.fetchTaikoTokensForUser(mockAddress);

      // Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toStrictEqual([
        {
          address: '0xContract',
          metadata: {
            badgeId: 1,
            erc: 777,
            movement: undefined,
            frozen: false,
          },
          tokenId: 33,
          tokenUri: 'uri',
        },
      ]);
    });

    it('should return all false when user has no S1 badges', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          account: {
            id: mockAddress.toLowerCase(),
            tokens: [],
          },
        }),
      );

      // When
      const result = await nftAdapter.fetchTaikoTokensForUser(mockAddress);

      // Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toStrictEqual([]);
    });

    it('should return all false when account does not exist', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          account: null,
        }),
      );

      // When
      const result = await nftAdapter.fetchTaikoTokensForUser(mockAddress);

      // Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toEqual([]);
    });

    it('should handle GraphQL errors gracefully', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockRejectedValue(new Error('GraphQL Error'));

      // When
      await expect(nftAdapter.fetchTaikoTokensForUser(mockAddress)).rejects.toThrow('GraphQL Error');

      //Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });
    });
  });
});
