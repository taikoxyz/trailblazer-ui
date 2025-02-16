import { beforeEach,describe, expect, it, vi } from 'vitest';

import { API_KEY } from '$env/static/private';
import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { fetchFromApi } from '$shared/services/api/fetchClient';

import { DappCompetitionAdapter } from './DappCompetitionAdapter.server';

// Mock the fetchFromApi function
vi.mock('$shared/services/api/fetchClient', () => ({
  fetchFromApi: vi.fn(),
}));

describe('DappCompetitionAdapter', () => {
  let adapter: DappCompetitionAdapter;
  const competitionUrl = 'thrillblazer';
  const edition = 3; // This will cause the adapter to append "-3" to the slug.
  const season = 1;
  const args: PaginationInfo<DappLeaderboardItem> = {
    items: [],
    page: 0,
    size: 2,
    total: 2,
  };

  beforeEach(() => {
    adapter = new DappCompetitionAdapter(competitionUrl, edition);
    vi.clearAllMocks();
  });

  it('should call fetchFromApi with the correct endpoint and return data', async () => {
    // Given a fake API response
    const fakeResponse: DappLeaderboardPageApiResponse = {
      data: {
        items: [
          { name: 'Dapp 1', score: 100, slug: 'dapp-1', rank: 1 },
          { name: 'Dapp 2', score: 200, slug: 'dapp-2', rank: 2 },
        ],
        page: 0,
        size: 2,
        total: 2,
      },
      lastUpdated: Date.now(),
    };
    vi.mocked(fetchFromApi).mockResolvedValue(fakeResponse);

    // Build expected endpoint
    const params = new URLSearchParams(
      Object.entries(args)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)]),
    );
    const expectedSlug = edition < 3 ? competitionUrl : `${competitionUrl}-${edition}`;
    const expectedEndpoint = `/v2/leaderboard/competition/${expectedSlug}?${params.toString()}`;

    // When
    const result = await adapter.fetchCompetitionData(args, season);

    // Then
    expect(fetchFromApi).toHaveBeenCalledWith(expectedEndpoint, season, {
      method: 'GET',
      headers: { 'x-api-key': `${API_KEY}` },
    });
    expect(result).toEqual({
      ...fakeResponse.data,
      items: fakeResponse.data.items,
    });
  });

  it('should return default data if response is null', async () => {
    vi.mocked(fetchFromApi).mockResolvedValue(null);
    const result = await adapter.fetchCompetitionData(args, season);
    expect(result).toEqual({ ...args, items: [], total: 0 });
  });

  it('should return default data if response.data is undefined', async () => {
    vi.mocked(fetchFromApi).mockResolvedValue({});
    const result = await adapter.fetchCompetitionData(args, season);
    expect(result).toEqual({ ...args, items: [], total: 0 });
  });

  it('should catch errors and return default data', async () => {
    vi.mocked(fetchFromApi).mockRejectedValue(new Error('Test error'));
    const result = await adapter.fetchCompetitionData(args, season);
    expect(result).toEqual({ ...args, items: [], total: 0 });
  });
});
