import type { AxiosInstance } from 'axios';
import { zeroAddress } from 'viem';

import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { protocolDetailsCache } from '$lib/domains/leaderboard/stores/cache';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

vi.mock('$lib/shared/services/api/axiosClient', () => ({
  getAxiosInstance: vi.fn(),
  globalAxiosConfig: {},
}));

vi.mock('$lib/domains/leaderboard/stores/cache', () => ({
  protocolDetailsCache: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe('ProtocolAdapter', () => {
  let protocolAdapter: ProtocolAdapter;
  const protocolUrl = 'mock';

  beforeEach(() => {
    protocolAdapter = new ProtocolAdapter('mock');
    vi.clearAllMocks();
  });

  describe('fetchProtocolDetails', () => {
    const protocolSlug = 'example-protocol';
    const season = 1;
    it('should fetch protocol details when cache is empty (cache miss)', async () => {
      // Given
      const cacheKey = `${protocolSlug}-${protocolUrl}-${season}`;
      const mockResponseData: ProtocolApiResponse = {
        protocols: [
          {
            address: zeroAddress,
            score: 100,
          },
        ],
        metadata: {
          name: 'Example Protocol',
          slug: protocolSlug,
          twitter: '@exampleprotocol',
          logo: 'https://example.com/logo.png',
        },
      };

      const mockResponse = {
        data: mockResponseData,
      };

      // Mock cache to return undefined (cache miss)
      vi.mocked(protocolDetailsCache.get).mockReturnValue(undefined);

      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      // When
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(getAxiosInstance).toHaveBeenCalledWith(season);
      expect(mockClient.get).toHaveBeenCalledWith('/protocol/mock', {
        ...globalAxiosConfig,
        params: { slug: protocolSlug },
      });
      expect(protocolDetailsCache.set).toHaveBeenCalledWith(cacheKey, mockResponseData);
      expect(result).toEqual(mockResponseData);
    });

    it('should return cached protocol details when available (cache hit)', async () => {
      // Given
      const cacheKey = `${protocolSlug}-${protocolUrl}-${season}`;
      const cachedData: ProtocolApiResponse = {
        protocols: [
          {
            address: zeroAddress,
            score: 200,
          },
        ],
        metadata: {
          name: 'Cached Protocol',
          slug: protocolSlug,
          twitter: '@cachedprotocol',
          logo: 'https://example.com/cached-logo.png',
        },
      };

      vi.mocked(protocolDetailsCache.get).mockReturnValue(cachedData);

      // When
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(getAxiosInstance).not.toHaveBeenCalled();
      expect(result).toEqual(cachedData);
    });
  });

  describe('fetchGamingProtocolDetails', () => {
    const protocolSlug = 'example-gaming-protocol';
    const season = 1;
    const cacheType = 'gaming';
    const cacheKey = `${protocolSlug}-${protocolUrl}-${season}-${cacheType}`;

    it('should fetch gaming protocol details when cache is empty (cache miss)', async () => {
      // Given
      const mockResponseData: ProtocolApiResponse = {
        protocols: [
          {
            address: zeroAddress,
            score: 150,
          },
        ],
        metadata: {
          name: 'Example Gaming Protocol',
          slug: protocolSlug,
          twitter: '@examplegaming',
          logo: 'https://example.com/gaming-logo.png',
        },
      };

      const mockResponse = {
        data: mockResponseData,
      };

      // Mock cache to return undefined (cache miss)
      vi.mocked(protocolDetailsCache.get).mockReturnValue(undefined);

      // Mock Axios client
      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      // When
      const result = await protocolAdapter.fetchGamingProtocolDetails(protocolSlug, season);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(getAxiosInstance).toHaveBeenCalledWith(season);
      expect(mockClient.get).toHaveBeenCalledWith('/protocol/gaming', {
        ...globalAxiosConfig,
        params: { slug: protocolSlug },
      });
      expect(protocolDetailsCache.set).toHaveBeenCalledWith(cacheKey, mockResponseData);
      expect(result).toEqual(mockResponseData);
    });

    it('should return cached gaming protocol details when available (cache hit)', async () => {
      // Given
      const cachedData: ProtocolApiResponse = {
        protocols: [
          {
            address: zeroAddress,
            score: 250,
          },
        ],
        metadata: {
          name: 'Cached Gaming Protocol',
          slug: protocolSlug,
          twitter: '@cachedgaming',
          logo: 'https://example.com/cached-gaming-logo.png',
        },
      };

      // Mock cache to return cached data
      vi.mocked(protocolDetailsCache.get).mockReturnValue(cachedData);

      // When
      const result = await protocolAdapter.fetchGamingProtocolDetails(protocolSlug, season);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(getAxiosInstance).not.toHaveBeenCalled();
      expect(result).toEqual(cachedData);
    });
  });
});
