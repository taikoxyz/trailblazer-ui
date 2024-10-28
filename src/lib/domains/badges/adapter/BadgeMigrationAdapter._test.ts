import type { ApolloQueryResult } from '@apollo/client';

import { trailblazersBadgesAddress } from '$generated/abi';
import { Movements } from '$lib/domains/profile/types/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { FETCH_ENABLED_MIGRATIONS_QUERY, GET_MIGRATION_STATUS_QUERY } from '$lib/shared/services/graphql/queries';
import { chainId } from '$shared/utils/chain';
import generateBadgeMetadata from '$shared/utils/nfts/generateBadgeMetadata';

import { BadgeMigrationAdapter } from './BadgeMigrationAdapter';

vi.mock('$lib/shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

vi.mock('axios');

vi.mock('@wagmi/core', () => ({
  writeContract: vi.fn(),
  readContract: vi.fn(),
  signMessage: vi.fn(),
  reconnect: vi.fn(),
  watchContractEvent: vi.fn(),
}));

vi.mock('$lib/shared/services/api/axiosClient', async () => {
  const actual = await vi.importActual('$lib/shared/services/api/axiosClient');
  return {
    ...actual,
    getAxiosInstance: vi.fn(),
  };
});

vi.mock('$lib/shared/stores/pendingTransactions', () => ({
  pendingTransactions: {
    add: vi.fn(),
  },
}));

const createMockQueryResult = <T>(data: T): ApolloQueryResult<T> => ({
  data,
  loading: false,
  networkStatus: 7,
});

describe('BadgeMigrationAdapter', () => {
  let adapter: BadgeMigrationAdapter;

  //const mockTxHash = '0xTransactionHash';

  // const SEASON_1 = 1;
  // const SEASON_2 = 2

  const mockEnabledMigrationIds = vi.mocked([0, 1, 2, 3]);

  beforeEach(() => {
    adapter = new BadgeMigrationAdapter();
    vi.clearAllMocks();
  });

  describe('fetchEnabledMigrations', () => {
    it('should fetch enabled migrations', async () => {
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          openMigrations: mockEnabledMigrationIds.map((id) => {
            return { id, enabled: true };
          }),
        }),
      );

      const result = await adapter.fetchEnabledMigrations();
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: FETCH_ENABLED_MIGRATIONS_QUERY,
      });

      expect(result).toEqual(mockEnabledMigrationIds);
    });
  });

  describe('startMigration', () => {
    it('should start migration', async () => {
      /*
      const mockBadge = getMockBadge(SEASON_1, 1);

      const mockAddress = '0xAddress' as Address;

      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      const result = await adapter.startMigration(mockAddress, mockBadge);

      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: trailblazersBadgesAbi,
        address: trailblazersBadgesAddress[chainId],
        functionName: 'startMigration',
        args: [BigInt(mockBadge.metadata.badgeId as number)],
        chainId,
      });

      expect(result).toBe(mockTxHash);*/
    });
  });
  describe('refineMigration', () => {
    /*
    const mockTxHash: Hash = '0xTransactionHash' as Hash;
    const mockSignatureResponse = {
      data: {
        signature: '0x2c6404e913a67da2ed0d48d0d3e06c8a7bc0c2416bb22f4a6f4455e1d6c5d9a274b2c3b1c5b2d403f2ff490c1fd37eab2a5e2d197bd2190c8889a8a2e2fdf0e31b',
        points: 100,
      },
    };*/

    it('should refine migration with a valid transaction', async () => {
      /*
      const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';

      const mockBadge = getMockBadge(SEASON_1, 1);

      const mockMovement = Movements.Dev;

      // Mock the signature response and parsing
      vi.mocked(axios.post).mockResolvedValue(mockSignatureResponse);
      vi.mocked(signMessage).mockResolvedValue('0xSignedChallenge');
      vi.mocked(readContract).mockResolvedValue('0xGeneratedClaimHash');
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      const result = await adapter.refineMigration(mockAddress, mockBadge, mockMovement);

      expect(signMessage).toHaveBeenCalledWith(wagmiConfig, { message: expect.any(String) });
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/s2/faction/migrate'),
        {
          address: mockAddress,
          signature: 'signedChallenge',
          message: expect.any(String),
          badgeId: mockBadge.metadata.badgeId,
          chainId,
        },
        expect.any(Object),
      );

      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: badgeMigrationAbi,
        address: badgeMigrationAddress[chainId],
        functionName: 'generateClaimHash',
        args: [mockAddress, BigInt(mockSignatureResponse.data.points)],
        chainId,
      });

      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: badgeMigrationAbi,
        address: badgeMigrationAddress[chainId],
        functionName: 'tamperMigration',
        args: [
          '0xGeneratedClaimHash',
          expect.any(Number),
          expect.any(String),
          expect.any(String),
          BigInt(mockSignatureResponse.data.points),
          mockMovement,
        ],
        chainId,
      });

      expect(result).toBe(mockTxHash);
      */
    });
  });

  describe('endMigration', () => {
    it('', async () => {});
  });

  describe('getMigrationStatus', () => {
    it('should fetch migration status', async () => {
      const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
      const mockMigrationData = {
        approvedS1Tokens: [{ badgeId: 1 }, { badgeId: 2 }],
        approvedForAll: false,
        s2Migrations: [
          {
            id: '1',
            s1Badge: { badgeId: 1, tokenId: 1 },
            s2Badge: { badgeId: 2, tokenId: 2, movement: '1' },
            isStarted: true,
            isCompleted: false,
            devTampers: 0,
            whaleTampers: 0,
            minnowTampers: 0,
            claimExpirationTimeout: 3600,
            tamperExpirationTimeout: 1800,
          },
        ],
      };

      vi.mocked(graphqlClient.query).mockResolvedValue(createMockQueryResult({ account: mockMigrationData }));

      const result = await adapter.getMigrationStatus(mockAddress);

      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: GET_MIGRATION_STATUS_QUERY,
        variables: { address: mockAddress.toLocaleLowerCase() },
      });

      expect(result).toEqual([
        {
          id: '1',
          s1Badge: {
            tokenId: 1,
            address: trailblazersBadgesAddress[chainId],
            metadata: generateBadgeMetadata(1),
            tokenUri: '',
          },
          s2Badge: {
            tokenId: 2,
            address: trailblazersBadgesAddress[chainId],
            metadata: generateBadgeMetadata(2, Movements.Whale),
            tokenUri: '',
          },
          isStarted: true,
          isCompleted: false,
          devTampers: 0,
          whaleTampers: 0,
          minnowTampers: 0,
          claimExpirationTimeout: new Date('1970-01-01T01:01:00.000Z'),
          tamperExpirationTimeout: new Date('1970-01-01T00:31:00.000Z'),
          isApproved: true,
        },
      ]);
    });
  });
});
