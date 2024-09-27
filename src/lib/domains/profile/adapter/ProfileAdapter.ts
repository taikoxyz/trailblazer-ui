import type { Address } from 'viem';

import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

import type { DomainResponse, UserPointHistoryPage, UserPointsAndRankResponse } from '../dto/profile.dto';

export class ProfileApiAdapter {
  /**
   * Fetches user points and rank from the /user/rank endpoint.
   */
  async fetchUserPointsAndRank(address: Address, season: number) {
    const client = getAxiosInstance(season);
    const response: UserPointsAndRankResponse = await client.get(`/user/rank`, {
      params: { address },
      ...globalAxiosConfig,
    });

    return response.data;
  }

  /**
   * Fetches user activity history from the api
   */
  async fetchUserActivity(address: Address, season: number, page?: number): Promise<UserPointHistoryPage> {
    const client = getAxiosInstance(season);
    const params = page ? { address, page } : { address };
    const response = await client.get(`/user/history`, {
      params,
      ...globalAxiosConfig,
    });
    return response.data;
  }

  /**
   * Fetches user domain-specific data from the /user/domain endpoint.
   */
  async fetchUserDomainInfo(address: Address): Promise<DomainResponse> {
    const client = getAxiosInstance();
    const response = await client.get<DomainResponse>(`/user/domain`, {
      params: { address },
      ...globalAxiosConfig,
    });
    return response.data;
  }
}
