import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ClaimClientAdapter } from './ClaimClientAdapter';

// Mock dependencies
vi.mock('@wagmi/core', () => ({
  readContract: vi.fn(),
  watchAsset: vi.fn(),
  writeContract: vi.fn(),
}));

// Mock fetch globally
global.fetch = vi.fn();

describe('ClaimClientAdapter', () => {
  let claimAdapter: ClaimClientAdapter;
  const mockAddress = '0x1234567890123456789012345678901234567890';
  const mockTxHash = '0xabcdef1234567890';

  beforeEach(() => {
    claimAdapter = new ClaimClientAdapter();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('checkEligibility', () => {
    it('should successfully check eligibility', async () => {
      // Given
      const mockEligibilityData = {
        address: mockAddress,
        value: '100.5',
      };

      const mockResponse: Response = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockEligibilityData),
      } as unknown as Response;

      vi.mocked(fetch).mockResolvedValue(mockResponse);

      // When
      const result = await claimAdapter.checkEligibility(mockAddress);

      // Then
      expect(fetch).toHaveBeenCalledWith(`/api/s4/claim/eligibility?address=${encodeURIComponent(mockAddress)}`);
      expect(result).toEqual(mockEligibilityData);
    });

    it('should handle API errors', async () => {
      // Given
      const mockResponse: Response = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as unknown as Response;

      vi.mocked(fetch).mockResolvedValue(mockResponse);

      // When & Then
      await expect(claimAdapter.checkEligibility(mockAddress)).rejects.toThrow(
        'Failed to check eligibility: 404 Not Found',
      );
    });
  });

  describe('executeClaim', () => {
    it('should successfully execute claim', async () => {
      // Given
      const mockProofResponse = {
        proof: '["0x123456"]',
        amount: '100.5',
      };

      const mockFetchResponse: Response = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockProofResponse),
      } as unknown as Response;

      vi.mocked(fetch).mockResolvedValue(mockFetchResponse);

      const { writeContract } = await import('@wagmi/core');
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      // When
      const result = await claimAdapter.executeClaim(mockAddress);

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/s4/claim/proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: mockAddress }),
      });
      expect(writeContract).toHaveBeenCalled();
      expect(result).toBe(mockTxHash);
    });

    it('should handle proof fetch errors', async () => {
      // Given
      const mockResponse: Response = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as unknown as Response;

      vi.mocked(fetch).mockResolvedValue(mockResponse);

      // When & Then
      await expect(claimAdapter.executeClaim(mockAddress)).rejects.toThrow(
        'Failed to fetch proof: 500 Internal Server Error',
      );
    });
  });

  describe('hasClaimed', () => {
    it('should check if user has claimed', async () => {
      // Given
      const mockEligibilityData = {
        address: mockAddress,
        value: '100.5',
      };

      const mockFetchResponse: Response = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockEligibilityData),
      } as unknown as Response;

      vi.mocked(fetch).mockResolvedValue(mockFetchResponse);

      const { readContract } = await import('@wagmi/core');
      vi.mocked(readContract).mockResolvedValue(true);

      // When
      const result = await claimAdapter.hasClaimed(mockAddress, 2);

      // Then
      expect(result).toBe(true);
      expect(readContract).toHaveBeenCalled();
    });

    it('should handle errors and return null', async () => {
      // Given
      const mockResponse: Response = {
        ok: false,
        status: 500,
        statusText: 'Error',
      } as unknown as Response;

      vi.mocked(fetch).mockResolvedValue(mockResponse);

      // When
      const result = await claimAdapter.hasClaimed(mockAddress, 2);

      // Then
      expect(result).toBe(null);
    });
  });

  describe('addTokenToWallet', () => {
    it('should add token to wallet', async () => {
      // Given
      const { watchAsset } = await import('@wagmi/core');
      vi.mocked(watchAsset).mockResolvedValue(true);

      // When
      const result = await claimAdapter.addTokenToWallet();

      // Then
      expect(watchAsset).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
