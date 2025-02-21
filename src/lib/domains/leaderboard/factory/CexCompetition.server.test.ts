import { cexLeaderboardStore } from '../stores/cexCompetitionStore';
import { type CexCompetitionPage, CexCompetitionType } from '../types/cex/types';
import type { CexCompetitionArgs } from '../types/competition/types';
import { CexCompetition } from './CexCompetition.server';

// Mock the dependencies used in CexCompetition
vi.mock('../adapter/server/CexCompetitionAdapter.server');
vi.mock('../repository/CexCompetitionRepository');
vi.mock('../services/server/CexCompetitionService.server');

describe('CexCompetition', () => {
  let cexCompetition: CexCompetition;

  beforeEach(() => {
    vi.clearAllMocks();
    cexCompetition = new CexCompetition('dummyUrl', 'dummyProtocolUrl', 'Test Title', 2);
  });

  it('should return the same store instance from getStore()', () => {
    expect(cexCompetition.getStore()).toBe(cexLeaderboardStore);
  });

  it('should call service.getCompetitionData when fetchCompetitionData is invoked', async () => {
    // Given
    const args: CexCompetitionArgs = {
      competitionType: CexCompetitionType.SPOT,
      edition: 1,
      pagination: { page: 0, size: 10, total: 100 },
    };

    const fakePage: CexCompetitionPage = {
      items: [{ name: 'Test Exchange', totalScore: 123, rank: 1, icon: 'icon.png', data: [] }],
      lastUpdated: Date.now(),
      pagination: args.pagination,
    };

    // Spy on the service method inside the CexCompetition instance.
    const serviceGetSpy = vi.spyOn(cexCompetition['service'], 'getCompetitionData').mockResolvedValue(fakePage);

    // When
    const result = await cexCompetition.fetchCompetitionData(args);

    // Then
    expect(serviceGetSpy).toHaveBeenCalledWith(args);
    expect(result).toEqual(fakePage);
  });
});
