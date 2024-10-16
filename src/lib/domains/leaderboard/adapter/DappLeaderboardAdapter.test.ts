import type { AxiosInstance } from 'axios';
import { zeroAddress } from 'viem';

import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

import { DappLeaderboardAdapter } from './DappLeaderboardAdapter';

vi.mock('$lib/shared/services/api/axiosClient', () => ({
  getAxiosInstance: vi.fn(),
  globalAxiosConfig: {},
}));

describe('DappLeaderboardAdapter', () => {
  let leaderboardAdapter: DappLeaderboardAdapter;

  beforeEach(() => {
    leaderboardAdapter = new DappLeaderboardAdapter();
    vi.clearAllMocks();
  });

  describe('fetchLeaderboardData', () => {
    it('should return leaderboard data', async () => {
      // Given
      const mockLeaderboardData = {
        data: {
          items: [
            {
              address: zeroAddress,
              score: 100,
              slug: 'dapp-1',
              rank: 1,
            },
            {
              address: zeroAddress,
              score: 200,
              slug: 'dapp-2',
              rank: 2,
            },
          ],
          page: 0,
          total: 2,
          size: 2,
        },
        lastUpdated: Date.now(),
      } satisfies DappLeaderboardPageApiResponse;

      const mockResponse = {
        data: mockLeaderboardData,
      };

      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      const input: PaginationInfo<DappLeaderboardItem> = {
        items: [],
        page: 0,
        size: 2,
        total: 2,
      };

      // When
      const result = await leaderboardAdapter.fetchLeaderboardData(input, 1);

      // Then
      expect(getAxiosInstance).toHaveBeenCalledWith(1);
      expect(mockClient.get).toHaveBeenCalledWith('/v2/leaderboard/dapp', {
        ...globalAxiosConfig,
        params: input,
      });
      expect(result).toEqual(mockLeaderboardData.data);
    });
  });
});
