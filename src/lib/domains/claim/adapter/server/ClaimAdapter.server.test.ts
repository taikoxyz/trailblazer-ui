import type { Address, Hex } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { TooManyRequestsError } from '$shared/types/errors';

import { ClaimAdapter } from './ClaimAdapter.server';

vi.mock('$shared/services/api/fetchClient', () => ({
  fetchFromApi: vi.fn(),
}));

vi.mock('@wagmi/core', () => ({
  writeContract: vi.fn(),
  getPublicClient: vi.fn(),
}));

vi.mock('$generated/abi', () => ({
  erc20AirdropAbi: [],
  erc20AirdropAddress: { 1: '0xMockAddress' },
}));

vi.mock('$shared/utils/chain', () => ({
  chainId: 1,
}));

vi.mock('$shared/wagmi/server', () => ({
  basedLinersServerConfig: {},
}));

vi.mock('viem', () => ({
  parseEther: vi.fn((value: string) => BigInt(value.replace('.', ''))),
}));

describe('ClaimAdapter', () => {
  const mockAddress: Address = '0x1234567890123456789012345678901234567890';
  const mockTxHash: Hex = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEligibility', () => {
    it('should successfully fetch eligibility data', async () => {
      // Given
      const mockEligibilityData = {
        address: mockAddress,
        value: '100.5',
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockEligibilityData);

      // When
      const result = await ClaimAdapter.getEligibility(mockAddress);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith(`/claim/eligibility?address=${encodeURIComponent(mockAddress)}`, 4, {
        method: 'GET',
        headers: {},
      });
      expect(result).toEqual(mockEligibilityData);
    });

    it('should handle API errors and throw descriptive error', async () => {
      // Given
      const apiError = new Error('API Error');
      vi.mocked(fetchFromApi).mockRejectedValue(apiError);

      // When & Then
      await expect(ClaimAdapter.getEligibility(mockAddress)).rejects.toThrow('Failed to fetch claim eligibility');
    });

    it('should handle 429 Too Many Requests errors and throw TooManyRequestsError', async () => {
      // Given
      const rateLimitError = new Error('API Error: 429 Too Many Requests');
      vi.mocked(fetchFromApi).mockRejectedValue(rateLimitError);

      // When & Then
      await expect(ClaimAdapter.getEligibility(mockAddress)).rejects.toThrow(TooManyRequestsError);
      await expect(ClaimAdapter.getEligibility(mockAddress)).rejects.toThrow(
        'Rate limit exceeded. Please wait before checking eligibility again.',
      );
    });
  });

  describe('getProof', () => {
    it('should successfully fetch proof data', async () => {
      // Given
      const mockProofData = {
        address: mockAddress,
        value: '100.5',
        proof: '["0x123", "0x456"]',
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockProofData);

      // When
      const result = await ClaimAdapter.getProof(mockAddress);

      // Then
      expect(fetchFromApi).toHaveBeenCalledWith(`/claim/proof?address=${encodeURIComponent(mockAddress)}`, 4, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      expect(result).toEqual(mockProofData);
    });

    it('should handle API errors and throw descriptive error', async () => {
      // Given
      const apiError = new Error('API Error');
      vi.mocked(fetchFromApi).mockRejectedValue(apiError);

      // When & Then
      await expect(ClaimAdapter.getProof(mockAddress)).rejects.toThrow('Failed to fetch claim proof');
    });

    it('should handle 429 Too Many Requests errors and throw TooManyRequestsError', async () => {
      // Given
      const rateLimitError = new Error('API Error: 429 Too Many Requests');
      vi.mocked(fetchFromApi).mockRejectedValue(rateLimitError);

      // When & Then
      await expect(ClaimAdapter.getProof(mockAddress)).rejects.toThrow(TooManyRequestsError);
      await expect(ClaimAdapter.getProof(mockAddress)).rejects.toThrow(
        'Rate limit exceeded. Please wait before requesting proof again.',
      );
    });
  });

  describe('executeClaim', () => {
    it('should successfully execute claim transaction', async () => {
      // Given
      const mockAmount = 100.5;
      const mockProof = '["0x123", "0x456"]';

      const { writeContract } = await import('@wagmi/core');
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      // When
      const result = await ClaimAdapter.executeClaim(mockAddress, mockAmount, mockProof);

      // Then
      expect(writeContract).toHaveBeenCalled();
      expect(result).toBe(mockTxHash);
    });

    it('should handle transaction errors', async () => {
      // Given
      const mockAmount = 100.5;
      const mockProof = '["0x123", "0x456"]';

      const { writeContract } = await import('@wagmi/core');
      const txError = new Error('Transaction failed');
      vi.mocked(writeContract).mockRejectedValue(txError);

      // When & Then
      await expect(ClaimAdapter.executeClaim(mockAddress, mockAmount, mockProof)).rejects.toThrow(
        'Failed to execute claim transaction',
      );
    });
  });

  describe('waitForClaimTransactionReceipt', () => {
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
      const result = await ClaimAdapter.waitForClaimTransactionReceipt({ txHash: mockTxHash });

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
      await expect(ClaimAdapter.waitForClaimTransactionReceipt({ txHash: mockTxHash })).rejects.toThrow(
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
      await expect(ClaimAdapter.waitForClaimTransactionReceipt({ txHash: mockTxHash })).rejects.toThrow(
        'No receipt found for this txHash',
      );
    });
  });
});
