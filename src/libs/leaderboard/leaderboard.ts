import axios from 'axios';

import { errorToast } from '$components/NotificationToast';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import bridgeAdditionalData from '$libs/leaderboard/json/bridgeAdditionalData.json';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import {
  setBridgeLeaderboard,
  setDefiDappLeaderboardLastUpdated,
  setDefiDappLeaderboardProtocols,
  setLeaderboard,
  setUserLeaderboard,
} from '$stores/leaderboard';

import type {
  BridgeData,
  BridgeLeaderboardPage,
  DefiDappLeaderboardRow,
  LeaderboardPage,
  PaginationInfo,
} from './types';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('Leaderboard');

export class Leaderboard {
  // dapp leaderboard
  static async getDappLeaderboard(args: PaginationInfo): Promise<PaginationInfo> {
    try {
      args.page = args.page - 1;
      const response = await axios.get<LeaderboardPage>(`${baseApiUrl}/leaderboard/dapp`, {
        ...globalAxiosConfig,
        params: args,
      });

      const leaderboardPage: LeaderboardPage = response.data;
      setLeaderboard(leaderboardPage);
      log('Leaderboard page: ', leaderboardPage);
      const { page, size, total, total_pages, max_page } = leaderboardPage;

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
    }
    return args;
  }

  static async getUserLeaderboard() {
    try {
      const response = await axios.get(`${baseApiUrl}/leaderboard/user`, globalAxiosConfig);
      const leaderboardPage: LeaderboardPage = response.data as LeaderboardPage;
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
      console.log('🚀 | Leaderboard | getDefiDappLeaderboard | result:', response);
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
