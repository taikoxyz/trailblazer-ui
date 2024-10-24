import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import { protocolDetailsCache } from '$lib/domains/leaderboard/stores/cache';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('ProtocolAdapter');

export class ProtocolAdapter {
  /**
   * Fetches protocol details from the /protocol/dapp endpoint.
   *
   * @param {string} protocolSlug the protocol's slug
   * @param {number} season the season the protocol's details are being fetched for
   * @return {*}  {Promise<ProtocolApiResponse>}
   * @memberof ProtocolAdapter
   */
  async fetchProtocolDetails(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    const cachedData = protocolDetailsCache.get(protocolSlug, season);
    if (cachedData) {
      return cachedData;
    }

    log(`Cache miss for ${protocolSlug}, fetching from API`);
    const client = getAxiosInstance(season);
    const response = await client.get<ProtocolApiResponse>(`/protocol/dapp`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });
    log(`Fetched protocol details for ${protocolSlug}`, response.data);
    protocolDetailsCache.set(protocolSlug, season, response.data);
    return response.data;
  }

  /**
   * Fetches gaming protocol details from the /protocol/gaming endpoint.
   *
   * @param {string} protocolSlug
   * @param {number} season
   * @return {*}  {Promise<ProtocolApiResponse>}
   * @memberof ProtocolAdapter
   */
  async fetchGamingProtocolDetails(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    const client = getAxiosInstance(season);
    const response = await client.get<ProtocolApiResponse>(`/protocol/gaming`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });
    log(`Fetched protocol details for ${protocolSlug}`, response.data);
    return response.data;
  }

  /**
   * Fetches competition data from the /protocol/competition endpoint.
   *
   * @param {string} protocolSlug
   * @param {number} season
   * @return {*}  {Promise<ProtocolApiResponse>}
   * @memberof ProtocolAdapter
   */
  async fetchCompetitionData(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    const client = getAxiosInstance(season);
    const response = await client.get<ProtocolApiResponse>(`/protocol/competition`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });
    log(`Fetched protocol details for ${protocolSlug}`, response.data);
    return response.data;
  }
}
