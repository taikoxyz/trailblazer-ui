import type { AxiosInstance } from 'axios';
import { zeroAddress } from 'viem';

import { GamingLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/GamingLeaderboardAdapter';
import type { GamingLeaderboardItem, GamingLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/gaming.dto';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

vi.mock('$lib/shared/services/api/axiosClient', () => ({
  getAxiosInstance: vi.fn(),
  globalAxiosConfig: {},
}));

describe('GamingLeaderboardAdapter', () => {
  let leaderboardAdapter: GamingLeaderboardAdapter;

  beforeEach(() => {
    leaderboardAdapter = new GamingLeaderboardAdapter();
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
              score: 150,
              slug: 'game-1',
              rank: 1,
            },
            {
              address: zeroAddress,
              score: 250,
              slug: 'game-2',
              rank: 2,
            },
          ],
          page: 0,
          total: 2,
          size: 2,
        },
        lastUpdated: Date.now(),
      } satisfies GamingLeaderboardPageApiResponse;

      const mockResponse = {
        data: mockLeaderboardData,
      };

      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      const input: PaginationInfo<GamingLeaderboardItem> = {
        items: [],
        page: 0,
        size: 2,
        total: 2,
      };

      const expectedResult = {
        data: {
          ...mockLeaderboardData.data,
        },
        lastUpdated: mockLeaderboardData.lastUpdated * 1000,
      };

      // When
      const result = await leaderboardAdapter.fetchLeaderboardData(input, 1);

      // Then
      expect(getAxiosInstance).toHaveBeenCalledWith(1);
      expect(mockClient.get).toHaveBeenCalledWith('/v2/leaderboard/gaming', {
        ...globalAxiosConfig,
        params: input,
      });
      expect(result).toEqual(expectedResult);
    });
  });
});
