import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GamingLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/GamingLeaderboardAdapter';
import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { GamingLeaderboardItem } from '$lib/domains/leaderboard/dto/gaming.dto';
import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { mapGamingDetails } from '$lib/domains/leaderboard/mapper/gamingDetailsMapper';
import { mapGamingLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { GamingLeaderboardRepository } from '$lib/domains/leaderboard/repository/GamingLeaderboardRepository';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { CommonPageApiResponse, PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

import { GamingLeaderboardService } from './GamingLeaderboardService';

// Mock the dependencies
vi.mock('$lib/domains/leaderboard/mapper/mapper', () => ({
  mapGamingLeaderboardRow: vi.fn(),
}));
vi.mock('$lib/domains/leaderboard/mapper/gamingDetailsMapper', () => ({
  mapGamingDetails: vi.fn(),
}));

describe('GamingLeaderboardService', () => {
  let service: GamingLeaderboardService;
  let mockLeaderboardAdapter: Partial<GamingLeaderboardAdapter>;
  let mockProtocolAdapter: Partial<ProtocolAdapter>;
  let mockLeaderboardRepository: Partial<GamingLeaderboardRepository>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockLeaderboardAdapter = {
      fetchLeaderboardData: vi.fn(),
    };

    mockProtocolAdapter = {
      fetchGamingProtocolDetails: vi.fn(),
    };

    mockLeaderboardRepository = {
      update: vi.fn(),
    };

    service = new GamingLeaderboardService(
      mockLeaderboardAdapter as GamingLeaderboardAdapter,
      mockProtocolAdapter as ProtocolAdapter,
      mockLeaderboardRepository as GamingLeaderboardRepository,
    );
  });

  it('should fetch leaderboard data, map it, and update the repository', async () => {
    // Given
    const args: PaginationInfo<GamingLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: GamingLeaderboardItem[] = [
      { address: '0x123', score: 100, rank: 1, slug: 'protocol-1' },
      { address: '0x456', score: 200, rank: 2, slug: 'protocol-2' },
    ];

    const leaderboardData: CommonPageApiResponse<GamingLeaderboardItem> = {
      data: {
        items: leaderboardItems,
        page: 0,
        size: 10,
        total: 100,
      },
      lastUpdated: 1730244198,
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
      address: '0x123',
      icon: 'https://example.com/protocol1.png',
      handle: '@protocol1',
      data: protocolDetails1.protocols,
      name: 'Protocol 1',
      totalScore: 100,
      rank: 1,
    };

    const mappedRow2: UnifiedLeaderboardRow = {
      address: '0x456',
      icon: 'https://example.com/protocol2.png',
      handle: '@protocol2',
      data: protocolDetails2.protocols,
      name: 'Protocol 2',
      totalScore: 200,
      rank: 2,
    };

    const additionalDetails1 = {
      handle: '@protocol1_additional',
      icon: 'https://example.com/protocol1_additional.png',
    };

    const additionalDetails2 = {
      handle: '@protocol2_additional',
      icon: 'https://example.com/protocol2_additional.png',
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);
    vi.mocked(mockProtocolAdapter.fetchGamingProtocolDetails!)
      .mockResolvedValueOnce(protocolDetails1)
      .mockResolvedValueOnce(protocolDetails2);

    vi.mocked(mapGamingLeaderboardRow)
      .mockReturnValueOnce({ ...mappedRow1 })
      .mockReturnValueOnce({ ...mappedRow2 });

    vi.mocked(mapGamingDetails).mockReturnValueOnce(additionalDetails1).mockReturnValueOnce(additionalDetails2);

    // When
    const result = await service.getGamingLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchGamingProtocolDetails).toHaveBeenCalledTimes(2);
    expect(mockProtocolAdapter.fetchGamingProtocolDetails).toHaveBeenNthCalledWith(1, 'protocol-1', season);
    expect(mockProtocolAdapter.fetchGamingProtocolDetails).toHaveBeenNthCalledWith(2, 'protocol-2', season);
    expect(mapGamingLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mapGamingDetails).toHaveBeenCalledTimes(2);

    // Verify that additional details were added to the unified rows
    const expectedRow1 = { ...mappedRow1, ...additionalDetails1 };
    const expectedRow2 = { ...mappedRow2, ...additionalDetails2 };

    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [expectedRow1, expectedRow2],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data, // Ensure pagination matches the service
    });

    expect(result).toEqual({
      items: [expectedRow1, expectedRow2],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });
  });

  it('should handle errors from fetchGamingProtocolDetails and continue processing other items', async () => {
    // Given
    const args: PaginationInfo<GamingLeaderboardItem> = {
      page: 0,
      size: 2,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: GamingLeaderboardItem[] = [
      { address: '0x123', score: 100, rank: 1, slug: 'protocol-1' },
      { address: '0x456', score: 200, rank: 2, slug: 'protocol-2' },
    ];

    const leaderboardData: CommonPageApiResponse<GamingLeaderboardItem> = {
      data: {
        items: leaderboardItems,
        page: 0,
        size: 2,
        total: 100,
      },
      lastUpdated: 1730244198,
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

    const mappedRow1: UnifiedLeaderboardRow = {
      address: '0x123',
      icon: 'https://example.com/protocol1.png',
      handle: '@protocol1',
      data: protocolDetails1.protocols,
      name: 'Protocol 1',
      totalScore: 100,
      rank: 1,
    };

    const additionalDetails1 = {
      handle: '@protocol1_additional',
      icon: 'https://example.com/protocol1_additional.png',
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    // Mock fetchGamingProtocolDetails: first call succeeds, second call fails
    vi.mocked(mockProtocolAdapter.fetchGamingProtocolDetails!)
      .mockResolvedValueOnce(protocolDetails1)
      .mockRejectedValueOnce(new Error('Failed to fetch protocol details'));

    vi.mocked(mapGamingLeaderboardRow).mockReturnValueOnce({ ...mappedRow1 });
    vi.mocked(mapGamingDetails).mockReturnValueOnce(additionalDetails1);

    // When
    const result = await service.getGamingLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchGamingProtocolDetails).toHaveBeenCalledTimes(2);
    expect(mapGamingLeaderboardRow).toHaveBeenCalledTimes(1);
    expect(mapGamingDetails).toHaveBeenCalledTimes(1);

    const expectedRow1 = { ...mappedRow1, ...additionalDetails1 };

    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [expectedRow1],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });

    expect(result).toEqual({
      items: [expectedRow1],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });
  });
});
