import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$libs/util/logger';

import type { ProtocolApiResponse } from '../dto/protocol.dto';
import { protocolDetailsCache } from '../stores/cache';

const log = getLogger('ProtocolAdapter');

export class ProtocolAdapter {
  /**
   * Fetches protocol details from the /protocol/details endpoint.
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
    const response = await client.get<ProtocolApiResponse>(`/protocol/details`, {
      ...globalAxiosConfig,
      params: { slug: protocolSlug },
    });

    protocolDetailsCache.set(protocolSlug, season, response.data);
    return response.data;
  }
}
