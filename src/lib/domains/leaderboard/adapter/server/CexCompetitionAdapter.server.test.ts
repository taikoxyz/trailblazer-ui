import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_KEY } from '$env/static/private';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { fetchFromApi } from '$shared/services/api/fetchClient';

import type { CexLeaderboardPageApiResponse } from '../../dto/cex.dto';
import { type CexCompetitionItem, CexCompetitionType } from '../../types/cex/types';
import { CexCompetitionAdapter } from './CexCompetitionAdapter.server';

vi.mock('$shared/services/api/fetchClient', () => ({
  fetchFromApi: vi.fn(),
}));

describe('CexCompetitionAdapter', () => {
  let adapter: CexCompetitionAdapter;
  const competitionUrl = 'cexTest';
  const edition = 2;
  const season = 1;
  const args: PaginationInfo<CexCompetitionItem> = {
    items: [],
    page: 0,
    size: 10,
    total: 100,
  };
  const competitionType: CexCompetitionType = CexCompetitionType.SPOT;

  beforeEach(() => {
    adapter = new CexCompetitionAdapter(competitionUrl, edition);
    vi.clearAllMocks();
  });

  describe('fetchLeaderboardData', () => {
    it('should call fetchFromApi with the correct endpoint and return data', async () => {
      // Given
      const fakeResponse: CexLeaderboardPageApiResponse = {
        data: {
          items: [
            { name: 'Exchange 1', score: 150, rank: 1, icon: 'icon1.png' },
            { name: 'Exchange 2', score: 250, rank: 2, icon: 'icon2.png' },
          ],
          page: 0,
          size: 10,
          total: 100,
        },
        lastUpdated: Date.now(),
      };
      vi.mocked(fetchFromApi).mockResolvedValue(fakeResponse);

      // Build expected endpoint:
      const params = new URLSearchParams(
        Object.entries(args)
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      );
      const expectedEndpoint = `/v2/leaderboard/competition/cex/${competitionType}?${params.toString()}`;

      // When
      const result = await adapter.fetchLeaderboardData(args, competitionType, season);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith(expectedEndpoint, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      expect(result).toEqual({
        ...fakeResponse.data,
        items: fakeResponse.data.items || [],
      });
    });

    it('should return default data if response is null or missing data', async () => {
      // Given
      vi.mocked(fetchFromApi).mockResolvedValue(null);
      const resultNull = await adapter.fetchLeaderboardData(args, competitionType, season);
      expect(resultNull).toEqual({ ...args, items: [], total: 0 });

      vi.mocked(fetchFromApi).mockResolvedValue({});

      // When
      const resultUndefined = await adapter.fetchLeaderboardData(args, competitionType, season);

      // Then
      expect(resultUndefined).toEqual({ ...args, items: [], total: 0 });
    });

    it('should catch errors and return default data', async () => {
      // Given
      vi.mocked(fetchFromApi).mockRejectedValue(new Error('Test error'));

      // When
      const result = await adapter.fetchLeaderboardData(args, competitionType, season);

      // Then
      expect(result).toEqual({ ...args, items: [], total: 0 });
    });
  });

  describe('fetchLeaderboardPositionForAddress', () => {
    it('should call fetchFromApi with the correct endpoint and return data', async () => {
      // Given
      const exchange = 'TestExchange';
      const params = new URLSearchParams({ name: exchange });
      const expectedEndpoint = `/v2/leaderboard/competition/cex/${competitionType}?${params.toString()}`;

      const fakeResponse: CexLeaderboardPageApiResponse = {
        data: {
          items: [{ name: 'Test Exchange', score: 150, rank: 1, icon: 'icon.png' }],
          page: 0,
          size: 10,
          total: 100,
        },
        lastUpdated: Date.now(),
      };
      vi.mocked(fetchFromApi).mockResolvedValue(fakeResponse);

      // When
      const result = await adapter.fetchLeaderboardPositionForAddress(season, competitionType, exchange);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith(expectedEndpoint, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      expect(result).toEqual(fakeResponse.data);
    });

    it('should return default data if response is null or missing data', async () => {
      // Given
      vi.mocked(fetchFromApi).mockResolvedValue(null);
      const resultNull = await adapter.fetchLeaderboardPositionForAddress(season, competitionType, 'TestExchange');
      expect(resultNull).toEqual({ page: 0, size: 10, total: 0, items: [] });

      vi.mocked(fetchFromApi).mockResolvedValue({});

      // When
      const resultUndefined = await adapter.fetchLeaderboardPositionForAddress(season, competitionType, 'TestExchange');

      // Then
      expect(resultUndefined).toEqual({ page: 0, size: 10, total: 0, items: [] });
    });
  });
});
