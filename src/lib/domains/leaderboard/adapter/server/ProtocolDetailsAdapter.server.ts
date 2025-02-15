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
   * @return {*}  {Promise<ProtocolApiResponse>}
   * @memberof ProtocolAdapter
   */
  async fetchProtocolDetails(protocolSlug: string, season: number): Promise<ProtocolApiResponse> {
    const cachedData = protocolDetailsCache.get(protocolSlug, season, this.protocolUrl);
    if (cachedData) {
      return cachedData;
    }

    log(`Cache miss for ${protocolSlug}, fetching from API`);

    const queryParams = new URLSearchParams({ slug: protocolSlug });
    const data = await fetchFromApi<ProtocolApiResponse>(
      `/protocol/${this.protocolUrl}?${queryParams.toString()}`,
      season,
      {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      },
    );

    log(`Fetched protocol details for ${protocolSlug}`);
    protocolDetailsCache.set(protocolSlug, season, this.protocolUrl, data);
    return data;
  }
}
