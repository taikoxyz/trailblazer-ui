import type { ApolloQueryResult } from '@apollo/client';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { FactionNames } from '$lib/domains/nfts/types/badges/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { BadgeAdapter } from './BadgeAdapter';

// Mock external modules
vi.mock('$lib/shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

vi.mock('@wagmi/core', () => ({
  readContract: vi.fn(),
  reconnect: vi.fn(),
}));

describe('BadgeAdapter', () => {
  let badgeAdapter: BadgeAdapter;
  const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678' as Address;

  beforeEach(() => {
    badgeAdapter = new BadgeAdapter();
    vi.clearAllMocks();
  });

  describe('fetchUserS1Badges', () => {
    const defaultOutput = {
      [FactionNames.Ravers]: false,
      [FactionNames.Robots]: false,
      [FactionNames.Bouncers]: false,
      [FactionNames.Masters]: false,
      [FactionNames.Monks]: false,
      [FactionNames.Drummers]: false,
      [FactionNames.Androids]: false,
      [FactionNames.Shinto]: false,
    };

    const createMockQueryResult = <T>(data: T): ApolloQueryResult<T> => ({
      data,
      loading: false,
      networkStatus: 7,
    });

    it('should return badges when user has S1 badges', async () => {
      // Given
      const mockBadges = [
        { id: '1', badgeId: '0' }, // Ravers
        { id: '2', badgeId: '3' }, // Masters
      ];

      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          account: {
            id: mockAddress.toLowerCase(),
            s1MultiplierNfts: mockBadges,
          },
        }),
      );

      // When
      const result = await badgeAdapter.fetchUserS1Badges(mockAddress);

      // Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      const expectedOutput = {
        ...defaultOutput,
        [FactionNames.Ravers]: true,
        [FactionNames.Masters]: true,
      };

      expect(result).toEqual(expectedOutput);
    });

    it('should return all false when user has no S1 badges', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          account: {
            id: mockAddress.toLowerCase(),
            s1MultiplierNfts: [],
          },
        }),
      );

      // When
      const result = await badgeAdapter.fetchUserS1Badges(mockAddress);

      // Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toEqual(defaultOutput);
    });

    it('should return all false when account does not exist', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          account: null,
        }),
      );

      // When
      const result = await badgeAdapter.fetchUserS1Badges(mockAddress);

      // Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });

      expect(result).toEqual(defaultOutput);
    });

    it('should handle GraphQL errors gracefully', async () => {
      // Given
      vi.mocked(graphqlClient.query).mockRejectedValue(new Error('GraphQL Error'));

      // When
      await expect(badgeAdapter.fetchUserS1Badges(mockAddress)).rejects.toThrow('GraphQL Error');

      //Then
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { address: mockAddress.toLowerCase() },
      });
    });
  });

  describe('getTokenId', () => {
    const expectedContractArgs = {
      address: trailblazersBadgesAddress[chainId],
      abi: trailblazersBadgesAbi,
      functionName: 'getTokenId',
      chainId,
    };

    it('should return the correct token ID from the contract', async () => {
      // Given
      const factionId = 2;
      const mockResult = BigInt(42);

      vi.mocked(readContract).mockResolvedValue(mockResult);

      // When
      const result = await badgeAdapter.getTokenId(mockAddress, factionId);

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        ...expectedContractArgs,
        args: [mockAddress, BigInt(factionId)],
      });

      expect(result).toBe(42);
    });

    it('should handle contract call errors gracefully', async () => {
      // Given
      const factionId = 2;
      const error = new Error('Contract Call Failed');
      vi.mocked(readContract).mockRejectedValue(error);

      // When
      await expect(badgeAdapter.getTokenId(mockAddress, factionId)).rejects.toThrow(error);

      // Then
      expect(readContract).toHaveBeenCalled();

      const [configArg, optionsArg] = vi.mocked(readContract).mock.calls[0];

      expect(configArg).toBe(wagmiConfig);
      expect(optionsArg).toMatchObject({
        ...expectedContractArgs,
        args: [mockAddress, BigInt(factionId)],
      });
    });
  });
});
