import type { AxiosInstance } from 'axios';
import { type Address, zeroAddress } from 'viem';

import { readClaimGalxePointsAlreadyRegistered } from '$generated/abi';
import { getAxiosInstance } from '$lib/shared/services/api/axiosClient';
import { wagmiConfig } from '$lib/shared/wagmi';
import { globalAxiosConfig } from '$libs/api/axiosConfig';

import { SeasonBonusPointsAdapter } from './SeasonBonusPointsAdapter';

vi.mock('@wagmi/core', () => ({
  writeContract: vi.fn(),
  reconnect: vi.fn(),
}));

vi.mock('$lib/shared/services/api/axiosClient', async () => {
  const actual = await vi.importActual('$lib/shared/services/api/axiosClient');
  return {
    ...actual,
    getAxiosInstance: vi.fn(),
  };
});

vi.mock('$lib/shared/stores/pendingTransactions', () => ({
  pendingTransactions: {
    add: vi.fn(),
  },
}));

vi.mock('$libs/api/axiosConfig', () => ({
  globalAxiosConfig: {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
}));

vi.mock('$lib/shared/wagmi', () => ({
  wagmiConfig: {
    chainId: 1,
  },
}));

vi.mock('$lib/shared/utils/chain', () => ({
  chainId: 1,
}));

vi.mock('$generated/abi', () => ({
  readClaimGalxePointsAlreadyRegistered: vi.fn(),
}));

describe('SeasonBonusPointsAdapter', () => {
  let seasonBonusPointsAdapter: SeasonBonusPointsAdapter;
  const mockAddress: Address = zeroAddress;

  beforeEach(() => {
    seasonBonusPointsAdapter = new SeasonBonusPointsAdapter();
    vi.clearAllMocks();
  });

  it('should fetch user bonus points', async () => {
    // Given
    const mockResponse = { data: { address: zeroAddress, value: 100 } };
    const mockClient = {
      get: vi.fn().mockResolvedValue(mockResponse),
    };
    vi.mocked(getAxiosInstance).mockReturnValue(mockClient as unknown as AxiosInstance);

    // When
    const result = await seasonBonusPointsAdapter.fetchUserBonusPoints(mockAddress, 1);

    // Then
    expect(result).toBe(100);
    expect(mockClient.get).toHaveBeenCalledWith('/user/bonus', {
      ...globalAxiosConfig,
      params: { address: mockAddress },
    });
  });

  it('should claim user bonus points', async () => {});

  it('should return true if user has already claimed bonus points', async () => {
    // Given
    const mockIsClaimed = true;
    vi.mocked(readClaimGalxePointsAlreadyRegistered).mockResolvedValue(mockIsClaimed);

    // When
    const result = await seasonBonusPointsAdapter.checkClaimed(mockAddress, 1);

    // Then
    expect(result).toBe(true);
    expect(readClaimGalxePointsAlreadyRegistered).toHaveBeenCalledWith(wagmiConfig, {
      args: [mockAddress],
      chainId: 1,
    });
  });

  it('should return false if user has not claimed bonus points', async () => {});
});
