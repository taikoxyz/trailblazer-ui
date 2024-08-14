import axios from 'axios';
import { isAddress } from 'viem';

import { errorToast } from '$components/NotificationToast';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import bridgeAdditionalData from '$libs/leaderboard/json/bridgeAdditionalData.json';
import dappDetailsMapping from '$libs/leaderboard/json/dappDetailsMapping.json';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setBridgeLeaderboard, setDappLeaderboard, setDappLeaderboardLastUpdated } from '$stores/leaderboard';
import {
  setDefiDappLeaderboardLastUpdated,
  setDefiDappLeaderboardProtocols,
  setUserLeaderboard,
} from '$stores/leaderboard';

import type {
  BridgeData,
  BridgeLeaderboardPage,
  DappLeaderboardPage,
  DappLeaderboardPageApiResponse,
  DefiDappLeaderboardRow,
  PaginationInfo,
  ProtocolApiResponse,
  UnifiedLeaderboardRow,
  UserLeaderboardPage,
  UserLeaderboardPageApiResponse,
} from './types';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('Leaderboard');

interface DetailsMapping {
  [slug: string]: {
    name?: string;
    icon?: string;
    handle?: string;
  };
}

export class Leaderboard {
  // dapp leaderboard
  static async getDappLeaderboard(args: PaginationInfo): Promise<PaginationInfo> {
    log('baseApiUrl', baseApiUrl);

    try {
      log('args', args);
      const response = await axios.get<DappLeaderboardPageApiResponse>(`${baseApiUrl}/v2/leaderboard/dapp`, {
        ...globalAxiosConfig,
        params: args,
      });

      log('response', response);
      const leaderboardPageApiResponse: DappLeaderboardPageApiResponse = response.data;

      const leaderboardPage: DappLeaderboardPage = { items: [], lastUpdated: 0 };

      const detailMapping: DetailsMapping = dappDetailsMapping;

      const items = await Promise.all(
        leaderboardPageApiResponse.data.items.map(async (item) => {
          let entry: UnifiedLeaderboardRow;
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

            entry = {
              address: item.address,
              data: protocolDetails.protocols,
              totalScore: item.score,
            };
          }
          if (detailMapping[item.slug]?.icon) {
            entry.icon = detailMapping[item.slug].icon;
          }
          if (detailMapping[item.slug]?.handle) {
            entry.handle = detailMapping[item.slug].handle;
          }
          return entry;
        }),
      );

      leaderboardPage.items = items;

      setDappLeaderboard(leaderboardPage);
      setDappLeaderboardLastUpdated(response.data.lastUpdated);

      log('Leaderboard page: ', leaderboardPage);
      const { page, size, total, total_pages, max_page } = leaderboardPageApiResponse.data;

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
      errorToast({
        title: 'Error fetching leaderboard',
        message: `${error}`,
      });
      return args;
    }
  }

  static async getUserLeaderboard() {
    try {
      const response = await axios.get<UserLeaderboardPageApiResponse>(
        `${baseApiUrl}/leaderboard/user`,
        globalAxiosConfig,
      );
      const leaderboardPage: UserLeaderboardPage = response.data as UserLeaderboardPage;
      console.log('🚀 | Leaderboard | getUserLeaderboard | leaderboardPage:', leaderboardPage);
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

  static async getDefiDappLeaderboard() {
    try {
      const response = await axios.get(`${baseApiUrl}/leaderboard/tvl`, globalAxiosConfig);

      const result: DefiDappLeaderboardRow[] = response.data.protocols as DefiDappLeaderboardRow[];
      const protocols = this.appendDefiDappAdditionalData(result);
      setDefiDappLeaderboardProtocols(protocols);
      setDefiDappLeaderboardLastUpdated(response.data.lastUpdated);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      errorToast({
        title: 'Error fetching leaderboard',
        message: `${error}`,
      });
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

  // Modifies the rows to add the taikoTvl property and sort in descending taikoTvl
  static appendDefiDappAdditionalData(rows: DefiDappLeaderboardRow[]): DefiDappLeaderboardRow[] {
    // Save chainTvls.Taiko as taikoTvl for each row
    rows.map((row) => {
      row.taikoTvl = row.chainTvls.Taiko;
    });

    // Sort descending taikoTvl
    rows.sort((a, b) => (b.taikoTvl || 0) - (a.taikoTvl || 0));

    return rows;
  }
}
