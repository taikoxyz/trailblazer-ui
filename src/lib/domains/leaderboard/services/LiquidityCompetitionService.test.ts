import type { Address } from 'viem';

import type { ProfileService } from '$lib/domains/profile/services/ProfileService';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import type { CommonPageApiResponse, PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { LiquidityCompetitionAdapter } from '../adapter/LiquidityCompetitionAdapter';
import { mapLiquidityLeaderboardRow } from '../mapper/mapper';
import type { LiquidityCompetitionRepository } from '../repository/LiquidityCompetitionRepository';
import type { UnifiedLeaderboardRow } from '../types/shared/types';
import type { UserLeaderboardItem } from '../types/user/types';
import { LiquidityCompetitionService } from './LiquidityCompetitionService';

vi.mock('$lib/domains/profile/services/ProfileServiceInstance', () => ({
  default: {
    getUserInfoForLeaderboard: vi.fn(),
    getProfilePicture: vi.fn(),
  },
}));

vi.mock('$lib/domains/leaderboard/mapper/mapper', () => ({
  mapLiquidityLeaderboardRow: vi.fn(),
}));

describe('LiquidityCompetitionService', () => {
  let service: LiquidityCompetitionService;
  let mockLeaderboardAdapter: LiquidityCompetitionAdapter;
  let mockProfileService: Partial<ProfileService>;
  let mockLeaderboardRepository: LiquidityCompetitionRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockLeaderboardAdapter = {
      fetchLeaderboardData: vi.fn(),
      fetchLeaderboardPositionForAddress: vi.fn(),
    } as LiquidityCompetitionAdapter;

    mockLeaderboardRepository = {
      update: vi.fn(),
      save: vi.fn(),
    } as unknown as LiquidityCompetitionRepository;

    mockProfileService = {
      getUserInfoForLeaderboard: vi.fn(),
      getProfilePicture: vi.fn(),
    };

    service = new LiquidityCompetitionService(
      mockLeaderboardAdapter,
      mockLeaderboardRepository,
      mockProfileService as ProfileService,
    );
  });

  it('should fetch leaderboard data, process it, and update the repository', async () => {
    // Given
    const args: PaginationInfo<UserLeaderboardItem> = {
      page: 0,
      size: 2,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: UserLeaderboardItem[] = [
      { address: '0x123' as Address, score: 100, rank: 1 },
      { address: '0x456' as Address, score: 200, rank: 2 },
    ];

    const leaderboardData: CommonPageApiResponse<UserLeaderboardItem> = {
      data: {
        items: leaderboardItems,
        page: 0,
        size: 2,
        total: 100,
      },
      lastUpdated: Date.now(),
    };

    const userDetailsList: UserInfoForLeaderboard[] = [
      {
        address: '0x123' as Address,
        score: 100,
        rank: '1',
        title: 'Expert',
        level: '5',
        total: '100',
        rankPercentile: '99',
        profilePicture: 'https://example.com/avatar1.png',
      },
      {
        address: '0x456' as Address,
        score: 200,
        rank: '2',
        title: 'Master',
        level: '6',
        total: '100',
        rankPercentile: '98',
        profilePicture: 'https://example.com/avatar2.png',
      },
    ];

    const mappedRow1: UnifiedLeaderboardRow = {
      address: '0x123',
      icon: 'https://example.com/avatar1.png',
      level: '5',
      rank: 1,
      title: 'Expert',
      data: [],
      totalScore: 100,
      handle: '',
    };

    const mappedRow2: UnifiedLeaderboardRow = {
      address: '0x456',
      icon: 'https://example.com/avatar2.png',
      level: '6',
      rank: 2,
      title: 'Master',
      data: [],
      totalScore: 200,
      handle: '',
    };

    // Mock the adapter methods
    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    // Mock the profile service
    vi.mocked(mockProfileService.getUserInfoForLeaderboard!).mockResolvedValue(userDetailsList);

    // Mock the mapper function
    vi.mocked(mapLiquidityLeaderboardRow).mockReturnValueOnce(mappedRow1).mockReturnValueOnce(mappedRow2);

    // When
    const result = await service.getLiquidityCompetitionLeaderboard(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).toHaveBeenCalledWith(
      leaderboardItems,
      leaderboardData.data.total,
      season,
    );
    expect(mapLiquidityLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.data.total,
      },
    });
    expect(result).toEqual({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.data.total,
      },
    });
  });

  it('should fetch leaderboard data for a single address', async () => {
    // Given
    const address = '0x123' as Address;

    const season = 1;

    const leaderboardPosition: UserLeaderboardItem = { address, score: 200, rank: 2 };
    const leaderboardItems: UserLeaderboardItem[] = [leaderboardPosition];

    const leaderboardData: PaginationInfo<UserLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
      total: 100,
    };

    const mappedRow: UnifiedLeaderboardRow = {
      address,
      icon: '',
      level: '',
      rank: 2,
      title: '',
      data: [],
      totalScore: 200,
      handle: '',
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardPositionForAddress!).mockResolvedValue(leaderboardData);

    // Mock the profile service
    vi.mocked(mockProfileService.getProfilePicture!).mockResolvedValue(null);

    // Mock the mapper function
    vi.mocked(mapLiquidityLeaderboardRow).mockReturnValueOnce(mappedRow);

    // When
    const result = await service.getLiquidityCompetitionDataForAddress(season, address);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardPositionForAddress).toHaveBeenCalledWith(season, address);
    expect(result).toEqual(mappedRow);
  });
});
