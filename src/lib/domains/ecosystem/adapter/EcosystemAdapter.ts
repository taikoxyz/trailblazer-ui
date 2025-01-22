import type { CommonPageApiResponse, PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

import type { EcosystemEntry,EcosystemPageApiResponse } from '../dto/ecosystem.dto';

const log = getLogger('EcosystemAdapter');

export class EcosystemAdapter {
  /**
   * Fetches ecosystem data from the /ecosystem endpoint.
   *
   * @param {PaginationInfo<EcosystemEntry>} args
   * @param {number} season
   * @return {*}  {Promise<CommonPageApiResponse<EcosystemEntry>>}
   * @memberof EcosystemAdapter
   */
  async fetchEcosystemData(
    args: PaginationInfo<EcosystemEntry>,
    season: number,
  ): Promise<CommonPageApiResponse<EcosystemEntry>> {
    const client = getAxiosInstance(season);
    log('fetching ecosystem data', args, season);
    const response = await client.get<EcosystemPageApiResponse>('/ecosystem', {
      ...globalAxiosConfig,
      params: args,
    });
    log('ecosystemData', response.data);
    return {
      ...response.data,
    };
  }
}
