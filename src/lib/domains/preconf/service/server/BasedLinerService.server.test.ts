import { getBlock, waitForTransactionReceipt } from '@wagmi/core';
import { type Address, type Hex, WaitForTransactionReceiptTimeoutError, zeroAddress } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchFromApi } from '$shared/services/api/fetchClient';
import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';

import { BasedLinerAdapter } from '../../adapter/server/BasedLinerAdapter.server';
import type { BasedlinerLeaderboard } from '../../dto/BasedlinerLeaderboard';
import { PRECONF_CAMPAIGN_PHASE, PRECONF_TX_STAGE } from '../../types';
import { BasedLinerService } from './BasedLinerService.server';

// Mock dependencies
vi.mock('@wagmi/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@wagmi/core')>();
  return {
    ...actual,
    getBlock: vi.fn(),
    waitForTransactionReceipt: vi.fn(),
  };
});

vi.mock('$shared/wagmi/server', () => ({
  basedLinersServerConfig: {},
}));

vi.mock('$shared/services/api/fetchClient', () => ({
  fetchFromApi: vi.fn(),
}));

vi.mock('$shared/utils/logger', () => ({
  getLogger: vi.fn(() => vi.fn()),
}));

vi.mock('../../adapter/server/BasedLinerAdapter.server', () => ({
  BasedLinerAdapter: {
    submitStage: vi.fn(),
  },
}));

vi.mock('$env/static/private', () => ({
  API_KEY: 'test-api-key',
}));

