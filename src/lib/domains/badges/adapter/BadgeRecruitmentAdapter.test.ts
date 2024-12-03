import type { ApolloQueryResult } from '@apollo/client';
import { readContract, signMessage, watchContractEvent, writeContract } from '@wagmi/core';
import axios from 'axios';
import { type Address, type Hash } from 'viem';

import {
  badgeRecruitmentAbi,
  badgeRecruitmentAddress,
  trailblazersBadgesAbi,
  trailblazersBadgesAddress,
  trailblazersBadgesS2Address,
} from '$generated/abi';
import { Movements } from '$lib/domains/profile/types/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { FETCH_ENABLED_MIGRATIONS_QUERY, GET_MIGRATION_STATUS_QUERY } from '$lib/shared/services/graphql/queries';
import { type IBadgeRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
import { chainId } from '$shared/utils/chain';
import generateBadgeMetadata from '$shared/utils/nfts/generateBadgeMetadata';
import getMockBadge from '$shared/utils/nfts/getMockBadge';
import { wagmiConfig } from '$shared/wagmi';

import BadgeRecruitmentAdapter from './BadgeRecruitmentAdapter';

vi.mock('$lib/shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(), // Mock the `query` method
    cache: {
      reset: vi.fn(), // Mock the `cache.reset` method
    },
  },
}));

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

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

