import { type Address, zeroAddress } from 'viem';

import type { NFT } from '$lib/shared/types/NFT';

import { TaikoonAdapter } from '../adapter/TaikoonAdapter';
import { TaikoonService } from './TaikoonService';

vi.mock('../adapter/TaikoonAdapter', () => {
  return {
    TaikoonAdapter: vi.fn().mockImplementation(() => ({
      fetchUserTaikoonNFTs: vi.fn(),
    })),
  };
});

describe('TaikoonService', () => {
  let taikoonService: TaikoonService;
  const mockAddress: Address = zeroAddress;
  let mockTaikoonAdapter: TaikoonAdapter;

  beforeEach(() => {
    mockTaikoonAdapter = new TaikoonAdapter();

    taikoonService = new TaikoonService(mockTaikoonAdapter);

    vi.clearAllMocks();
  });

  it('should return taikoons for a user', async () => {
    // Given
    const expectedTaikoons: NFT[] = [
      {
        address: zeroAddress,
        src: '/taikoons/0.png',
        tokenId: 0,
        tokenUri: '',
      },
      {
        address: zeroAddress,
        src: '/taikoons/1.png',
        tokenId: 1,
        tokenUri: '',
      },
    ];

    vi.mocked(mockTaikoonAdapter.fetchUserTaikoonNFTs).mockResolvedValue(expectedTaikoons);

    // When
    const result = await taikoonService.getTaikoons(mockAddress);

    // Then
    expect(mockTaikoonAdapter.fetchUserTaikoonNFTs).toHaveBeenCalledWith(mockAddress);
    expect(result).toEqual(expectedTaikoons);
  });
});
