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

    it('should fetch protocol details when cache is empty (cache miss)', async () => {
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
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season, edition);
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(protocolSlug, season, protocolUrl);
      expect(fetchFromApi).toHaveBeenCalledWith(`/protocol/${protocolUrl}?slug=${protocolSlug}`, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      expect(protocolDetailsCache.set).toHaveBeenCalledWith(protocolSlug, season, protocolUrl, mockResponseData);
      expect(result).toEqual(mockResponseData);
    });

    it('should return cached protocol details when available (cache hit)', async () => {
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
      const result = await protocolAdapter.fetchProtocolDetails(protocolSlug, season, edition);
      expect(protocolDetailsCache.get).toHaveBeenCalledWith(protocolSlug, season, protocolUrl);
      expect(fetchFromApi).not.toHaveBeenCalled();
      expect(result).toEqual(cachedData);
    });
  });
});
