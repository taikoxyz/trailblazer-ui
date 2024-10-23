import type { AxiosInstance } from 'axios';
import { zeroAddress } from 'viem';

import { UserLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/UserLeaderboardAdapter';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

vi.mock('$lib/shared/services/api/axiosClient', () => ({
  getAxiosInstance: vi.fn(),
  globalAxiosConfig: {},
}));

describe('UserLeaderboardAdapter', () => {
  let leaderboardAdapter: UserLeaderboardAdapter;

  beforeEach(() => {
    leaderboardAdapter = new UserLeaderboardAdapter();
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

      // When
      const result = await leaderboardAdapter.fetchLeaderboardData(input, season);

      // Then
      expect(getAxiosInstance).toHaveBeenCalledWith(season);
      expect(mockClient.get).toHaveBeenCalledWith('/v2/leaderboard/user', {
        ...globalAxiosConfig,
        params: input,
      });
      expect(result).toEqual(mockLeaderboardData.data);
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
      expect(mockClient.get).toHaveBeenCalledWith('/v2/leaderboard/user', {
        ...globalAxiosConfig,
        params: input,
      });
    });
  });
});
