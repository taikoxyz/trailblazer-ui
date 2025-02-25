import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { getLogger } from '$shared/utils/logger';

import type { ProtocolApiResponse } from '../../dto/protocol.dto';
import { protocolDetailsCache } from '../../stores/cache';

const log = getLogger('ProtocolDetailsAdapter');

export class ProtocolDetailsAdapter {
  private protocolUrl: string;

  constructor(protocolUrl: string) {
    this.protocolUrl = protocolUrl;
  }

  /**
   * Fetches protocol details from the /protocol/ endpoint.
   *
   * @param {string} protocolSlug the protocol's slug
   * @param {number} season the season the protocol's details are being fetched for
   * @param {number} edition the season the protocol's details are being fetched for
   * @return {*}  {Promise<ProtocolApiResponse>}
   * @memberof ProtocolAdapter
   */
  async fetchProtocolDetails(protocolSlug: string, season: number, edition: number): Promise<ProtocolApiResponse> {
    const cacheKey = `${protocolSlug}-${this.protocolUrl}-${edition}`;
    const cachedData = protocolDetailsCache.get(cacheKey);
    if (cachedData) {
      log(`Cache hit for ${protocolSlug}, returning cached data`, cachedData);
      return cachedData;
    }
    log(`Cache miss for ${protocolSlug}, fetching from API`);

    const queryParams = new URLSearchParams({ slug: protocolSlug });
    const endpoint = this.buildEndpoint(queryParams, season, edition);
    const data = await fetchFromApi<ProtocolApiResponse>(endpoint, season, {
      method: 'GET',
      headers: { 'x-api-key': `${API_KEY}` },
    });

    protocolDetailsCache.set(cacheKey, data);
    return data;
  }

  private buildEndpoint(params: URLSearchParams, season: number, edition: number): string {
    // For editions 1 and 2, leave the slug unchanged; for edition 3+, append the dash and edition.
    const endpointSlug = edition < 3 ? this.protocolUrl : `${this.protocolUrl}/${edition}`;
    const endpoint = `/protocol/${endpointSlug}?${params.toString()}`;
    log('Built endpoint:', endpoint);
    return endpoint;
  }
}
