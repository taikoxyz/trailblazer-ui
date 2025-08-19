import { type Address, zeroAddress } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';
import getConnectedAddress from '$shared/utils/getConnectedAddress';

import { BasedLinerAdapter } from '../adapter/BasedLinerAdapter';
import type { BasedlinerLeaderboard } from '../dto/BasedlinerLeaderboard';
import type { InternalAPIPayload } from '../dto/InternalAPIPayload';
import { leaderboardStore } from '../stores/BasedlinerLeaderboardStore';
import { PRECONF_CAMPAIGN_PHASE, PRECONF_EVENT } from '../types';
import { BasedLinerService } from './BasedLinerService';

// Mock dependencies
const mockBrowser = vi.hoisted(() => ({ value: true }));
vi.mock('$app/environment', () => ({
  get browser() {
    return mockBrowser.value;
  },
}));

vi.mock('$shared/utils/getConnectedAddress', () => ({
  default: vi.fn(),
}));

vi.mock('$shared/utils/logger', () => ({
  getLogger: vi.fn(() => vi.fn()),
}));

vi.mock('../adapter/BasedLinerAdapter', () => ({
  BasedLinerAdapter: {
    isPhaseOpen: vi.fn(),
    sendTx: vi.fn(),
  },
}));

vi.mock('../stores/BasedlinerLeaderboardStore', () => ({
  leaderboardStore: {
    set: vi.fn(),
  },
}));

// Mock fetch globally
global.fetch = vi.fn();

