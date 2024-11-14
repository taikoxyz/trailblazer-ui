import type { Mocked } from 'vitest';

import { DappLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/DappLeaderboardAdapter';
import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { mapDappLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { DappLeaderboardRepository } from '$lib/domains/leaderboard/repository/DappLeaderboardRepository';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { CommonPageApiResponse, PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

import { DappLeaderboardService } from './DappLeaderboardService';

vi.mock('$lib/domains/leaderboard/adapter/DappLeaderboardAdapter');
vi.mock('$lib/domains/leaderboard/adapter/ProtocolAdapter');
vi.mock('$lib/domains/leaderboard/repository/DappLeaderboardRepository');
vi.mock('$lib/domains/leaderboard/mapper/mapper', () => ({
  mapDappLeaderboardRow: vi.fn(),
}));

describe('DappLeaderboardService', () => {
  let service: DappLeaderboardService;
  let mockLeaderboardAdapter: Mocked<DappLeaderboardAdapter>;
  let mockProtocolAdapter: Mocked<ProtocolAdapter>;
  let mockLeaderboardRepository: Mocked<DappLeaderboardRepository>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockLeaderboardAdapter = new DappLeaderboardAdapter() as Mocked<DappLeaderboardAdapter>;
    mockProtocolAdapter = new ProtocolAdapter() as Mocked<ProtocolAdapter>;
    mockLeaderboardRepository = new DappLeaderboardRepository() as Mocked<DappLeaderboardRepository>;

    service = new DappLeaderboardService(mockLeaderboardAdapter, mockProtocolAdapter, mockLeaderboardRepository);
  });

  it.skip('should fetch leaderboard data, map it, and update the repository', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: DappLeaderboardItem[] = [
      { name: 'Protocol 1', score: 100, rank: 1, slug: 'protocol-1' },
      { name: 'Protocol 2', score: 200, rank: 2, slug: 'protocol-2' },
    ];

    const leaderboardData: CommonPageApiResponse<DappLeaderboardItem> = {
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

    mockLeaderboardAdapter.fetchLeaderboardData.mockResolvedValue(leaderboardData);
    mockProtocolAdapter.fetchProtocolDetails
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
      lastUpdated: 1730244198,
      pagination: leaderboardData.data,
    });
    expect(result).toEqual({
      items: [mappedRow1, mappedRow2],
      lastUpdated: 1730244198,
      pagination: leaderboardData.data,
    });
  });

  it.skip('should handle errors from fetchLeaderboardData gracefully', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 10,
      total: 100,
    };
    const season = 1;
    const mockError = new Error('Network Error');

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData).mockRejectedValue(mockError);

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

  it.skip('should handle errors from fetchProtocolDetails and continue processing other items', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 2,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: DappLeaderboardItem[] = [
      { name: 'Protocol 1', score: 100, rank: 1, slug: 'protocol-1' },
      { name: 'Protocol 2', score: 200, rank: 2, slug: 'protocol-2' },
    ];

    const leaderboardData: CommonPageApiResponse<DappLeaderboardItem> = {
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

    const mockError = new Error('Protocol Details Fetch Error');

    const mappedRow1: UnifiedLeaderboardRow = {
      icon: 'https://example.com/protocol1.png',
      handle: '@protocol1',
      data: protocolDetails1.protocols,
      name: 'Protocol 1',
      totalScore: 100,
      rank: 1,
    };

    // Mock the adapter methods
    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData).mockResolvedValue(leaderboardData);
    vi.mocked(mockProtocolAdapter.fetchProtocolDetails)
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
      pagination: leaderboardData.data,
    });
    expect(result).toEqual({
      items: [mappedRow1],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });
  });

  it.skip('should handle unexpected data from mapDappLeaderboardRow', async () => {
    // Given
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: 1,
      total: 100,
    };
    const season = 1;

    const leaderboardItems: DappLeaderboardItem[] = [{ name: 'Protocol 1', score: 100, rank: 1, slug: 'protocol-1' }];

    const leaderboardData: CommonPageApiResponse<DappLeaderboardItem> = {
      data: {
        items: leaderboardItems,
        page: 0,
        size: 1,
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

    const unexpectedMappedRow = {} as UnifiedLeaderboardRow;

    // Mock the adapter methods
    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData).mockResolvedValue(leaderboardData);
    vi.mocked(mockProtocolAdapter.fetchProtocolDetails).mockResolvedValue(protocolDetails1);

    vi.mocked(mapDappLeaderboardRow).mockReturnValueOnce(unexpectedMappedRow);

    // When
    const result = await service.getDappLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenCalledTimes(1);
    expect(mapDappLeaderboardRow).toHaveBeenCalledTimes(1);
    expect(mockLeaderboardRepository.update).toHaveBeenCalledWith({
      items: [unexpectedMappedRow],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });
    expect(result).toEqual({
      items: [unexpectedMappedRow],
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });
  });

  it.skip('should process a large dataset efficiently', async () => {
    // Given

    const dataSize = 50;
    const args: PaginationInfo<DappLeaderboardItem> = {
      page: 0,
      size: dataSize,
      total: 1000,
    };
    const season = 1;

    const leaderboardItems: DappLeaderboardItem[] = Array.from({ length: dataSize }, (_, index) => ({
      name: `Entry ${(index + 1).toString(16).padStart(40, '0')}`,
      score: 100 + index,
      slug: `protocol-${index + 1}`,
      rank: index + 1,
    }));

    const leaderboardData: CommonPageApiResponse<DappLeaderboardItem> = {
      data: {
        items: leaderboardItems,
        page: 0,
        size: dataSize,
        total: 1000,
      },
      lastUpdated: 1730244198,
    };

    const protocolDetails: ProtocolApiResponse = {
      protocols: [{ address: '0xabc', score: 50 }],
      metadata: {
        name: 'Protocol',
        slug: 'protocol',
        twitter: '@protocol',
        logo: 'https://example.com/protocol.png',
      },
    };

    const mappedRow: UnifiedLeaderboardRow = {
      icon: 'https://example.com/protocol.png',
      handle: '@protocol',
      data: protocolDetails.protocols,
      name: 'Protocol',
      totalScore: 100,
      rank: 1,
    };

    vi.mocked(mockLeaderboardAdapter.fetchLeaderboardData).mockResolvedValue(leaderboardData);

    vi.mocked(mockProtocolAdapter.fetchProtocolDetails).mockResolvedValue(protocolDetails);

    vi.mocked(mapDappLeaderboardRow).mockReturnValue(mappedRow);

    // When
    const result = await service.getDappLeaderboardData(args, season);

    // Then
    expect(mockLeaderboardAdapter.fetchLeaderboardData).toHaveBeenCalledWith(args, season);
    expect(mockProtocolAdapter.fetchProtocolDetails).toHaveBeenCalledTimes(dataSize);
    expect(mapDappLeaderboardRow).toHaveBeenCalledTimes(dataSize);

    expect(result).toEqual({
      items: Array(dataSize).fill(mappedRow),
      lastUpdated: expect.any(Number),
      pagination: leaderboardData.data,
    });
  });
});
