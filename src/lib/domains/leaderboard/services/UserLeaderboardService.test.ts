import type { Address } from 'viem';

import { UserLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/UserLeaderboardAdapter';
import { mapUserLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { UserLeaderboardRepository } from '$lib/domains/leaderboard/repository/UserLeaderboardRepository';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import { ProfileService } from '$lib/domains/profile/services/ProfileService';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

import { UserLeaderboardService } from './UserLeaderboardService';
vi.mock('$lib/domains/profile/services/ProfileServiceInstance', () => ({
  default: {
    getUserInfoForLeaderboard: vi.fn(),
    getProfilePicture: vi.fn(),
  },
}));

vi.mock('$lib/domains/leaderboard/mapper/mapper', () => ({
  mapUserLeaderboardRow: vi.fn(),
}));

describe('UserLeaderboardService', () => {
  let service: UserLeaderboardService;
  let mockLeaderboardAdapter: UserLeaderboardAdapter;
  let mockProfileService: Partial<ProfileService>;
  let mockLeaderboardRepository: UserLeaderboardRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockLeaderboardAdapter = {
      fetchLeaderboardData: vi.fn(),
    } as UserLeaderboardAdapter;

    mockLeaderboardRepository = {
      update: vi.fn(),
      save: vi.fn(),
    } as unknown as UserLeaderboardRepository;

    // Use Partial<ProfileService> for the mock
    mockProfileService = {
      getUserInfoForLeaderboard: vi.fn(),
    };

    // Cast mockProfileService to ProfileService when passing to the constructor
    service = new UserLeaderboardService(
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

    const leaderboardData: PaginationInfo<UserLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
      total: 100,
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
    vi.mocked(mapUserLeaderboardRow).mockReturnValueOnce(mappedRow1).mockReturnValueOnce(mappedRow2);

    // When
    const result = await service.getUserLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).toHaveBeenCalledWith(
      leaderboardItems,
      leaderboardData.total,
      season,
    );
    expect(mapUserLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
      },
    });
    expect(result).toEqual({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
      },
    });
  });

  it('should handle empty leaderboard data gracefully', async () => {
    // Given
    const args: PaginationInfo<UserLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 0,
    };
    const season = 1;

    const leaderboardData: PaginationInfo<UserLeaderboardItem> = {
      items: [],
      page: 0,
      size: 10,
      total: 0,
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    // When
    const result = await service.getUserLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).not.toHaveBeenCalled();
    expect(mapUserLeaderboardRow).not.toHaveBeenCalled();
    expect(mockLeaderboardRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      items: [],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
        total_pages: leaderboardData.total_pages,
      },
    });
  });

  it('should handle errors from fetchLeaderboardData gracefully', async () => {
    // Given
    const args: PaginationInfo<UserLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 100,
    };
    const season = 1;
    const mockError = new Error('Network Error');

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockRejectedValue(mockError);

    // When
    const result = await service.getUserLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).not.toHaveBeenCalled();
    expect(mapUserLeaderboardRow).not.toHaveBeenCalled();
    expect(mockLeaderboardRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      items: [],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
      },
    });
  });

  it('should handle errors from getUserInfoForLeaderboard and return empty items', async () => {
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

    const leaderboardData: PaginationInfo<UserLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
      total: 100,
    };

    const mockError = new Error('Profile Service Error');

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    vi.mocked(mockProfileService.getUserInfoForLeaderboard!).mockRejectedValue(mockError);

    // When
    const result = await service.getUserLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).toHaveBeenCalledWith(
      leaderboardItems,
      leaderboardData.total,
      season,
    );
    expect(mapUserLeaderboardRow).not.toHaveBeenCalled();
    expect(mockLeaderboardRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      items: [],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
      },
    });
  });

  it('should handle missing user details and use default values', async () => {
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

    const leaderboardData: PaginationInfo<UserLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
      total: 100,
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
      // Missing details for '0x456'
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

    const defaultMappedRow: UnifiedLeaderboardRow = {
      address: '0x456',
      icon: '',
      level: '',
      rank: 2,
      title: '',
      data: [],
      totalScore: 200,
      handle: '',
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    vi.mocked(mockProfileService.getUserInfoForLeaderboard!).mockResolvedValue(userDetailsList);

    vi.mocked(mapUserLeaderboardRow).mockReturnValueOnce(mappedRow1).mockReturnValueOnce(defaultMappedRow);

    // When
    const result = await service.getUserLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).toHaveBeenCalledWith(
      leaderboardItems,
      leaderboardData.total,
      season,
    );
    expect(mapUserLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1, defaultMappedRow],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
      },
    });
    expect(result).toEqual({
      items: [mappedRow1, defaultMappedRow],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
      },
    });
  });

  it('should handle errors in mapUserLeaderboardRow and continue processing', async () => {
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

    const leaderboardData: PaginationInfo<UserLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
      total: 100,
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

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    vi.mocked(mockProfileService.getUserInfoForLeaderboard!).mockResolvedValue(userDetailsList);

    vi.mocked(mapUserLeaderboardRow)
      .mockReturnValueOnce(mappedRow1)
      .mockImplementationOnce(() => {
        throw new Error('Mapping Error');
      });

    // When
    const result = await service.getUserLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProfileService.getUserInfoForLeaderboard).toHaveBeenCalledWith(
      leaderboardItems,
      leaderboardData.total,
      season,
    );
    expect(mapUserLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
      },
    });
    expect(result).toEqual({
      items: [mappedRow1],
      lastUpdated: expect.any(Number),
      pagination: {
        ...args,
        total: leaderboardData.total,
      },
    });
  });
});