describe('BasedLinerService', () => {
  const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
  const mockTxHash = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
  const mockEventId = 1;
  const mockPhase = PRECONF_CAMPAIGN_PHASE.BEFORE;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getConnectedAddress).mockReturnValue(mockAddress);
  });

  describe('registerPhase', () => {
    it('should successfully register for a phase', async () => {
      // Given
      const mockResponse = { success: true, message: 'Registration successful' };

      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);
      vi.mocked(BasedLinerAdapter.sendTx).mockResolvedValue(mockTxHash);
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.registerPhase(mockEventId, mockPhase);

      // Then
      expect(BasedLinerAdapter.isPhaseOpen).toHaveBeenCalledWith({
        eventId: mockEventId,
        phaseId: mockPhase,
      });
      expect(BasedLinerAdapter.sendTx).toHaveBeenCalledWith({
        eventId: mockEventId,
        phaseId: mockPhase,
      });

      const expectedPayload: InternalAPIPayload = {
        phase: mockPhase,
        wallet: mockAddress,
        txHash: mockTxHash,
        phaseEnded: false,
      };

      expect(fetch).toHaveBeenCalledWith('/api/basedliner/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expectedPayload),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when phase is not open', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(false);

      // When & Then
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow('Phase is not open');

      expect(BasedLinerAdapter.isPhaseOpen).toHaveBeenCalledWith({
        eventId: mockEventId,
        phaseId: mockPhase,
      });
      expect(BasedLinerAdapter.sendTx).not.toHaveBeenCalled();
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should throw error when no wallet is connected', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);
      vi.mocked(getConnectedAddress).mockReturnValue(zeroAddress);

      // When & Then
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow('No wallet connected');

      expect(BasedLinerAdapter.isPhaseOpen).toHaveBeenCalledWith({
        eventId: mockEventId,
        phaseId: mockPhase,
      });
      expect(BasedLinerAdapter.sendTx).not.toHaveBeenCalled();
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should throw error when no txHash is returned', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);
      vi.mocked(BasedLinerAdapter.sendTx).mockResolvedValue(null as unknown as `0x${string}`);

      // When & Then
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow('No txHash found');

      expect(BasedLinerAdapter.sendTx).toHaveBeenCalledWith({
        eventId: mockEventId,
        phaseId: mockPhase,
      });
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should throw TransactionTimedOutError when API returns 408', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);
      vi.mocked(BasedLinerAdapter.sendTx).mockResolvedValue(mockTxHash);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 408,
        statusText: 'Request Timeout',
      } as Response);

      // When & Then
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow(TransactionTimedOutError);
    });

    it('should throw TooManyRequestsError when API returns 429', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);
      vi.mocked(BasedLinerAdapter.sendTx).mockResolvedValue(mockTxHash);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
      } as Response);

      // When & Then
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow(TooManyRequestsError);
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow(
        'Rate limit exceeded. Please wait before submitting again.',
      );
    });

    it('should throw error when API call fails', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);
      vi.mocked(BasedLinerAdapter.sendTx).mockResolvedValue(mockTxHash);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      // When & Then
      await expect(BasedLinerService.registerPhase(mockEventId, mockPhase)).rejects.toThrow(
        'API call failed: 500 Internal Server Error',
      );
    });
  });

  describe('isPhaseOpen', () => {
    it('should return true when phase is open', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(true);

      // When
      const result = await BasedLinerService.isPhaseOpen({
        eventId: mockEventId,
        phaseId: mockPhase,
      });

      // Then
      expect(BasedLinerAdapter.isPhaseOpen).toHaveBeenCalledWith({
        eventId: mockEventId,
        phaseId: mockPhase,
      });
      expect(result).toBe(true);
    });

    it('should return false when phase is closed', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.isPhaseOpen).mockResolvedValue(false);

      // When
      const result = await BasedLinerService.isPhaseOpen({
        eventId: mockEventId,
        phaseId: mockPhase,
      });

      // Then
      expect(result).toBe(false);
    });
  });

  describe('fetchLeaderboard', () => {
    const mockPage = 1;
    const mockLeaderboardData: BasedlinerLeaderboard[] = [
      {
        address: mockAddress,
        rank: 1,
        score: '1000',
        phase1: 500,
        phase2: 600,
      },
      {
        address: '0x9876543210fedcba9876543210fedcba98765432' as Address,
        rank: 2,
        score: '2000',
        phase1: 1000,
        phase2: 1200,
      },
    ];

    it('should successfully fetch and process leaderboard data', async () => {
      // Given
      const mockApiResponse = {
        entries: mockLeaderboardData,
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboard({
        eventId: mockEventId,
        page: mockPage,
      });

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/basedliner/leaderboard/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: mockEventId, page: mockPage }),
      });

      expect(result?.items).toHaveLength(2);
      expect(result?.items[0]).toMatchObject({
        address: mockAddress,
        rank: 1,
        totalScore: 1000,
        phase1: 0.5, // 500 / 1000
        phase2: 0.6, // 600 / 1000
      });
      expect(leaderboardStore.set).toHaveBeenCalledWith(result);
    });

    it('should return early when not in browser environment', async () => {
      // Given
      mockBrowser.value = false;

      // When
      const result = await BasedLinerService.fetchLeaderboard({
        eventId: mockEventId,
        page: mockPage,
      });

      // Then
      expect(result).toBeUndefined();
      expect(fetch).not.toHaveBeenCalled();

      // Reset
      mockBrowser.value = true;
    });

    it('should handle API error and return empty leaderboard', async () => {
      // Given
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboard({
        eventId: mockEventId,
        page: mockPage,
      });

      // Then
      expect(result).toEqual({
        items: [],
        lastUpdated: expect.any(Number),
        pagination: { page: mockPage, size: 0, total: 0 },
      });
    });

    it('should handle network error and return empty leaderboard', async () => {
      // Given
      vi.mocked(fetch).mockRejectedValue(new Error('Network Error'));

      // When
      const result = await BasedLinerService.fetchLeaderboard({
        eventId: mockEventId,
        page: mockPage,
      });

      // Then
      expect(result).toEqual({
        items: [],
        lastUpdated: expect.any(Number),
        pagination: { page: mockPage, size: 0, total: 0 },
      });
    });

    it('should handle empty entries array', async () => {
      // Given
      const mockApiResponse = {
        entries: [],
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboard({
        eventId: mockEventId,
        page: mockPage,
      });

      // Then
      expect(result?.items).toEqual([]);
      expect(result?.pagination).toEqual({
        page: mockPage,
        size: 0,
        total: 0,
      });
    });

    it('should handle null entries', async () => {
      // Given
      const mockApiResponse = {
        entries: null,
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboard({
        eventId: mockEventId,
        page: mockPage,
      });

      // Then
      expect(result?.items).toEqual([]);
      expect(result?.pagination).toEqual({
        page: mockPage,
        size: 0,
        total: 0,
      });
    });
  });

  describe('fetchLeaderboardEntry', () => {
    const mockLeaderboardEntry: BasedlinerLeaderboard = {
      address: mockAddress,
      rank: 1,
      diff: 1500,
      score: '1500',
      phase1: 750,
      phase2: 900,
    };

    it('should successfully fetch leaderboard entry', async () => {
      // Given
      const mockApiResponse = {
        entry: mockLeaderboardEntry,
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboardEntry({
        eventId: PRECONF_EVENT.BASEDLINER,
        address: mockAddress,
      });

      // Then
      expect(fetch).toHaveBeenCalledWith(`/api/basedliner/leaderboard/entry?address=${mockAddress}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      expect(result).toEqual({
        ...mockLeaderboardEntry,
        phase1: 0.75, // 750 / 1000
        phase2: 0.9, // 900 / 1000
      });
    });

    it('should return null when no entry found', async () => {
      // Given
      const mockApiResponse = {
        entry: null,
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboardEntry({
        eventId: PRECONF_EVENT.BASEDLINER,
        address: mockAddress,
      });

      // Then
      expect(result).toBeNull();
    });

    it('should throw error when API call fails', async () => {
      // Given
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      // When & Then
      await expect(
        BasedLinerService.fetchLeaderboardEntry({
          eventId: PRECONF_EVENT.BASEDLINER,
          address: mockAddress,
        }),
      ).rejects.toThrow('API call failed: 404 Not Found');
    });

    it('should handle missing entry in response', async () => {
      // Given
      const mockApiResponse = {};

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboardEntry({
        eventId: PRECONF_EVENT.BASEDLINER,
        address: mockAddress,
      });

      // Then
      expect(result).toBeNull();
    });

    it('should handle entry with zero phase values', async () => {
      // Given
      const mockEntryWithZeros = {
        ...mockLeaderboardEntry,
        phase1: 0,
        phase2: 0,
      };
      const mockApiResponse = {
        entry: mockEntryWithZeros,
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboardEntry({
        eventId: PRECONF_EVENT.BASEDLINER,
        address: mockAddress,
      });

      // Then
      expect(result).toEqual({
        ...mockEntryWithZeros,
        phase1: 0,
        phase2: 0,
      });
    });

    it('should handle entry with null phase values', async () => {
      // Given
      const mockEntryWithNulls = {
        ...mockLeaderboardEntry,
        phase1: null,
        phase2: null,
      };
      const mockApiResponse = {
        entry: mockEntryWithNulls,
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponse),
      } as unknown as Response);

      // When
      const result = await BasedLinerService.fetchLeaderboardEntry({
        eventId: PRECONF_EVENT.BASEDLINER,
        address: mockAddress,
      });

      // Then
      expect(result).toEqual({
        ...mockEntryWithNulls,
        phase1: 0,
        phase2: 0,
      });
    });
  });
});
