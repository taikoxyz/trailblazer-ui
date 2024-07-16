import axios from 'axios';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import bridgeAdditionalData from '$libs/leaderboard/json/bridgeAdditionalData.json';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setBridgeLeaderboard, setDappLeaderboard, setUserLeaderboard } from '$stores/leaderboard';

import type {
  BridgeData,
  BridgeLeaderboardPage,
  DappLeaderboardPageApiResponse,
  DappLeaderboardPage,
  LeaderboardRow,
  PaginationInfo,
  ProtocolApiResponse,
  UserLeaderboardPageApiResponse,
  UserLeaderboardPage,
} from './types';
import { isAddress } from 'viem';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('Leaderboard');

export class Leaderboard {
  // dapp leaderboard
  static async getDappLeaderboard(args: PaginationInfo): Promise<PaginationInfo> {
    log('baseApiUrl', baseApiUrl);

    try {
      log('args', args);
      const response = await axios.get<DappLeaderboardPageApiResponse>(`${baseApiUrl}/leaderboard/dapp`, {
        ...globalAxiosConfig,
        params: args,
      });
      log('response', response);
      const leaderboardPageApiResponse: DappLeaderboardPageApiResponse = response.data;

      const leaderboardPage: DappLeaderboardPage = { items: [] };

      // Process each item concurrently and await all results
      const items = await Promise.all(
        leaderboardPageApiResponse.items.map(async (item) => {
          log('item', item.slug);
          let entry: LeaderboardRow;

          if (isAddress(item.slug)) {
            entry = {
              address: item.address,
              data: [],
              totalScore: item.score,
            };
          } else {
            const details = await axios.get<ProtocolApiResponse>(`${baseApiUrl}/protocol/details`, {
              ...globalAxiosConfig,
              params: { slug: item.slug },
            });
            const protocolDetails = details.data;
            log('data', protocolDetails);

            entry = {
              address: item.address,
              data: protocolDetails.protocols,
              totalScore: item.score,
            };
          }

          return entry;
        }),
      );

      leaderboardPage.items = items;

      setDappLeaderboard(leaderboardPage);
      log('Leaderboard page: ', leaderboardPage);
      const { page, size, total, total_pages, max_page } = leaderboardPageApiResponse;

      return {
        first: page === 0,
        last: page === max_page,
        total,
        size,
        total_pages,
        page,
      } satisfies PaginationInfo;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
    return args;
  }

  static async getUserLeaderboard() {
    try {
      const response = await axios.get<UserLeaderboardPageApiResponse>(
        `${baseApiUrl}/leaderboard/user`,
        globalAxiosConfig,
      );
      const leaderboardPage: UserLeaderboardPage = response.data as UserLeaderboardPage;
      setUserLeaderboard(leaderboardPage);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  }

  static async getBridgeLeaderboard() {
    try {
      const response = await axios.get(`${baseApiUrl}/leaderboard/bridge`, globalAxiosConfig);
      const result: BridgeLeaderboardPage = response.data as BridgeLeaderboardPage;
      setBridgeLeaderboard(this.appendBridgeAdditionalData(result.bridgingEntries));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  }

  static appendBridgeAdditionalData(page: BridgeData[]) {
    const data: { [key: string]: { name: string; twitter: string; icon: string } } = bridgeAdditionalData;

    // loop through the items in page and add data to page
    page.map((item) => {
      const additionalData = data[item.name];
      if (additionalData) {
        item.name = additionalData.name;
        item.twitter = additionalData.twitter;
        item.icon = additionalData.icon;
      }
    });

    return page;
  }
}
