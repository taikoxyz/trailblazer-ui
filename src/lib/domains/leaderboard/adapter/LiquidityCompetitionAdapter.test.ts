import type { AxiosInstance } from 'axios';
import { zeroAddress } from 'viem';

import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

import { LiquidityCompetitionAdapter } from './LiquidityCompetitionAdapter';

vi.mock('$lib/shared/services/api/axiosClient', () => ({
  getAxiosInstance: vi.fn(),
  globalAxiosConfig: {},
}));

describe('LiquidityCompetitionAdapter', () => {
  let leaderboardAdapter: LiquidityCompetitionAdapter;

  beforeEach(() => {
    leaderboardAdapter = new LiquidityCompetitionAdapter();
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
              rank: 1,
            },
            {
              address: zeroAddress,
              score: 90,
              rank: 2,
            },
          ],
          page: 0,
          size: 2,
          total: 2,
        },
        lastUpdated: 1730244198,
      };

      const mockResponse = {
        data: mockLeaderboardData,
      };

      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      const input: PaginationInfo<UserLeaderboardItem> = {
        page: 0,
        size: 2,
        total: 2,
      };

      const season = 1;

      const expectedResult = {
        data: {
          ...mockLeaderboardData.data,
        },
        lastUpdated: mockLeaderboardData.lastUpdated * 1000,
      };

      // When
      const result = await leaderboardAdapter.fetchLeaderboardData(input, season);

      // Then
      expect(getAxiosInstance).toHaveBeenCalledWith(season);
      expect(mockClient.get).toHaveBeenCalledWith('/v2/leaderboard/competition/liquidity', {
        ...globalAxiosConfig,
        params: input,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should handle API errors gracefully', async () => {
      // Given
      const mockError = new Error('API request failed');

      // Mock Axios client
      const mockClient = {
        get: vi.fn().mockRejectedValue(mockError),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      const input: PaginationInfo<UserLeaderboardItem> = {
        page: 0,
        size: 2,
        total: 2,
      };

      const season = 1;

      // When / Then
      await expect(leaderboardAdapter.fetchLeaderboardData(input, season)).rejects.toThrow('API request failed');

      expect(getAxiosInstance).toHaveBeenCalledWith(season);
      expect(mockClient.get).toHaveBeenCalledWith('/v2/leaderboard/competition/liquidity', {
        ...globalAxiosConfig,
        params: input,
      });
    });
  });
});
