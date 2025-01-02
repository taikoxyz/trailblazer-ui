import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { protocolDetailsCache } from '$lib/domains/leaderboard/stores/cache';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('ProtocolAdapter');

export class ProtocolAdapter {
  private protocolUrl: string;

  constructor(protocolUrl: string) {
    this.protocolUrl = protocolUrl;
  }

  /**
   * Fetches protocol details from the /protocol/ endpoint.
   *
   * @param {string} protocolSlug the protocol's slug
   * @param {number} season the season the protocol's details are being fetched for
   * @return {*}  {Promise<ProtocolApiResponse>}
   * @memberof ProtocolAdapter
   */
  async fetchProtocolDetails(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    log(`Fetching protocol details for ${protocolSlug} from ${this.protocolUrl} endpoint for season ${season}`);
    const cachedData = protocolDetailsCache.get(protocolSlug, season, this.protocolUrl);
    if (cachedData) {
      return cachedData;
    }

    log(`Cache miss for ${protocolSlug}, fetching from API`);
    const client = getAxiosInstance(season);
    const response = await client.get<ProtocolApiResponse>(`/protocol/${this.protocolUrl}`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });
    log(`Fetched protocol details for ${protocolSlug}`, response.data);
    protocolDetailsCache.set(protocolSlug, season, this.protocolUrl, response.data);
    return response.data;
  }

  /**
   * Fetches gaming protocol details from the /protocol/gaming endpoint.
   */
  async fetchGamingProtocolDetails(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    const cacheType = 'gaming';
    const cachedData = protocolDetailsCache.get(protocolSlug, season, cacheType);
    if (cachedData) {
      return cachedData;
    }

    log(`Cache miss for gaming protocol ${protocolSlug}, fetching from API`);
    const client = getAxiosInstance(season);
    const response = await client.get<ProtocolApiResponse>(`/protocol/${cacheType}`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });
    log(`Fetched gaming protocol details for ${protocolSlug}`, response.data);
    protocolDetailsCache.set(protocolSlug, season, cacheType, response.data);
    return response.data;
  }

  /**
   * Fetches competition data from the /protocol/competition endpoint.
   */
  async fetchCompetitionData(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    const cacheType = 'competition';
    const cachedData = protocolDetailsCache.get(protocolSlug, season, cacheType);
    if (cachedData) {
      return cachedData;
    }

    log(`Cache miss for competition protocol ${protocolSlug}, fetching from API`);
    const client = getAxiosInstance(season);
    const response = await client.get<ProtocolApiResponse>(`/protocol/${cacheType}`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });
    log(`Fetched competition protocol details for ${protocolSlug}`, response.data);
    protocolDetailsCache.set(protocolSlug, season, cacheType, response.data);
    return response.data;
  }
}
