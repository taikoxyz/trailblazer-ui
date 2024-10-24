import axios from 'axios';
import type { Address } from 'viem';

import { taikoonTokenAddress } from '$generated/abi';
import Taikoon from '$lib/domains/nfts/types/taikoon';
import { globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';

import { TaikoonAdapter } from './TaikoonAdapter';

vi.mock('$lib/domains/nfts/types/taikoon', () => ({
  default: {
    balanceOf: vi.fn(),
    tokenOfOwner: vi.fn(),
    tokenURI: vi.fn(),
  },
}));

vi.mock('axios', () => ({
  default: vi.fn(),
}));

describe('TaikoonAdapter', () => {
  let taikoonAdapter: TaikoonAdapter;
  const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678' as Address;

  const mockTokenOfOwner = vi.mocked(Taikoon.tokenOfOwner);
  const mockTokenURI = vi.mocked(Taikoon.tokenURI);
  const mockAxiosInstance = vi.mocked(axios);

  beforeEach(() => {
    taikoonAdapter = new TaikoonAdapter();
    vi.clearAllMocks();
  });

  describe('fetchUserTaikoonNFTs', () => {
    it('should return an array of NFTs when user has Taikoon NFTs', async () => {
      const mockTokenIds = [1, 2, 3];
      const mockURIs = [
        'https://example.com/metadata/1.json',
        'https://example.com/metadata/2.json',
        'https://example.com/metadata/3.json',
      ];
      const mockMetadataResponses = [
        { data: { image: 'https://example.com/images/1.png' } },
        { data: { image: 'https://example.com/images/2.png' } },
        { data: { image: 'https://example.com/images/3.png' } },
      ];

      mockTokenOfOwner.mockResolvedValue(mockTokenIds);
      mockTokenURI
        .mockResolvedValueOnce(mockURIs[0])
        .mockResolvedValueOnce(mockURIs[1])
        .mockResolvedValueOnce(mockURIs[2]);
      mockAxiosInstance
        .mockResolvedValueOnce(mockMetadataResponses[0])
        .mockResolvedValueOnce(mockMetadataResponses[1])
        .mockResolvedValueOnce(mockMetadataResponses[2]);

      //When
      const result = await taikoonAdapter.fetchUserTaikoonNFTs(mockAddress);

      // Then
      expect(Taikoon.tokenOfOwner).toHaveBeenCalledWith(mockAddress);
      expect(Taikoon.tokenURI).toHaveBeenCalledTimes(mockTokenIds.length);
      mockTokenIds.forEach((tokenId, index) => {
        expect(Taikoon.tokenURI).toHaveBeenNthCalledWith(1 + index, tokenId);
      });
      expect(axios).toHaveBeenCalledTimes(mockTokenIds.length);
      mockURIs.forEach((uri, index) => {
        expect(axios).toHaveBeenNthCalledWith(1 + index, {
          ...globalAxiosConfig,
          url: `/api/proxy?url=${uri}`,
        });
      });

      const expectedNFTs: NFT[] = mockTokenIds.map((tokenId, index) => ({
        address: taikoonTokenAddress[chainId],
        tokenId,
        assets: { image: mockMetadataResponses[index].data.image },
        tokenUri: mockMetadataResponses[index].data.image,
      }));

      expect(result).toEqual(expectedNFTs);
    });

    it('should return an empty array when user has no Taikoon NFTs', async () => {
      // Given
      mockTokenOfOwner.mockResolvedValue([]);

      //When
      const result = await taikoonAdapter.fetchUserTaikoonNFTs(mockAddress);

      // Then
      expect(Taikoon.tokenOfOwner).toHaveBeenCalledWith(mockAddress);
      expect(Taikoon.tokenURI).not.toHaveBeenCalled();
      expect(axios).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should throw an error if axios fails for any tokenId', async () => {
      // Given
      const mockTokenIds = [1, 2];
      const mockURIs = ['https://example.com/metadata/1.json', 'https://example.com/metadata/2.json'];
      mockTokenOfOwner.mockResolvedValue(mockTokenIds);
      mockTokenURI.mockResolvedValueOnce(mockURIs[0]).mockResolvedValueOnce(mockURIs[1]);
      mockAxiosInstance
        .mockResolvedValueOnce({ data: { image: 'https://example.com/images/1.png' } })
        .mockRejectedValueOnce(new Error('axios failed'));

      // When & Then
      await expect(taikoonAdapter.fetchUserTaikoonNFTs(mockAddress)).rejects.toThrow('axios failed');

      expect(Taikoon.tokenOfOwner).toHaveBeenCalledWith(mockAddress);
      expect(Taikoon.tokenURI).toHaveBeenCalledTimes(2);
      expect(Taikoon.tokenURI).toHaveBeenNthCalledWith(1, 1);
      expect(Taikoon.tokenURI).toHaveBeenNthCalledWith(2, 2);
      expect(axios).toHaveBeenCalledTimes(2);
      expect(axios).toHaveBeenNthCalledWith(1, {
        ...globalAxiosConfig,
        url: `/api/proxy?url=${mockURIs[0]}`,
      });
      expect(axios).toHaveBeenNthCalledWith(2, {
        ...globalAxiosConfig,
        url: `/api/proxy?url=${mockURIs[1]}`,
      });
    });
  });
});