describe('BasedLinerService.server', () => {
  const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
  const mockTxHash: Hex = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
  const mockTimestamp = 1640995200000; // 2022-01-01 00:00:00 UTC
  const mockBlockNumber = 12345n;
  const mockBlockTimestamp = 1640995210n; // 10 seconds later
  const mockPhase = PRECONF_CAMPAIGN_PHASE.BEFORE;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTimingDiffForAddress', () => {
    it('should throw error when address is not provided', () => {
      expect(() => BasedLinerService.getTimingDiffForAddress('' as Address)).toThrow('Address is required');
    });

    it('should throw method not implemented error', () => {
      expect(() => BasedLinerService.getTimingDiffForAddress(mockAddress)).toThrow('Method not implemented.');
    });
  });

  describe('submitPhase', () => {
    const mockReceipt = {
      blockNumber: mockBlockNumber,
      status: 'success',
    };

    const mockBlock = {
      timestamp: mockBlockTimestamp,
      number: mockBlockNumber,
    };

    beforeEach(() => {
      vi.mocked(BasedLinerAdapter.submitStage).mockResolvedValue(undefined as never);
      vi.mocked(waitForTransactionReceipt).mockResolvedValue(mockReceipt as never);
      vi.mocked(getBlock).mockResolvedValue(mockBlock as never);
    });

    it('should successfully submit phase and return timing difference', async () => {
      // When
      const result = await BasedLinerService.submitPhase({
        phase: mockPhase,
        timestamp: mockTimestamp,
        wallet: mockAddress,
        txHash: mockTxHash,
      });

      // Then
      expect(BasedLinerAdapter.submitStage).toHaveBeenCalledTimes(2);

      // First call - initial stage
      expect(BasedLinerAdapter.submitStage).toHaveBeenNthCalledWith(1, {
        stage: PRECONF_TX_STAGE.INITIAL,
        phase: mockPhase,
        timestamp: mockTimestamp,
        address: mockAddress,
        tx_hash: mockTxHash,
      });

      // Wait for transaction receipt
      expect(waitForTransactionReceipt).toHaveBeenCalledWith(expect.anything(), {
        hash: mockTxHash,
        chainId: expect.any(Number),
        timeout: 300000, // 5 minutes
      });

      // Get block with retry logic
      expect(getBlock).toHaveBeenCalledWith(expect.anything(), { blockNumber: mockBlockNumber });

      // Second call - final stage
      expect(BasedLinerAdapter.submitStage).toHaveBeenNthCalledWith(2, {
        stage: PRECONF_TX_STAGE.FINAL,
        phase: mockPhase,
        address: mockAddress,
        timestamp: Number(mockBlockTimestamp * 1000n),
        tx_hash: mockTxHash,
      });

      // Calculate expected diff: (blockTimestamp * 1000n) - BigInt(timestamp)
      const expectedDiff = Number(mockBlockTimestamp * 1000n - BigInt(mockTimestamp));
      expect(result).toBe(expectedDiff);
    });

    it('should throw error when phase is null or undefined', async () => {
      await expect(
        BasedLinerService.submitPhase({
          phase: null as unknown as PRECONF_CAMPAIGN_PHASE,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow('Phase, timestamp, wallet and txHash are required');
    });

    it('should throw error when timestamp is not provided', async () => {
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: 0,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow('Phase, timestamp, wallet and txHash are required');
    });

    it('should throw error when wallet is zero address', async () => {
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: zeroAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow('Phase, timestamp, wallet and txHash are required');
    });

    it('should throw error when txHash is not provided', async () => {
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: '' as Hex,
        }),
      ).rejects.toThrow('Phase, timestamp, wallet and txHash are required');
    });

    it('should handle initial stage submission error', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.submitStage).mockRejectedValueOnce(new Error('Initial stage failed'));

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow('Failed to submit phase');

      expect(BasedLinerAdapter.submitStage).toHaveBeenCalledTimes(1);
      expect(waitForTransactionReceipt).not.toHaveBeenCalled();
    });

    it('should handle 429 error in initial stage submission and re-throw TooManyRequestsError', async () => {
      // Given
      const tooManyRequestsError = new TooManyRequestsError(
        'Rate limit exceeded. Please wait before submitting again.',
      );
      vi.mocked(BasedLinerAdapter.submitStage).mockRejectedValueOnce(tooManyRequestsError);

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow(TooManyRequestsError);

      expect(BasedLinerAdapter.submitStage).toHaveBeenCalledTimes(1);
      expect(waitForTransactionReceipt).not.toHaveBeenCalled();
    });

    it('should handle transaction timeout error', async () => {
      // Given
      const timeoutError = new WaitForTransactionReceiptTimeoutError({
        hash: mockTxHash,
      });
      vi.mocked(waitForTransactionReceipt).mockRejectedValue(timeoutError);

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow(TransactionTimedOutError);

      expect(BasedLinerAdapter.submitStage).toHaveBeenCalledTimes(1);
      expect(waitForTransactionReceipt).toHaveBeenCalled();
      expect(getBlock).not.toHaveBeenCalled();
    });

    it('should handle transaction receipt error', async () => {
      // Given
      vi.mocked(waitForTransactionReceipt).mockRejectedValue(new Error('Receipt error'));

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow(`Failed to get transaction receipt for hash "${mockTxHash}"`);
    });

    it('should throw error when no receipt is found', async () => {
      // Given
      vi.mocked(waitForTransactionReceipt).mockResolvedValue(null as never);

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow(`Failed to get transaction receipt for hash "${mockTxHash}"`);
    });

    it('should retry getBlock on failure and eventually succeed', async () => {
      // Given
      vi.mocked(getBlock)
        .mockRejectedValueOnce(new Error('Block not found'))
        .mockRejectedValueOnce(new Error('Block not found'))
        .mockResolvedValueOnce(mockBlock as never);

      // When
      const result = await BasedLinerService.submitPhase({
        phase: mockPhase,
        timestamp: mockTimestamp,
        wallet: mockAddress,
        txHash: mockTxHash,
      });

      // Then
      expect(getBlock).toHaveBeenCalledTimes(3);
      expect(result).toBeDefined();
    });

    it('should throw error when getBlock fails after max retries', async () => {
      // Given
      vi.mocked(getBlock).mockRejectedValue(new Error('Block not found'));

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow('Block 12345 not available after 5 attempts');

      expect(getBlock).toHaveBeenCalledTimes(5);
    }, 35000); // 35 second timeout to account for exponential backoff

    it('should handle final stage submission error', async () => {
      // Given
      vi.mocked(BasedLinerAdapter.submitStage)
        .mockResolvedValueOnce(undefined as never) // Initial stage succeeds
        .mockRejectedValueOnce(new Error('Final stage failed')); // Final stage fails

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow('Failed to submit phase');

      expect(BasedLinerAdapter.submitStage).toHaveBeenCalledTimes(2);
      expect(waitForTransactionReceipt).toHaveBeenCalled();
      expect(getBlock).toHaveBeenCalled();
    });

    it('should handle 429 error in final stage submission and re-throw TooManyRequestsError', async () => {
      // Given
      const tooManyRequestsError = new TooManyRequestsError(
        'Rate limit exceeded. Please wait before submitting again.',
      );
      vi.mocked(BasedLinerAdapter.submitStage)
        .mockResolvedValueOnce(undefined as never) // Initial stage succeeds
        .mockRejectedValueOnce(tooManyRequestsError); // Final stage fails with 429

      // When & Then
      await expect(
        BasedLinerService.submitPhase({
          phase: mockPhase,
          timestamp: mockTimestamp,
          wallet: mockAddress,
          txHash: mockTxHash,
        }),
      ).rejects.toThrow(TooManyRequestsError);

      expect(BasedLinerAdapter.submitStage).toHaveBeenCalledTimes(2);
      expect(waitForTransactionReceipt).toHaveBeenCalled();
      expect(getBlock).toHaveBeenCalled();
    });
  });

  describe('getLeaderboard', () => {
    const mockLeaderboardData: BasedlinerLeaderboard[] = [
      {
        address: mockAddress,
        rank: 1,
        diff: 1000,
        phase1: 500,
        phase2: 600,
      },
      {
        address: '0x9876543210fedcba9876543210fedcba98765432' as Address,
        rank: 2,
        diff: 2000,
        phase1: 1000,
        phase2: 1200,
      },
    ];

    it('should fetch leaderboard without address filter', async () => {
      // Given
      const mockApiResponse = {
        data: {
          items: mockLeaderboardData,
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboard({});

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith('/basedliner/leaderboard?page=0&limit=20', 4, {
        headers: { 'x-api-key': 'test-api-key' },
        method: 'GET',
      });
      expect(result).toEqual({
        items: mockLeaderboardData,
        total: mockLeaderboardData.length,
      });
    });

    it('should fetch leaderboard with address filter', async () => {
      // Given
      const mockApiResponse = {
        data: {
          items: [mockLeaderboardData[0]],
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboard({
        address: mockAddress,
      });

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith(`/basedliner/leaderboard?address=${mockAddress}&page=0&limit=20`, 4, {
        headers: { 'x-api-key': 'test-api-key' },
        method: 'GET',
      });
      expect(result).toEqual(mockLeaderboardData[0]);
    });

    it('should return null when no items found for address', async () => {
      // Given
      const mockApiResponse = {
        data: {
          items: [],
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboard({
        address: mockAddress,
      });

      // Then
      expect(result).toBeNull();
    });

    it('should return empty array when no items found without address', async () => {
      // Given
      const mockApiResponse = {
        data: {
          items: [],
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboard({});

      // Then
      expect(result).toEqual({
        items: [],
        total: 0,
      });
    });

    it('should handle missing items in response', async () => {
      // Given
      const mockApiResponse = {
        data: {},
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboard({});

      // Then
      expect(result).toEqual({
        items: [],
        total: 0,
      });
    });
  });

  describe('getLeaderboardEntry', () => {
    it('should fetch leaderboard entry for specific address', async () => {
      // Given
      const mockEntry = {
        address: mockAddress,
        rank: 1,
        diff: 1000,
        phase1: 500,
        phase2: 600,
      };
      const mockApiResponse = {
        data: {
          items: [mockEntry],
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboardEntry({
        address: mockAddress,
      });

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith(`/basedliner/leaderboard?address=${mockAddress}&page=0&limit=20`, 4, {
        headers: { 'x-api-key': 'test-api-key' },
        method: 'GET',
      });
      expect(result).toEqual(mockEntry);
    });

    it('should return null when no entry found', async () => {
      // Given
      const mockApiResponse = {
        data: {
          items: [],
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockApiResponse);

      // When
      const result = await BasedLinerService.getLeaderboardEntry({
        address: mockAddress,
      });

      // Then
      expect(result).toBeNull();
    });
  });
});
