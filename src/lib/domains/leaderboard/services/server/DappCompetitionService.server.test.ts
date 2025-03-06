import { writable } from 'svelte/store';
import type { Mocked } from 'vitest';

import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import { DappCompetitionAdapter } from '../../adapter/server/DappCompetitionAdapter.server';
import { ProtocolDetailsAdapter } from '../../adapter/server/ProtocolDetailsAdapter.server';
import type { DappLeaderboardItem } from '../../dto/dapps.dto';
import type { ProtocolApiResponse } from '../../dto/protocol.dto';
import { mapDappLeaderboardRow } from '../../mapper/mapper';
import { DappsCompetitionRepository } from '../../repository/DappsCompetitionRepository';
import { type DappCompetitionArgs, DappCompetitionType } from '../../types/competition/types';
import type { DappLeaderboardPage } from '../../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../../types/shared/types';
import { DappCompetitionService } from './DappCompetitionService.server';

vi.mock('$lib/domains/leaderboard/adapter/server/DappCompetitionAdapter.server');
vi.mock('$lib/domains/leaderboard/adapter/server/ProtocolDetailsAdapter.server');
vi.mock('$lib/domains/leaderboard/repository/DappsCompetitionRepository');
vi.mock('$lib/domains/leaderboard/mapper/mapper', () => ({
  mapDappLeaderboardRow: vi.fn(),
}));

describe('DappCompetitionService', () => {
  let service: DappCompetitionService;
  let mockCompetitionAdapter: Mocked<DappCompetitionAdapter>;
  let mockProtocolAdapter: Mocked<ProtocolDetailsAdapter>;
  let mockLeaderboardRepository: Mocked<DappsCompetitionRepository>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCompetitionAdapter = new DappCompetitionAdapter('dummy', 3) as Mocked<DappCompetitionAdapter>;
    mockProtocolAdapter = new ProtocolDetailsAdapter('dummy') as Mocked<ProtocolDetailsAdapter>;
    const mockStore = writable<DappLeaderboardPage>({
      items: [],
      lastUpdated: Date.now(),
      pagination: { page: 0, size: 10, total: 0 },
    });
    mockLeaderboardRepository = new DappsCompetitionRepository(mockStore) as Mocked<DappsCompetitionRepository>;
    service = new DappCompetitionService(mockCompetitionAdapter, mockProtocolAdapter, mockLeaderboardRepository);
  });

  it('should fetch leaderboard data, map it, and update the repository', async () => {
    // Given
    const args: DappCompetitionArgs = {
      competitionType: DappCompetitionType.THRILLBLAZER,
      edition: 3,
      pagination: { page: 0, size: 10, total: 100 },
    };
    const season = 3;

    const leaderboardItems: DappLeaderboardItem[] = [
      { name: 'Protocol 1', score: 100, rank: 1, slug: 'protocol-1' },
      { name: 'Protocol 2', score: 200, rank: 2, slug: 'protocol-2' },
    ];

    const leaderboardData: PaginationInfo<DappLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 10,
      total: 100,
    };

    const protocolDetails1: ProtocolApiResponse = {
      protocols: [{ address: '0xabc', score: 50 }],
      metadata: {
        name: 'Protocol 1',
        slug: 'protocol-1',
        twitter: '@protocol1',
        logo: 'https://example.com/protocol1.png',
      },
    };

    const protocolDetails2: ProtocolApiResponse = {
      protocols: [{ address: '0xdef', score: 75 }],
      metadata: {
        name: 'Protocol 2',
        slug: 'protocol-2',
        twitter: '@protocol2',
        logo: 'https://example.com/protocol2.png',
      },
    };

    const mappedRow1: UnifiedLeaderboardRow = {
      icon: 'https://example.com/protocol1.png',
      handle: '@protocol1',
      data: protocolDetails1.protocols,
      name: 'Protocol 1',
      totalScore: 100,
      rank: 1,
    };

    const mappedRow2: UnifiedLeaderboardRow = {
      icon: 'https://example.com/protocol2.png',
      handle: '@protocol2',
      data: protocolDetails2.protocols,
      name: 'Protocol 2',
      totalScore: 200,
      rank: 2,
    };

    mockCompetitionAdapter.fetchCompetitionData.mockResolvedValue(leaderboardData);
    mockProtocolAdapter.fetchProtocolDetails
      .mockResolvedValueOnce(protocolDetails1)
      .mockResolvedValueOnce(protocolDetails2);
    vi.mocked(mapDappLeaderboardRow).mockReturnValueOnce(mappedRow1).mockReturnValueOnce(mappedRow2);

    // When
    const result = await service.getCompetitionData(args);

    // Then
    expect(mockCompetitionAdapter.fetchCompetitionData).toHaveBeenCalledWith(args.pagination, season);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenCalledTimes(2);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenNthCalledWith(1, 'protocol-1', season, args.edition);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenNthCalledWith(2, 'protocol-2', season, args.edition);
    expect(mapDappLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
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
});
