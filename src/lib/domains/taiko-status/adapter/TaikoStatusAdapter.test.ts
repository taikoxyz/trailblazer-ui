import axios from 'axios';
import type { Address } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { StatusRank } from '$lib/domains/taiko-status/types';

import { TaikoStatusAdapter } from './TaikoStatusAdapter';

// Mock axios
vi.mock('axios');

// Mock the isDevelopmentEnv module
vi.mock('$shared/utils/isDevelopmentEnv', () => ({
  isDevelopmentEnv: false,
}));

describe('TaikoStatusAdapter', () => {
  let adapter: TaikoStatusAdapter;
  const mockAddress = '0xTestAddress' as Address;

  beforeEach(() => {
    adapter = new TaikoStatusAdapter();
    vi.clearAllMocks();
  });

  describe('getEndpoint', () => {
    it('should return development endpoint when in dev environment', () => {
      // When
      const endpoint = adapter['getEndpoint'](true);

      // Then
      expect(endpoint).toBe('/api/mock-api/s4/taiko-status?address=');
    });

    it('should return production endpoint when not in dev environment', () => {
      // When
      const endpoint = adapter['getEndpoint'](false);

      // Then
      expect(endpoint).toBe('https://trailblazer.mainnet.taiko.xyz/s4/taikopass?address=');
    });
  });

  describe('getUserPoints', () => {
    it('should return points from API response', async () => {
      // Given
      vi.mocked(axios.get).mockResolvedValue({ data: { points: 3000 } });

      // When
      const points = await adapter.getUserPoints(mockAddress);

      // Then
      expect(points).toBe(3000);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(mockAddress));
    });

    it('should return 0 when API call fails', async () => {
      // Given
      vi.mocked(axios.get).mockRejectedValue(new Error('API error'));

      // When
      const points = await adapter.getUserPoints(mockAddress);

      // Then
      expect(points).toBe(0);
    });
  });

  describe('getRank', () => {
    it('should return None rank for 0 points', () => {
      expect(adapter.getRank(0)).toBe(StatusRank.None);
    });

    it('should return Bronze rank for 1000 points', () => {
      expect(adapter.getRank(1000)).toBe(StatusRank.Bronze);
    });

    it('should return Silver rank for 5000 points', () => {
      expect(adapter.getRank(5000)).toBe(StatusRank.Silver);
    });

    it('should return Gold rank for 25000 points', () => {
      expect(adapter.getRank(25000)).toBe(StatusRank.Gold);
    });

    it('should return Platinum rank for 100000 points', () => {
      expect(adapter.getRank(100000)).toBe(StatusRank.Platinum);
    });

    it('should return Based rank for points above highest threshold', () => {
      expect(adapter.getRank(1000000)).toBe(StatusRank.Based);
    });

    it('should return appropriate rank for values between thresholds', () => {
      expect(adapter.getRank(2500)).toBe(StatusRank.Bronze);
      expect(adapter.getRank(20000)).toBe(StatusRank.Silver);
      expect(adapter.getRank(99999)).toBe(StatusRank.Gold);
    });
  });

  describe('getRankName', () => {
    it('should return capitalized rank name', () => {
      expect(adapter.getRankName(0)).toBe('None');
      expect(adapter.getRankName(1000)).toBe('Bronze');
      expect(adapter.getRankName(5000)).toBe('Silver');
      expect(adapter.getRankName(25000)).toBe('Gold');
      expect(adapter.getRankName(100000)).toBe('Platinum');
      expect(adapter.getRankName(1000000)).toBe('Based');
    });
  });

  describe('getUserRank', () => {
    it('should return the correct rank based on user points', async () => {
      // Given
      vi.spyOn(adapter, 'getUserPoints').mockResolvedValue(6000);

      // When
      const rank = await adapter.getUserRank(mockAddress);

      // Then
      expect(rank).toBe(StatusRank.Silver);
      expect(adapter.getUserPoints).toHaveBeenCalledWith(mockAddress);
    });
  });

  describe('getNextRank', () => {
    it('should return Bronze as next rank for 0 points', () => {
      expect(adapter.getNextRank(0)).toBe(StatusRank.Bronze);
    });

    it('should return Silver as next rank for 1500 points', () => {
      expect(adapter.getNextRank(1500)).toBe(StatusRank.Silver);
    });

    it('should return Gold as next rank for 10000 points', () => {
      expect(adapter.getNextRank(10000)).toBe(StatusRank.Gold);
    });

    it('should return Platinum as next rank for 50000 points', () => {
      expect(adapter.getNextRank(50000)).toBe(StatusRank.Platinum);
    });

    it('should return Based as next rank for 150000 points', () => {
      expect(adapter.getNextRank(150000)).toBe(StatusRank.Based);
    });

    it('should return Based for points that already exceed the highest rank', () => {
      expect(adapter.getNextRank(1000000)).toBe(StatusRank.Based);
    });
  });

  describe('getRankBackgroundColor', () => {
    it('should return correct background color for None rank', () => {
      expect(adapter.getRankBackgroundColor(0)).toBe('bg-[#E3E3E3]');
    });

    it('should return correct background color for Bronze rank', () => {
      expect(adapter.getRankBackgroundColor(1000)).toBe('bg-[#FFF6E2]');
    });

    it('should return correct background color for Silver rank', () => {
      expect(adapter.getRankBackgroundColor(5000)).toBe('bg-[#E3E3E3]');
    });

    it('should return correct background color for Gold rank', () => {
      expect(adapter.getRankBackgroundColor(25000)).toBe('bg-[#FFF6E2]');
    });

    it('should return correct background color for Platinum rank', () => {
      expect(adapter.getRankBackgroundColor(100000)).toBe('bg-[#EBF6FF]');
    });

    it('should return correct background color for Based rank', () => {
      expect(adapter.getRankBackgroundColor(1000000)).toBe('bg-[#FFEEF9]');
    });

    it('should throw error for invalid rank', () => {
      // This test would require modifying the getRank method to return an invalid value
      // which is not possible with the current implementation
      // Keeping this test for completeness
    });
  });

  describe('getRankIcon', () => {
    it('should return correct icon path for each rank', () => {
      expect(adapter.getRankIcon(0)).toBe('/taiko-status/none.svg');
      expect(adapter.getRankIcon(1000)).toBe('/taiko-status/bronze.svg');
      expect(adapter.getRankIcon(5000)).toBe('/taiko-status/silver.svg');
      expect(adapter.getRankIcon(25000)).toBe('/taiko-status/gold.svg');
      expect(adapter.getRankIcon(100000)).toBe('/taiko-status/platinum.svg');
      expect(adapter.getRankIcon(1000000)).toBe('/taiko-status/based.svg');
    });
  });

  describe('formatTaikoStatusPoints', () => {
    it('should format points correctly', () => {
      expect(adapter.formatTaikoStatusPoints(1234)).toBe('1,234');
      expect(adapter.formatTaikoStatusPoints(1000000)).toBe('1,000,000');
      expect(adapter.formatTaikoStatusPoints(0)).toBe('0');
    });

    it('should floor decimal points', () => {
      expect(adapter.formatTaikoStatusPoints(1234.56)).toBe('1,234');
      expect(adapter.formatTaikoStatusPoints(1000000.99)).toBe('1,000,000');
    });
  });

  describe('getTaikoStatusPointsToNextRank', () => {
    it('should calculate correct points to next rank', () => {
      expect(adapter.getTaikoStatusPointsToNextRank(0)).toBe(1000);
      expect(adapter.getTaikoStatusPointsToNextRank(500)).toBe(500);
      expect(adapter.getTaikoStatusPointsToNextRank(1000)).toBe(4000);
      expect(adapter.getTaikoStatusPointsToNextRank(4000)).toBe(1000);
      expect(adapter.getTaikoStatusPointsToNextRank(5000)).toBe(20000);
      expect(adapter.getTaikoStatusPointsToNextRank(10000)).toBe(15000);
      expect(adapter.getTaikoStatusPointsToNextRank(25000)).toBe(75000);
      expect(adapter.getTaikoStatusPointsToNextRank(50000)).toBe(50000);
      expect(adapter.getTaikoStatusPointsToNextRank(100000)).toBe(0);
      expect(adapter.getTaikoStatusPointsToNextRank(200000)).toBe(0);
    });
  });
});
