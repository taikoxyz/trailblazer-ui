import type { Hex } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { TooManyRequestsError } from '$shared/types/errors';

import { PRECONF_CAMPAIGN_PHASE, PRECONF_TX_STAGE } from '../../types';
import { BasedLinerAdapter } from './BasedLinerAdapter.server';

// Mock dependencies
vi.mock('$shared/services/api/fetchClient', () => ({
  fetchFromApi: vi.fn(),
}));

vi.mock('@wagmi/core', () => ({
  getPublicClient: vi.fn(),
}));

vi.mock('$shared/wagmi/server', () => ({
  basedLinersServerConfig: {},
}));

describe('BasedLinerAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitStage', () => {
    const mockSubmitArgs = {
      address: '0x1234567890123456789012345678901234567890' as const,
      stage: PRECONF_TX_STAGE.INITIAL,
      phase: PRECONF_CAMPAIGN_PHASE.BEFORE,
      timestamp: 1640995200000, // Jan 1, 2022
      tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890' as Hex,
    };

    it('should successfully submit stage data', async () => {
      // Given
      const mockResponse = { success: true, id: '123' };
      vi.mocked(fetchFromApi).mockResolvedValue(mockResponse);

      // When
      const result = await BasedLinerAdapter.submitStage(mockSubmitArgs);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith('/basedliner/submit', 4, {
        method: 'POST',
        headers: { 'x-api-key': `${API_KEY}` },
        body: JSON.stringify({
          address: mockSubmitArgs.address,
          stage: mockSubmitArgs.stage,
          phase: mockSubmitArgs.phase,
          timestamp: mockSubmitArgs.timestamp,
          tx_hash: mockSubmitArgs.tx_hash,
        }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should use timestamp 0 when timestamp is not provided', async () => {
      // Given
      const argsWithoutTimestamp = {
        ...mockSubmitArgs,
        timestamp: undefined,
      } as unknown as Parameters<typeof BasedLinerAdapter.submitStage>[0];
      const mockResponse = { success: true, id: '123' };
      vi.mocked(fetchFromApi).mockResolvedValue(mockResponse);

      // When
      await BasedLinerAdapter.submitStage(argsWithoutTimestamp);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith('/basedliner/submit', 4, {
        method: 'POST',
        headers: { 'x-api-key': `${API_KEY}` },
        body: JSON.stringify({
          address: argsWithoutTimestamp.address,
          stage: argsWithoutTimestamp.stage,
          phase: argsWithoutTimestamp.phase,
          timestamp: 0,
          tx_hash: argsWithoutTimestamp.tx_hash,
        }),
      });
    });

    it('should handle API errors and throw descriptive error', async () => {
      // Given
      const apiError = new Error('API Error');
      vi.mocked(fetchFromApi).mockRejectedValue(apiError);

      // When & Then
      await expect(BasedLinerAdapter.submitStage(mockSubmitArgs)).rejects.toThrow('Failed to submit stage');
    });

    it('should handle network errors and throw descriptive error', async () => {
      // Given
      vi.mocked(fetchFromApi).mockRejectedValue(new Error('Network error'));

      // When & Then
      await expect(BasedLinerAdapter.submitStage(mockSubmitArgs)).rejects.toThrow('Failed to submit stage');
    });

    it('should handle 429 Too Many Requests errors and throw TooManyRequestsError', async () => {
      // Given
      const rateLimitError = new Error('API Error: 429 Too Many Requests');
      vi.mocked(fetchFromApi).mockRejectedValue(rateLimitError);

      // When & Then
      await expect(BasedLinerAdapter.submitStage(mockSubmitArgs)).rejects.toThrow(TooManyRequestsError);
      await expect(BasedLinerAdapter.submitStage(mockSubmitArgs)).rejects.toThrow(
        'Rate limit exceeded. Please wait before submitting again.',
      );
    });

    it('should handle other API errors with status codes', async () => {
      // Given
      const serverError = new Error('API Error: 500 Internal Server Error');
      vi.mocked(fetchFromApi).mockRejectedValue(serverError);

      // When & Then
      await expect(BasedLinerAdapter.submitStage(mockSubmitArgs)).rejects.toThrow('Failed to submit stage');
    });

    it('should submit with AFTER phase correctly', async () => {
      // Given
      const afterPhaseArgs = {
        ...mockSubmitArgs,
        phase: PRECONF_CAMPAIGN_PHASE.AFTER,
      };
      const mockResponse = { success: true, id: '456' };
      vi.mocked(fetchFromApi).mockResolvedValue(mockResponse);

      // When
      const result = await BasedLinerAdapter.submitStage(afterPhaseArgs);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith('/basedliner/submit', 4, {
        method: 'POST',
        headers: { 'x-api-key': `${API_KEY}` },
        body: JSON.stringify({
          address: afterPhaseArgs.address,
          stage: afterPhaseArgs.stage,
          phase: PRECONF_CAMPAIGN_PHASE.AFTER,
          timestamp: afterPhaseArgs.timestamp,
          tx_hash: afterPhaseArgs.tx_hash,
        }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should submit with FINAL stage correctly', async () => {
      // Given
      const finalStageArgs = {
        ...mockSubmitArgs,
        stage: PRECONF_TX_STAGE.FINAL,
      };
      const mockResponse = { success: true, id: '789' };
      vi.mocked(fetchFromApi).mockResolvedValue(mockResponse);

      // When
      const result = await BasedLinerAdapter.submitStage(finalStageArgs);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith('/basedliner/submit', 4, {
        method: 'POST',
        headers: { 'x-api-key': `${API_KEY}` },
        body: JSON.stringify({
          address: finalStageArgs.address,
          stage: PRECONF_TX_STAGE.FINAL,
          phase: finalStageArgs.phase,
          timestamp: finalStageArgs.timestamp,
          tx_hash: finalStageArgs.tx_hash,
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('waitForTransactionReceipt', () => {
    const mockTxHash: Hex = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';

    it('should successfully wait for transaction receipt', async () => {
      // Given
      const mockReceipt = {
        blockHash: '0x123456',
        blockNumber: 12345n,
        transactionHash: mockTxHash,
        status: 'success' as const,
        gasUsed: 21000n,
      };

      const mockPublicClient = {
        waitForTransactionReceipt: vi.fn().mockResolvedValue(mockReceipt),
      };

      const { getPublicClient } = await import('@wagmi/core');
      vi.mocked(getPublicClient).mockReturnValue(mockPublicClient);

      // When
      const result = await BasedLinerAdapter.waitForTransactionReceipt({ txHash: mockTxHash });

      // Then
      expect(getPublicClient).toHaveBeenCalledWith({});
      expect(mockPublicClient.waitForTransactionReceipt).toHaveBeenCalledWith({ hash: mockTxHash });
      expect(result).toEqual(mockReceipt);
    });

    it('should throw error when public client is not available', async () => {
      // Given
      const { getPublicClient } = await import('@wagmi/core');
      vi.mocked(getPublicClient).mockReturnValue(null);

      // When & Then
      await expect(BasedLinerAdapter.waitForTransactionReceipt({ txHash: mockTxHash })).rejects.toThrow(
        'Could not get public client',
      );
    });

    it('should throw error when no receipt is found', async () => {
      // Given
      const mockPublicClient = {
        waitForTransactionReceipt: vi.fn().mockResolvedValue(null),
      };

      const { getPublicClient } = await import('@wagmi/core');
      vi.mocked(getPublicClient).mockReturnValue(mockPublicClient);

      // When & Then
      await expect(BasedLinerAdapter.waitForTransactionReceipt({ txHash: mockTxHash })).rejects.toThrow(
        'No receipt found for this txHash',
      );
    });

    it('should throw error when waitForTransactionReceipt fails', async () => {
      // Given
      const mockPublicClient = {
        waitForTransactionReceipt: vi.fn().mockRejectedValue(new Error('Transaction failed')),
      };

      const { getPublicClient } = await import('@wagmi/core');
      vi.mocked(getPublicClient).mockReturnValue(mockPublicClient);

      // When & Then
      await expect(BasedLinerAdapter.waitForTransactionReceipt({ txHash: mockTxHash })).rejects.toThrow(
        'Transaction failed',
      );
    });

    it('should handle different transaction hash formats', async () => {
      // Given
      const shortTxHash: Hex = '0x123';
      const mockReceipt = {
        blockHash: '0x123456',
        blockNumber: 12345n,
        transactionHash: shortTxHash,
        status: 'success' as const,
        gasUsed: 21000n,
      };

      const mockPublicClient = {
        waitForTransactionReceipt: vi.fn().mockResolvedValue(mockReceipt),
      };

      const { getPublicClient } = await import('@wagmi/core');
      vi.mocked(getPublicClient).mockReturnValue(mockPublicClient);

      // When
      const result = await BasedLinerAdapter.waitForTransactionReceipt({ txHash: shortTxHash });

      // Then
      expect(mockPublicClient.waitForTransactionReceipt).toHaveBeenCalledWith({ hash: shortTxHash });
      expect(result).toEqual(mockReceipt);
    });
  });
});