describe('BadgeRecruitmentAdapter', () => {
  let adapter: BadgeRecruitmentAdapter;

  const mockTxHash = '0xTransactionHash';

  const SEASON_1 = 1;
  const SEASON_2 = 2;

  const mockEnabledRecruitmentIds = vi.mocked([0, 1, 2, 3]);

  beforeEach(() => {
    adapter = new BadgeRecruitmentAdapter();
    vi.clearAllMocks();
  });

  describe('fetchEnabledRecruitments', () => {
    it('should fetch enabled recruitments', async () => {
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          openRecruitments: [
            {
              id: 'abcde',
              enabled: true,
              badgeIds: [0, 1, 2, 3],
              startTime: 0,
              endTime: 1e10,
            },
          ],
        }),
      );

      const result = await adapter.fetchEnabledRecruitments();
      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: FETCH_ENABLED_MIGRATIONS_QUERY,
      });

      expect(result).toEqual(mockEnabledRecruitmentIds);
    });
  });

  describe('startRecruitment', () => {
    it('should start recruitment', async () => {
      const mockBadge = getMockBadge(SEASON_1, 1);
      const mockRecruitment: IBadgeRecruitment = {
        id: '1',
        badgeId: mockBadge.metadata.badgeId as number,
        status: RecruitmentStatus.ELIGIBLE,
        s1Badge: mockBadge,
        s2Badge: getMockBadge(SEASON_2, 2, Movements.Whale),
        whaleInfluences: 0,
        minnowInfluences: 0,
        claimExpirationTimeout: new Date('1970-01-01T01:01:00.000Z'),
        influenceExpirationTimeout: new Date('1970-01-01T00:31:00.000Z'),
      };

      const mockAddress = '0xAddress' as Address;
      const mockLogs = [
        {
          address: trailblazersBadgesAddress[chainId],
          topics: ['0x12345678'],
          blockHash: '0xBlockHash',
          blockNumber: BigInt(123456),
          data: '0xData',
          logIndex: 0,
          transactionHash: '0xTransactionHash',
          transactionIndex: 0,
          removed: false,
          args: {
            cooldownExpiration: BigInt(123456),
            s1TokenId: BigInt(1),
          },
        },
      ];

      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      const mockUnwatch = vi.fn();
      vi.mocked(watchContractEvent).mockImplementation((config, options) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options.onLogs(mockLogs as any[]);
        }, 0);
        return mockUnwatch;
      });

      const result = await adapter.startRecruitment(mockAddress, mockBadge, mockRecruitment);

      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: trailblazersBadgesAbi,
        address: trailblazersBadgesAddress[chainId],
        functionName: 'startRecruitment',
        args: [BigInt(mockBadge.metadata.badgeId as number)],
        chainId,
      });

      expect(result).toStrictEqual({
        badgeId: 1,
        claimExpirationTimeout: new Date('1970-01-02T10:17:36.000Z'),
        id: '1',
        influenceExpirationTimeout: new Date('1970-01-01T00:31:00.000Z'),
        minnowInfluences: 0,
        s1Badge: { ...mockBadge, tokenId: 1 },
        s2Badge: {
          address: trailblazersBadgesS2Address[chainId],
          metadata: {
            badgeId: 2,
            erc: 0,
            image: '/factions/bouncers/whale.png',
            movement: 1,
            season: 2,
            'video/mp4': '/factions/bouncers/whale.mp4',
            'video/webm': '/factions/bouncers/whale.webm',
          },
          tokenId: -1,
          tokenUri: '',
        },
        status: 'CAN_REFINE',
        whaleInfluences: 0,
      });

      expect(mockUnwatch).toHaveBeenCalled();
    });
  });

  describe('influenceRecruitment', () => {
    const mockTxHash: Hash = '0xTransactionHash' as Hash;
    const mockSignatureResponse = {
      data: {
        signature:
          '2c6404e913a67da2ed0d48d0d3e06c8a7bc0c2416bb22f4a6f4455e1d6c5d9a274b2c3b1c5b2d403f2ff490c1fd37eab2a5e2d197bd2190c8889a8a2e2fdf0e31b',
        points: 100,
      },
    };

    it('should influence recruitment with a valid transaction', async () => {
      const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';

      const mockBadge = getMockBadge(SEASON_1, 1);
      const mockRecruitment: IBadgeRecruitment = {
        id: '1',
        badgeId: mockBadge.metadata.badgeId as number,
        status: RecruitmentStatus.ELIGIBLE,
        s1Badge: mockBadge,
        s2Badge: getMockBadge(SEASON_2, 2, Movements.Whale),
        whaleInfluences: 0,
        minnowInfluences: 0,
        claimExpirationTimeout: new Date('1970-01-01T01:01:00.000Z'),
        influenceExpirationTimeout: new Date('1970-01-01T00:31:00.000Z'),
      };

      const mockLogs = [
        {
          address: trailblazersBadgesAddress[chainId],
          topics: ['0x12345678'],
          blockHash: '0xBlockHash',
          blockNumber: BigInt(123456),
          data: '0xData',
          logIndex: 0,
          transactionHash: '0xTransactionHash',
          transactionIndex: 0,
          removed: false,
          args: {
            influenceExpiration: BigInt(123456),
            whaleInfluences: 0,
            minnowInfluences: 0,
          },
        },
      ];

      const mockMovement = Movements.Dev;

      // Mock the signature response and parsing
      vi.mocked(axios.post).mockResolvedValue(mockSignatureResponse);
      vi.mocked(signMessage).mockResolvedValue('0xSignedChallenge');
      vi.mocked(readContract).mockResolvedValue('0xGeneratedClaimHash');
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      const mockUnwatch = vi.fn();
      vi.mocked(watchContractEvent).mockImplementation((config, options) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options.onLogs(mockLogs as any[]);
        }, 0);
        return mockUnwatch;
      });

      const result = await adapter.influenceRecruitment(mockAddress, mockBadge, mockMovement, mockRecruitment);

      expect(signMessage).toHaveBeenCalledWith(wagmiConfig, { message: expect.any(String) });

      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: badgeRecruitmentAbi,
        address: badgeRecruitmentAddress[chainId],
        functionName: 'influenceRecruitment',
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

      expect(result).toStrictEqual({
        badgeId: 1,
        claimExpirationTimeout: new Date('1970-01-01T01:01:00.000Z'),
        id: '1',
        influenceExpirationTimeout: new Date('1970-01-02T10:17:36.000Z'),
        minnowInfluences: 0,
        s1Badge: { ...mockBadge },
        s2Badge: {
          address: trailblazersBadgesS2Address[chainId],
          metadata: {
            badgeId: 2,
            erc: 0,
            image: '/factions/bouncers/whale.png',
            movement: 1,
            season: 2,
            'video/mp4': '/factions/bouncers/whale.mp4',
            'video/webm': '/factions/bouncers/whale.webm',
          },
          tokenId: -1,
          tokenUri: '',
        },
        status: RecruitmentStatus.ELIGIBLE,
        whaleInfluences: 0,
      });

      expect(mockUnwatch).toHaveBeenCalled();
    });
  });

  describe('endRecruitment', () => {
    const mockTxHash: Hash = '0xTransactionHash' as Hash;
    const mockSignatureResponse = {
      data: {
        signature:
          '2c6404e913a67da2ed0d48d0d3e06c8a7bc0c2416bb22f4a6f4455e1d6c5d9a274b2c3b1c5b2d403f2ff490c1fd37eab2a5e2d197bd2190c8889a8a2e2fdf0e31b',
        points: 100,
      },
    };

    it('should end recruitment with a valid transaction', async () => {
      const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';

      const mockBadge = getMockBadge(SEASON_1, 1);
      const mockRecruitment: IBadgeRecruitment = {
        id: '1',
        badgeId: mockBadge.metadata.badgeId as number,
        status: RecruitmentStatus.ELIGIBLE,
        s1Badge: mockBadge,
        s2Badge: getMockBadge(SEASON_2, 2, Movements.Whale),
        whaleInfluences: 0,
        minnowInfluences: 0,
        claimExpirationTimeout: new Date('1970-01-01T01:01:00.000Z'),
        influenceExpirationTimeout: new Date('1970-01-01T00:31:00.000Z'),
      };

      const mockLogs = [
        {
          address: trailblazersBadgesAddress[chainId],
          topics: ['0x12345678'],
          blockHash: '0xBlockHash',
          blockNumber: BigInt(123456),
          data: '0xData',
          logIndex: 0,
          transactionHash: '0xTransactionHash',
          transactionIndex: 0,
          removed: false,
          args: {
            s2TokenId: BigInt(2),
            finalColor: Movements.Minnow,
          },
        },
      ];

      // Mock the signature response and parsing
      vi.mocked(axios.post).mockResolvedValue(mockSignatureResponse);
      vi.mocked(signMessage).mockResolvedValue('0xSignedChallenge');
      vi.mocked(readContract).mockResolvedValue('0xGeneratedClaimHash');
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      const mockUnwatch = vi.fn();
      vi.mocked(watchContractEvent).mockImplementation((config, options) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options.onLogs(mockLogs as any[]);
        }, 0);
        return mockUnwatch;
      });

      const result = await adapter.endRecruitment(mockAddress, mockBadge, mockRecruitment);

      expect(signMessage).toHaveBeenCalledWith(wagmiConfig, { message: expect.any(String) });

      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: badgeRecruitmentAbi,
        address: badgeRecruitmentAddress[chainId],
        functionName: 'endRecruitment',
        args: [
          '0xGeneratedClaimHash',
          27,
          '0x2c6404e913a67da2ed0d48d0d3e06c8a7bc0c2416bb22f4a6f4455e1d6c5d9a2',
          '0x74b2c3b1c5b2d403f2ff490c1fd37eab2a5e2d197bd2190c8889a8a2e2fdf0e3',
          BigInt(mockSignatureResponse.data.points),
        ],
        chainId,
      });

      expect(result).toStrictEqual({
        badgeId: 1,
        claimExpirationTimeout: new Date('1970-01-01T01:01:00.000Z'),
        id: '1',
        influenceExpirationTimeout: new Date('1970-01-01T00:31:00.000Z'),
        minnowInfluences: 0,
        s1Badge: { ...mockBadge },
        s2Badge: {
          address: trailblazersBadgesAddress[chainId],
          metadata: {
            badgeId: 1,
            erc: 0,
            image: '/factions/robots/minnow.png',
            movement: Movements.Minnow,
            season: 2,
            'video/mp4': '/factions/robots/minnow.mp4',
            'video/webm': '/factions/robots/minnow.webm',
          },
          tokenId: 2,
          tokenUri: '',
        },
        status: RecruitmentStatus.COMPLETED,
        whaleInfluences: 0,
      });
    });

    describe('getRecruitmentStatus', () => {
      it('should fetch recruitment status', async () => {
        const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';

        vi.mocked(graphqlClient.query).mockResolvedValue({
          loading: false,
          networkStatus: 7,
          data: {
            account: {
              s2Recruitments: [
                {
                  id: '1',
                  s1Badge: { badgeId: 1, tokenId: 1 },
                  s2Badge: { badgeId: 2, tokenId: 2, movement: '1' },
                  isStarted: true,
                  isCompleted: false,
                  whaleInfluences: 0,
                  minnowInfluences: 0,
                  claimExpirationTimeout: 3600,
                  influenceExpirationTimeout: 1800,
                },
              ],
            },
          },
        });

        vi.spyOn(adapter, 'fetchEnabledRecruitments').mockResolvedValue([1, 2]);

        const result = await adapter.getRecruitmentStatus(mockAddress);

        expect(graphqlClient.query).toHaveBeenCalledWith({
          query: GET_MIGRATION_STATUS_QUERY,
          variables: { address: mockAddress.toLocaleLowerCase() },
          fetchPolicy: 'no-cache',
        });

        expect(result).toStrictEqual([
          {
            id: '1',
            badgeId: 1,
            status: RecruitmentStatus.CAN_CLAIM,
            s1Badge: {
              tokenId: 1,
              address: trailblazersBadgesAddress[chainId],
              metadata: generateBadgeMetadata(SEASON_1, 1),
              tokenUri: '',
            },
            s2Badge: {
              tokenId: 2,
              address: trailblazersBadgesAddress[chainId],
              metadata: generateBadgeMetadata(SEASON_2, 2, Movements.Whale),
              tokenUri: '',
            },
            whaleInfluences: 0,
            minnowInfluences: 0,
            claimExpirationTimeout: new Date('1970-01-01T01:00:00.000Z'),
            influenceExpirationTimeout: new Date('1970-01-01T00:30:00.000Z'),
          },
          {
            badgeId: 2,
            status: RecruitmentStatus.NOT_STARTED,
          },
        ]);
      });
    });
  });
});
