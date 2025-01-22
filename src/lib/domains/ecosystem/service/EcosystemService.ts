import { getLogger } from '$shared/utils/logger';

import { EcosystemAdapter } from '../adapter/EcosystemAdapter';
import type { IEcosystemPartner } from '../components/partners';

const log = getLogger('EcosystemService');

export class EcosystemService {
  // Adapter
  private ecosystemAdapter: EcosystemAdapter;

  constructor(ecosystemAdapter?: EcosystemAdapter) {
    this.ecosystemAdapter = ecosystemAdapter || new EcosystemAdapter();
  }

  /**
   * Fetches ecosystem data for the given season.
   *
   * @param {number} season
   * @return {*}  {Promise<IEcosystemPartner[]>}
   * @memberof EcosystemService
   */
  async getEcosystemEntries(season: number): Promise<IEcosystemPartner[]> {
    log('Fetching ecosystem data', { season });
    const response = await this.ecosystemAdapter.fetchEcosystemData({ page: 0, size: 100, total: 10 }, season);
    if (!response.data.items?.length) {
      log('No ecosystem items found', { season });
      return [];
    }

    const entries = response.data.items.map((item) => {
      return {
        name: item.name,
        logo: item.logo,
        description: item.description,
        category: item.category,
        url: item.website,
      };
    });

    return entries;
  }
}
