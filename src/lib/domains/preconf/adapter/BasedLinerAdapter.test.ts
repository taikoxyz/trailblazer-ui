import { readContract, simulateContract, writeContract } from '@wagmi/core';
import type { Hex } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BasedLinersAbi, basedLinersAddress } from '$generated/abi';
import { chainId } from '$shared/utils/chain';
import { wagmiConfig } from '$shared/wagmi';

import { BasedLinerAdapter } from './BasedLinerAdapter';

vi.mock('@wagmi/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@wagmi/core')>();
  return {
    ...actual,
    readContract: vi.fn(),
    simulateContract: vi.fn(),
    writeContract: vi.fn(),
  };
});

vi.mock('$shared/utils/logger', () => ({
  getLogger: vi.fn(() => vi.fn()),
}));

describe('BasedLinerAdapter', () => {
  const mockEventId = 1;
  const mockPhaseId = 2;
  const mockTxHash: Hex = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sendTx', () => {
    it('should simulate and send transaction successfully', async () => {
      // Given
      const mockRequest = {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      };

      vi.mocked(simulateContract).mockResolvedValue({
        request: mockRequest as never,
        result: undefined,
        chainId: 1,
      } as never);
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      // When
      const result = await BasedLinerAdapter.sendTx({
        eventId: mockEventId,
        phaseId: mockPhaseId,
      });

      // Then
      expect(simulateContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      });
      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, mockRequest);
      expect(result).toBe(mockTxHash);
    });

    it('should throw error when simulation fails', async () => {
      // Given
      const simulationError = new Error('Simulation failed');
      vi.mocked(simulateContract).mockRejectedValue(simulationError);

      // When & Then
      await expect(
        BasedLinerAdapter.sendTx({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Simulation failed');

      expect(simulateContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      });
      expect(writeContract).not.toHaveBeenCalled();
    });

    it('should throw error when transaction fails', async () => {
      // Given
      const mockRequest = {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      };
      const transactionError = new Error('Transaction failed');

      vi.mocked(simulateContract).mockResolvedValue({
        request: mockRequest as never,
        result: undefined,
        chainId: 1,
      } as never);
      vi.mocked(writeContract).mockRejectedValue(transactionError);

      // When & Then
      await expect(
        BasedLinerAdapter.sendTx({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Transaction failed');

      expect(simulateContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      });
      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, mockRequest);
    });

    it('should handle zero eventId and phaseId', async () => {
      // Given
      const mockRequest = {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(0), BigInt(0)],
      };

      vi.mocked(simulateContract).mockResolvedValue({
        request: mockRequest as never,
        result: undefined,
        chainId: 1,
      } as never);
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      // When
      const result = await BasedLinerAdapter.sendTx({
        eventId: 0,
        phaseId: 0,
      });

      // Then
      expect(simulateContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(0), BigInt(0)],
      });
      expect(result).toBe(mockTxHash);
    });

    it('should handle large numbers for eventId and phaseId', async () => {
      // Given
      const largeEventId = 999999;
      const largePhaseId = 888888;
      const mockRequest = {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(largeEventId), BigInt(largePhaseId)],
      };

      vi.mocked(simulateContract).mockResolvedValue({
        request: mockRequest as never,
        result: undefined,
        chainId: 1,
      } as never);
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      // When
      const result = await BasedLinerAdapter.sendTx({
        eventId: largeEventId,
        phaseId: largePhaseId,
      });

      // Then
      expect(simulateContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(largeEventId), BigInt(largePhaseId)],
      });
      expect(result).toBe(mockTxHash);
    });

    it('should handle negative numbers by converting to BigInt', async () => {
      // Given
      const negativeEventId = -1;
      const negativePhaseId = -2;
      const mockRequest = {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(negativeEventId), BigInt(negativePhaseId)],
      };

      vi.mocked(simulateContract).mockResolvedValue({
        request: mockRequest as never,
        result: undefined,
        chainId: 1,
      } as never);
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      // When
      const result = await BasedLinerAdapter.sendTx({
        eventId: negativeEventId,
        phaseId: negativePhaseId,
      });

      // Then
      expect(simulateContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(negativeEventId), BigInt(negativePhaseId)],
      });
      expect(result).toBe(mockTxHash);
    });

    it('should handle network connectivity issues during simulation', async () => {
      // Given
      const networkError = new Error('Network error');
      vi.mocked(simulateContract).mockRejectedValue(networkError);

      // When & Then
      await expect(
        BasedLinerAdapter.sendTx({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Network error');
    });

    it('should handle user rejection during transaction', async () => {
      // Given
      const mockRequest = {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      };
      const userRejectionError = new Error('User rejected transaction');

      vi.mocked(simulateContract).mockResolvedValue({
        request: mockRequest as never,
        result: undefined,
        chainId: 1,
      } as never);
      vi.mocked(writeContract).mockRejectedValue(userRejectionError);

      // When & Then
      await expect(
        BasedLinerAdapter.sendTx({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('User rejected transaction');
    });

    it('should handle insufficient gas errors', async () => {
      // Given
      const gasError = new Error('Insufficient gas');
      vi.mocked(simulateContract).mockRejectedValue(gasError);

      // When & Then
      await expect(
        BasedLinerAdapter.sendTx({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Insufficient gas');
    });
  });

  describe('isPhaseOpen', () => {
    it('should return true when phase is open', async () => {
      // Given
      vi.mocked(readContract).mockResolvedValue(true);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: mockEventId,
        phaseId: mockPhaseId,
      });

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      });
      expect(result).toBe(true);
    });

    it('should return false when phase is closed', async () => {
      // Given
      vi.mocked(readContract).mockResolvedValue(false);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: mockEventId,
        phaseId: mockPhaseId,
      });

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      });
      expect(result).toBe(false);
    });

    it('should throw error when contract call fails', async () => {
      // Given
      const contractError = new Error('Contract call failed');
      vi.mocked(readContract).mockRejectedValue(contractError);

      // When & Then
      await expect(
        BasedLinerAdapter.isPhaseOpen({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Contract call failed');

      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(mockEventId), BigInt(mockPhaseId)],
      });
    });

    it('should handle edge case with zero eventId and phaseId', async () => {
      // Given
      vi.mocked(readContract).mockResolvedValue(false);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: 0,
        phaseId: 0,
      });

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(0), BigInt(0)],
      });
      expect(result).toBe(false);
    });

    it('should handle large numbers for eventId and phaseId', async () => {
      // Given
      const largeEventId = 999999;
      const largePhaseId = 888888;
      vi.mocked(readContract).mockResolvedValue(true);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: largeEventId,
        phaseId: largePhaseId,
      });

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(largeEventId), BigInt(largePhaseId)],
      });
      expect(result).toBe(true);
    });

    it('should handle negative numbers by converting to BigInt', async () => {
      // Given
      const negativeEventId = -1;
      const negativePhaseId = -2;
      vi.mocked(readContract).mockResolvedValue(false);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: negativeEventId,
        phaseId: negativePhaseId,
      });

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(negativeEventId), BigInt(negativePhaseId)],
      });
      expect(result).toBe(false);
    });

    it('should handle network connectivity issues', async () => {
      // Given
      const networkError = new Error('Network error');
      vi.mocked(readContract).mockRejectedValue(networkError);

      // When & Then
      await expect(
        BasedLinerAdapter.isPhaseOpen({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Network error');
    });

    it('should handle timeout errors', async () => {
      // Given
      const timeoutError = new Error('Request timeout');
      vi.mocked(readContract).mockRejectedValue(timeoutError);

      // When & Then
      await expect(
        BasedLinerAdapter.isPhaseOpen({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Request timeout');
    });

    it('should handle RPC provider errors', async () => {
      // Given
      const rpcError = new Error('RPC call failed');
      vi.mocked(readContract).mockRejectedValue(rpcError);

      // When & Then
      await expect(
        BasedLinerAdapter.isPhaseOpen({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('RPC call failed');
    });

    it('should handle non-boolean return values from contract', async () => {
      // Given - Contract returns unexpected type
      vi.mocked(readContract).mockResolvedValue('true' as unknown as boolean);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: mockEventId,
        phaseId: mockPhaseId,
      });

      // Then - Should still work as the value is truthy
      expect(result).toBe('true');
    });

    it('should handle null/undefined contract responses', async () => {
      // Given
      vi.mocked(readContract).mockResolvedValue(null as unknown as boolean);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: mockEventId,
        phaseId: mockPhaseId,
      });

      // Then
      expect(result).toBe(null);
    });

    it('should handle contract reverts', async () => {
      // Given
      const revertError = new Error('Contract call reverted');
      vi.mocked(readContract).mockRejectedValue(revertError);

      // When & Then
      await expect(
        BasedLinerAdapter.isPhaseOpen({
          eventId: mockEventId,
          phaseId: mockPhaseId,
        }),
      ).rejects.toThrow('Contract call reverted');
    });

    it('should handle extreme value boundaries', async () => {
      // Given
      const maxSafeInteger = Number.MAX_SAFE_INTEGER;
      const minSafeInteger = Number.MIN_SAFE_INTEGER;
      vi.mocked(readContract).mockResolvedValue(true);

      // When
      const result = await BasedLinerAdapter.isPhaseOpen({
        eventId: maxSafeInteger,
        phaseId: minSafeInteger,
      });

      // Then
      expect(readContract).toHaveBeenCalledWith(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'phaseOpen',
        args: [BigInt(maxSafeInteger), BigInt(minSafeInteger)],
      });
      expect(result).toBe(true);
    });
  });
});
