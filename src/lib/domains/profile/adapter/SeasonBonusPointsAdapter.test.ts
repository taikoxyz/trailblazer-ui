import type { AxiosInstance } from 'axios';
import type { Address } from 'viem';
import { zeroAddress } from 'viem';
import { vi } from 'vitest';

import { readEventRegisterEvents, readEventRegisterRegistrations, writeEventRegisterRegister } from '$generated/abi';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { pendingTransactions } from '$shared/stores/pendingTransactions';

import { SeasonBonusPointsAdapter } from './SeasonBonusPointsAdapter';

vi.mock('$generated/abi', () => ({
  readEventRegisterEvents: vi.fn(),
  readEventRegisterRegistrations: vi.fn(),
  writeEventRegisterRegister: vi.fn(),
}));

vi.mock('$lib/shared/wagmi', () => ({
  wagmiConfig: {},
}));

vi.mock('$lib/shared/services/api/axiosClient', async () => {
  const actual = await vi.importActual('$lib/shared/services/api/axiosClient');
  return {
    ...actual,
    getAxiosInstance: vi.fn(),
  };
});

vi.mock('$shared/stores/pendingTransactions', () => ({
  pendingTransactions: {
    add: vi.fn(),
  },
}));

describe('SeasonBonusPointsAdapter', () => {
  let adapter: SeasonBonusPointsAdapter;
  const mockAddress: Address = zeroAddress;

  beforeEach(() => {
    adapter = new SeasonBonusPointsAdapter();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('fetchUserBonusPoints', () => {
    it('should fetch the user bonus points', async () => {
      const mockResponse = { data: { value: 100 } };
      const mockClient = { get: vi.fn().mockResolvedValue(mockResponse) };

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient as unknown as AxiosInstance);

      const result = await adapter.fetchUserBonusPoints(mockAddress, 1);

      expect(getAxiosInstance).toHaveBeenCalledWith(1);
      expect(mockClient.get).toHaveBeenCalledWith('/user/bonus', {
        params: { address: mockAddress },
        ...globalAxiosConfig,
      });
      expect(result).toBe(100);
    });
  });

  describe('claimUserBonusPoints', () => {
    it('should claim the user bonus points', async () => {
      const mockTxHash = '0xTransactionHash';
      vi.mocked(writeEventRegisterRegister).mockResolvedValue(mockTxHash);

      const result = await adapter.claimUserBonusPoints(mockAddress, 2);

      expect(writeEventRegisterRegister).toHaveBeenCalledWith(expect.any(Object), {
        args: [BigInt(0)],
        chainId: expect.any(Number),
      });
      expect(pendingTransactions.add).toHaveBeenCalledWith(mockTxHash);
      expect(result).toBe(mockTxHash);
    });
  });

  describe('checkRegistered', () => {
    it('should check if the user has registered their bonus points', async () => {
      vi.mocked(readEventRegisterRegistrations).mockResolvedValue(true);

      const result = await adapter.checkRegistered(mockAddress, 2);

      expect(readEventRegisterRegistrations).toHaveBeenCalledWith(expect.any(Object), {
        args: [BigInt(0), mockAddress],
        chainId: expect.any(Number),
      });
      expect(result).toBe(true);
    });

    it('should throw an error if no address is provided', async () => {
      await expect(adapter.checkRegistered('' as Address, 2)).rejects.toThrow('Address not found');
    });
  });

  describe('checkRegistrationOpen', () => {
    it('should check if the registration is open for an event', async () => {
      const mockEvent: [bigint, string, boolean, boolean] = [BigInt(1), 'Season 1', true, true];
      vi.mocked(readEventRegisterEvents).mockResolvedValue(mockEvent);

      const result = await adapter.checkRegistrationOpen(1);

      expect(readEventRegisterEvents).toHaveBeenCalledWith(expect.any(Object), {
        args: [BigInt(1)],
        chainId: expect.any(Number),
      });
      expect(result).toBe(true);
    });
  });
});
