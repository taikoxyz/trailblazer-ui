import type { Address } from 'viem';

import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';

import type { DomainResponse, UserPointHistoryPage, UserPointsAndRankResponse } from '../dto/profile.dto';

export class ProfileApiAdapter {
  /**
   * Fetches user points and rank from the /user/rank endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's points and rank are being fetched for
   * @return {*}
   * @memberof ProfileApiAdapter
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
   * Fetches user activity from the /user/history endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's activity is being fetched for
   * @param {number} [page] the page number of the activity
   * @return {*}  {Promise<UserPointHistoryPage>}
   * @memberof ProfileApiAdapter
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
   * Fetches user domain info from the /user/domain endpoint.
   *
   * @param {Address} address the user's address
   * @return {*}  {Promise<DomainResponse>}
   * @memberof ProfileApiAdapter
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
