import { beforeEach,describe, expect, it, vi } from 'vitest';

import { DappLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/DappLeaderboardAdapter';
import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { mapDappLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { DappLeaderboardRepository } from '$lib/domains/leaderboard/repository/DappLeaderboardRepository';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

import { DappLeaderboardService } from './DappLeaderboardService';

// Mock the dependencies
vi.mock('$lib/domains/leaderboard/mapper/mapper', () => ({
  mapDappLeaderboardRow: vi.fn(),
}));

describe('DappLeaderboardService', () => {
  let service: DappLeaderboardService;
  let mockLeaderboardAdapter: Partial<DappLeaderboardAdapter>;
  let mockProtocolAdapter: Partial<ProtocolAdapter>;
  let mockLeaderboardRepository: Partial<DappLeaderboardRepository>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockLeaderboardAdapter = {
      fetchLeaderboardData: vi.fn(),
    };

    mockProtocolAdapter = {
      fetchProtocolDetails: vi.fn(),
    };

    mockLeaderboardRepository = {
      update: vi.fn(),
    };

    service = new DappLeaderboardService(
      mockLeaderboardAdapter as DappLeaderboardAdapter,
      mockProtocolAdapter as ProtocolAdapter,
      mockLeaderboardRepository as DappLeaderboardRepository,
    );
  });

  it('should fetch leaderboard data, process it, and update the repository', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 2,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: DappLeaderboardItem[] = [
      { address: '0x123', score: 100, slug: 'protocol-1' },
      { address: '0x456', score: 200, slug: 'protocol-2' },
    ];

    const leaderboardData: PaginationInfo<DappLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
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
      address: '0x123',
      icon: 'https://example.com/protocol1.png',
      handle: '@protocol1',
      data: protocolDetails1.protocols,
      name: 'Protocol 1',
      totalScore: 100,
    };

    const mappedRow2: UnifiedLeaderboardRow = {
      address: '0x456',
      icon: 'https://example.com/protocol2.png',
      handle: '@protocol2',
      data: protocolDetails2.protocols,
      name: 'Protocol 2',
      totalScore: 200,
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);
    vi.mocked(mockProtocolAdapter.fetchProtocolDetails!)
      .mockResolvedValueOnce(protocolDetails1)
      .mockResolvedValueOnce(protocolDetails2);

    vi.mocked(mapDappLeaderboardRow).mockReturnValueOnce(mappedRow1).mockReturnValueOnce(mappedRow2);

    // When
    const result = await service.getDappLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenCalledTimes(2);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenNthCalledWith(1, 'protocol-1', season);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenNthCalledWith(2, 'protocol-2', season);
    expect(mapDappLeaderboardRow).toHaveBeenCalledTimes(2);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: { ...leaderboardData },
    });
    expect(result).toEqual({
      items: [mappedRow1, mappedRow2],
      lastUpdated: expect.any(Number),
      pagination: { ...leaderboardData },
    });
  });

  it('should handle errors from fetchProtocolDetails and continue processing other items', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 2,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: DappLeaderboardItem[] = [
      { address: '0x123', score: 100, slug: 'protocol-1' },
      { address: '0x456', score: 200, slug: 'protocol-2' },
    ];

    const leaderboardData: PaginationInfo<DappLeaderboardItem> = {
      items: leaderboardItems,
      page: 0,
      size: 2,
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

    const mockError = new Error('Protocol Details Fetch Error');

    const mappedRow1: UnifiedLeaderboardRow = {
      address: '0x123',
      icon: 'https://example.com/protocol1.png',
      handle: '@protocol1',
      data: protocolDetails1.protocols,
      name: 'Protocol 1',
      totalScore: 100,
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);
    vi.mocked(mockProtocolAdapter.fetchProtocolDetails!)
      .mockResolvedValueOnce(protocolDetails1)
      .mockRejectedValueOnce(mockError);

    vi.mocked(mapDappLeaderboardRow).mockReturnValueOnce(mappedRow1);

    // When
    const result = await service.getDappLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenCalledTimes(2);
    expect(mapDappLeaderboardRow).toHaveBeenCalledTimes(1);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [mappedRow1],
      lastUpdated: expect.any(Number),
      pagination: { ...leaderboardData },
    });
    expect(result).toEqual({
      items: [mappedRow1],
      lastUpdated: expect.any(Number),
      pagination: { ...leaderboardData },
    });
  });

  it('should handle empty leaderboard data gracefully', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 0,
    };
    const season = 1;

    const leaderboardData: PaginationInfo<DappLeaderboardItem> = {
      items: [],
      page: 0,
      size: 10,
      total: 0,
    };

    // Mock the adapter methods
    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockResolvedValue(leaderboardData);

    // When
    const result = await service.getDappLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchProtocolDetails).not.toHaveBeenCalled();
    expect(mapDappLeaderboardRow).not.toHaveBeenCalled();
    expect(mockLeaderboardRepository.update).not.toHaveBeenCalled();
    expect(result).toBeUndefined(); // Since the method returns nothing if there are no items
  });

  it('should handle errors from fetchLeaderboardData gracefully', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 100,
    };
    const season = 1;
    const mockError = new Error('Network Error');

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData!).mockRejectedValue(mockError);

    // When
    let error: Error | null = null;
    try {
      await service.getDappLeaderboardData(args, season);
    } catch (err) {
      error = err as Error;
    }

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(error).toBe(mockError);
    expect(mockProtocolAdapter.fetchProtocolDetails).not.toHaveBeenCalled();
    expect(mapDappLeaderboardRow).not.toHaveBeenCalled();
    expect(mockLeaderboardRepository.update).not.toHaveBeenCalled();
  });
});
