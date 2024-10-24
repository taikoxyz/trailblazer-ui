import { readContract } from '@wagmi/core';
import { type Address, zeroAddress } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { BadgeS1Adapter } from './BadgeS1Adapter';

vi.mock('$lib/shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

vi.mock('@wagmi/core', () => ({
  readContract: vi.fn(),
  reconnect: vi.fn(),
}));

describe('BadgeS1Adapter', () => {
  let badgeAdapter: BadgeS1Adapter;
  const mockAddress: Address = zeroAddress;

  beforeEach(() => {
    badgeAdapter = new BadgeS1Adapter();
    vi.clearAllMocks();
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
