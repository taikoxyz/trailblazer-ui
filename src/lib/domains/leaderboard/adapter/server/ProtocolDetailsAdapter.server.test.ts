import { zeroAddress } from 'viem';

import { API_KEY } from '$env/static/private';
import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { protocolDetailsCache } from '$lib/domains/leaderboard/stores/cache';
import { fetchFromApi } from '$shared/services/api/fetchClient';

import { ProtocolDetailsAdapter } from './ProtocolDetailsAdapter.server';

vi.mock('$shared/services/api/fetchClient', () => ({
  fetchFromApi: vi.fn(),
}));

vi.mock('$lib/domains/leaderboard/stores/cache', () => ({
  protocolDetailsCache: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe('ProtocolDetailsAdapter', () => {
  let protocolAdapter: ProtocolDetailsAdapter;
  const protocolUrl = 'mock';
  const season = 1;
  const edition = 1;
  beforeEach(() => {
    vi.clearAllMocks();
    protocolAdapter = new ProtocolDetailsAdapter(protocolUrl);
  });

  describe('fetchProtocolDetails', () => {
    const protocolSlug = 'example-protocol';

    it('should fetch protocol details when cache is empty for edition 1 (cache miss)', async () => {
      // Given
      const cacheKey = `${protocolSlug}-${protocolUrl}-${edition}`;
      vi.mocked(protocolDetailsCache.get).mockReturnValue(undefined);
      const mockResponseData: ProtocolApiResponse = {
        protocols: [{ address: zeroAddress, score: 100 }],
        metadata: {
          name: 'Example Protocol',
          slug: protocolSlug,
          twitter: '@exampleprotocol',
          logo: 'https://example.com/logo.png',
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockResponseData);

      // When
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season, edition);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(fetchFromApi).toHaveBeenCalledWith(`/protocol/${protocolUrl}?slug=${protocolSlug}`, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      expect(protocolDetailsCache.set).toHaveBeenCalledWith(cacheKey, mockResponseData);
      expect(result).toEqual(mockResponseData);
    });

    it('should fetch protocol details when cache is empty for edition 3 (cache miss)', async () => {
      // Given
      const edition = 3;
      const cacheKey = `${protocolSlug}-${protocolUrl}-${edition}`;
      vi.mocked(protocolDetailsCache.get).mockReturnValue(undefined);
      const mockResponseData: ProtocolApiResponse = {
        protocols: [{ address: zeroAddress, score: 150 }],
        metadata: {
          name: 'Example Protocol Edition 3',
          slug: protocolSlug,
          twitter: '@exampleprotocol3',
          logo: 'https://example.com/logo3.png',
        },
      };
      vi.mocked(fetchFromApi).mockResolvedValue(mockResponseData);

      // When
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season, edition);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(fetchFromApi).toHaveBeenCalledWith(`/protocol/${protocolUrl}/${edition}?slug=${protocolSlug}`, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      expect(protocolDetailsCache.set).toHaveBeenCalledWith(cacheKey, mockResponseData);
      expect(result).toEqual(mockResponseData);
    });

    it('should return cached protocol details when available (cache hit)', async () => {
      // Given
      const edition = 1;
      const cacheKey = `${protocolSlug}-${protocolUrl}-${edition}`;
      const cachedData: ProtocolApiResponse = {
        protocols: [{ address: zeroAddress, score: 200 }],
        metadata: {
          name: 'Cached Protocol',
          slug: protocolSlug,
          twitter: '@cachedprotocol',
          logo: 'https://example.com/cached-logo.png',
        },
      };
      vi.mocked(protocolDetailsCache.get).mockReturnValue(cachedData);

      // When
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season, edition);

      // Then
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(cacheKey);
      expect(fetchFromApi).not.toHaveBeenCalled();
      expect(result).toEqual(cachedData);
    });
  });
});
