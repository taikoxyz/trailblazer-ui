import type { Address } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RanksToPoints, StatusRank } from '$lib/domains/taiko-status/types';

import { TaikoStatusAdapter } from '../adapter/TaikoStatusAdapter';
import { TaikoStatusService } from './TaikoStatusService';

// Mock the TaikoStatusAdapter
vi.mock('../adapter/TaikoStatusAdapter', () => {
  return {
    TaikoStatusAdapter: vi.fn().mockImplementation(() => ({
      getUserPoints: vi.fn(),
      getUserRank: vi.fn(),
      getRank: vi.fn(),
      getNextRank: vi.fn(),
      getRankBackgroundColor: vi.fn(),
      getRankIcon: vi.fn(),
      getRankName: vi.fn(),
    })),
  };
});

describe('TaikoStatusService', () => {
  let service: TaikoStatusService;
  let mockAdapter: TaikoStatusAdapter;
  const mockAddress = '0xTestAddress' as Address;

  beforeEach(() => {
    // Clear mocks between tests
    vi.clearAllMocks();

    // Create a fresh mock adapter instance
    mockAdapter = new TaikoStatusAdapter();

    // Initialize service with the mock adapter
    service = new TaikoStatusService(mockAdapter);
  });

  describe('constructor', () => {
    it('should use provided adapter if given', () => {
      // Given
      const customAdapter = new TaikoStatusAdapter();

      // When
      const customService = new TaikoStatusService(customAdapter);

      // Then
      expect(customService['adapter']).toBe(customAdapter);
    });

    it('should create new adapter if none provided', () => {
      // Given / When
      const defaultService = new TaikoStatusService();

      // Then
      expect(defaultService['adapter']).not.toBeNull();
      expect(TaikoStatusAdapter).toHaveBeenCalled();
    });
  });

  describe('getUserPoints', () => {
    it('should delegate to adapter getUserPoints', async () => {
      // Given
      const expectedPoints = 3000;
      vi.mocked(mockAdapter.getUserPoints).mockResolvedValue(expectedPoints);

      // When
      const result = await service.getUserPoints(mockAddress);

      // Then
      expect(result).toBe(expectedPoints);
      expect(mockAdapter.getUserPoints).toHaveBeenCalledWith(mockAddress);
    });
  });

  describe('getUserRank', () => {
    it('should delegate to adapter getUserRank', async () => {
      // Given
      const expectedRank = StatusRank.Silver;
      vi.mocked(mockAdapter.getUserRank).mockResolvedValue(expectedRank);

      // When
      const result = await service.getUserRank(mockAddress);

      // Then
      expect(result).toBe(expectedRank);
      expect(mockAdapter.getUserRank).toHaveBeenCalledWith(mockAddress);
    });
  });

  describe('getRank', () => {
    it('should delegate to adapter getRank', () => {
      // Given
      const points = 5000;
      const expectedRank = StatusRank.Silver;
      vi.mocked(mockAdapter.getRank).mockReturnValue(expectedRank);

      // When
      const result = service.getRank(points);

      // Then
      expect(result).toBe(expectedRank);
      expect(mockAdapter.getRank).toHaveBeenCalledWith(points);
    });
  });

  describe('getNextRank', () => {
    it('should delegate to adapter getNextRank', () => {
      // Given
      const points = 5000;
      const expectedRank = StatusRank.Gold;
      vi.mocked(mockAdapter.getNextRank).mockReturnValue(expectedRank);

      // When
      const result = service.getNextRank(points);

      // Then
      expect(result).toBe(expectedRank);
      expect(mockAdapter.getNextRank).toHaveBeenCalledWith(points);
    });
  });

  describe('getRankBackgroundColor', () => {
    it('should delegate to adapter getRankBackgroundColor', () => {
      // Given
      const points = 5000;
      const expectedColor = 'bg-[#E3E3E3]';
      vi.mocked(mockAdapter.getRankBackgroundColor).mockReturnValue(expectedColor);

      // When
      const result = service.getRankBackgroundColor(points);

      // Then
      expect(result).toBe(expectedColor);
      expect(mockAdapter.getRankBackgroundColor).toHaveBeenCalledWith(points);
    });
  });

  describe('getRankIcon', () => {
    it('should delegate to adapter getRankIcon', () => {
      // Given
      const points = 5000;
      const expectedIcon = '/taiko-status/silver.svg';
      vi.mocked(mockAdapter.getRankIcon).mockReturnValue(expectedIcon);

      // When
      const result = service.getRankIcon(points);

      // Then
      expect(result).toBe(expectedIcon);
      expect(mockAdapter.getRankIcon).toHaveBeenCalledWith(points);
    });
  });

  describe('getRankName', () => {
    it('should delegate to adapter getRankName', () => {
      // Given
      const points = 5000;
      const expectedName = 'Silver';
      vi.mocked(mockAdapter.getRankName).mockReturnValue(expectedName);

      // When
      const result = service.getRankName(points);

      // Then
      expect(result).toBe(expectedName);
      expect(mockAdapter.getRankName).toHaveBeenCalledWith(points);
    });
  });

  describe('getTaikoStatus', () => {
    it('should return current and next status info', async () => {
      // Given
      const mockPoints = 6000;
      const mockRank = StatusRank.Silver;
      const mockNextRank = StatusRank.Gold;
      const mockNextPoints = RanksToPoints[mockNextRank];
      const mockRankName = 'Silver';
      const mockNextRankName = 'Gold';
      const mockIcon = '/taiko-status/silver.svg';
      const mockNextIcon = '/taiko-status/gold.svg';

      // Setup mock adapter responses
      vi.mocked(mockAdapter.getUserPoints).mockResolvedValue(mockPoints);
      vi.mocked(mockAdapter.getRank).mockImplementation((points) => {
        if (points === mockPoints) return mockRank;
        if (points === mockNextPoints) return mockNextRank;
        return StatusRank.None;
      });
      vi.mocked(mockAdapter.getNextRank).mockReturnValue(mockNextRank);
      vi.mocked(mockAdapter.getRankName).mockImplementation((points) => {
        if (points === mockPoints) return mockRankName;
        if (points === mockNextPoints) return mockNextRankName;
        return 'None';
      });
      vi.mocked(mockAdapter.getRankIcon).mockImplementation((points) => {
        if (points === mockPoints) return mockIcon;
        if (points === mockNextPoints) return mockNextIcon;
        return '/taiko-status/none.svg';
      });

      // When
      const result = await service.getTaikoStatus(mockAddress);

      // Then
      const expectedResult = {
        current: {
          rank: mockRank,
          points: mockPoints,
          name: mockRankName,
          icon: mockIcon,
        },
        next: {
          rank: mockNextRank,
          points: mockNextPoints,
          name: mockNextRankName,
          icon: mockNextIcon,
        },
      };

      expect(result).toEqual(expectedResult);

      // Verify correct adapter methods were called
      expect(mockAdapter.getUserPoints).toHaveBeenCalledWith(mockAddress);
      expect(mockAdapter.getRank).toHaveBeenCalledWith(mockPoints);
      expect(mockAdapter.getNextRank).toHaveBeenCalledWith(mockPoints);
      expect(mockAdapter.getRankName).toHaveBeenCalledTimes(2);
      expect(mockAdapter.getRankIcon).toHaveBeenCalledTimes(2);
    });

    it('should handle the case when user is at max rank', async () => {
      // Given
      const mockPoints = 1000000;
      const mockRank = StatusRank.Based;
      const mockNextRank = StatusRank.Based; // Same as current because max rank
      const mockNextPoints = RanksToPoints[mockNextRank];

      // Setup mock adapter responses
      vi.mocked(mockAdapter.getUserPoints).mockResolvedValue(mockPoints);
      vi.mocked(mockAdapter.getRank).mockReturnValue(mockRank);
      vi.mocked(mockAdapter.getNextRank).mockReturnValue(mockNextRank);
      vi.mocked(mockAdapter.getRankName).mockReturnValue('Based');
      vi.mocked(mockAdapter.getRankIcon).mockReturnValue('/taiko-status/based.svg');

      // When
      const result = await service.getTaikoStatus(mockAddress);

      // Then
      expect(result.current.rank).toBe(mockRank);
      expect(result.next.rank).toBe(mockNextRank);
      expect(result.current.points).toBe(mockPoints);
      expect(result.next.points).toBe(mockNextPoints);
    });

    it('should handle errors from getUserPoints by propagating them', async () => {
      // Given
      const errorMessage = 'Failed to fetch user points';
      vi.mocked(mockAdapter.getUserPoints).mockRejectedValue(new Error(errorMessage));

      // When / Then
      await expect(service.getTaikoStatus(mockAddress)).rejects.toThrow(errorMessage);
    });
  });
});
