import { writable } from 'svelte/store';
import type { Mocked } from 'vitest';

import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import { CexCompetitionAdapter } from '../../adapter/server/CexCompetitionAdapter.server';
import { mapCexLeaderboardRow } from '../../mapper/mapper';
import { CexCompetitionRepository } from '../../repository/CexCompetitionRepository';
import { type CexCompetitionItem, type CexCompetitionPage,CexCompetitionType } from '../../types/cex/types';
import { type CexCompetitionArgs } from '../../types/competition/types';
import type { UnifiedLeaderboardRow } from '../../types/shared/types';
import { getSeasonForCexEdition } from '../../utils/mapEditionToSeason';
import { CexCompetitionService } from './CexCompetitionService.server.';

vi.mock('../../adapter/server/CexCompetitionAdapter.server');
vi.mock('../../repository/CexCompetitionRepository');
vi.mock('../../mapper/mapper', () => ({
  mapCexLeaderboardRow: vi.fn(),
}));

describe('CexCompetitionService', () => {
  let service: CexCompetitionService;
  let mockAdapter: Mocked<CexCompetitionAdapter>;
  let mockRepository: Mocked<CexCompetitionRepository>;

  beforeEach(() => {
    vi.clearAllMocks();
    // For testing, use edition 2 as an example.
    mockAdapter = new CexCompetitionAdapter('dummy', 2) as Mocked<CexCompetitionAdapter>;
    const mockStore = writable<CexCompetitionPage>({
      items: [],
      lastUpdated: Date.now(),
      pagination: { page: 0, size: 10, total: 0 },
    });
    mockRepository = new CexCompetitionRepository(mockStore) as Mocked<CexCompetitionRepository>;
    service = new CexCompetitionService(mockAdapter, mockRepository);
  });

  it('should fetch leaderboard data, map it, and update the repository', async () => {
    // Given
    const args: CexCompetitionArgs = {
      competitionType: CexCompetitionType.SPOT,
      edition: 1,
      pagination: { page: 0, size: 10, total: 100 },
    };

    const season = getSeasonForCexEdition(args.edition);

    const leaderboardItems: CexCompetitionItem[] = [
      { name: 'Exchange 1', score: 150, rank: 1, icon: 'icon1.png' },
      { name: 'Exchange 2', score: 250, rank: 2, icon: 'icon2.png' },
    ];
    const leaderboardData: PaginationInfo<CexCompetitionItem> = {
      items: leaderboardItems,
      page: 0,
      size: 10,
      total: 100,
    };

    const mappedRow1: UnifiedLeaderboardRow = {
      icon: 'icon1.png',
      handle: '',
      data: [],
      name: 'Exchange 1',
      totalScore: 150,
      rank: 1,
    };
    const mappedRow2: UnifiedLeaderboardRow = {
      icon: 'icon2.png',
      handle: '',
      data: [],
      name: 'Exchange 2',
      totalScore: 250,
      rank: 2,
    };

    mockAdapter.fetchLeaderboardData.mockResolvedValue(leaderboardData);
    vi.mocked(mapCexLeaderboardRow).mockReturnValueOnce(mappedRow1).mockReturnValueOnce(mappedRow2);

    // When
    const result = await service.getCompetitionData(args);

    // Then
    expect(mockAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args.pagination, CexCompetitionType.SPOT, season);
    // Expect repository.update to be called with a leaderboard page that includes the mapped rows.
    expect(mockRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData,
    });
    expect(result).toEqual({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData,
    });
  });

  it('should throw an error if fetching leaderboard data fails', async () => {
    const args: CexCompetitionArgs = {
      competitionType: CexCompetitionType.SPOT,
      edition: 1,
      pagination: { page: 0, size: 10, total: 100 },
    };
    mockAdapter.fetchLeaderboardData.mockRejectedValue(new Error('Test error'));

    await expect(service.getCompetitionData(args)).rejects.toThrow('Failed to fetch competition data');
  });
});
