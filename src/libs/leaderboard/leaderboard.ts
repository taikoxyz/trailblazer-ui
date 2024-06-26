import axios from 'axios';
import { zeroAddress } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setBridgeLeaderboard, setLeaderboard, setUserLeaderboard } from '$stores/leaderboard';

import type { BridgeData, BridgeLeaderboardPage, LeaderboardPage, PaginationInfo } from './types';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('Leaderboard');

export class Leaderboard {
  // dapp leaderboard
  static async getDappLeaderboard(args: PaginationInfo): Promise<PaginationInfo> {
    try {
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

  static appendBridgeAdditionalData(page: BridgeData[]) {
    const data: { [key: string]: { name: string; twitter: string; icon: string } } = {
      Orbiter: {
        name: 'Orbiter',
        twitter: 'Orbiter_Finance',
        icon: 'orbiter.png',
      },
      Owlto: {
        name: 'Owlto',
        twitter: 'Owlto_Finance',
        icon: 'owlto.png',
      },
      Rhino: {
        name: 'Rhino.Fi',
        twitter: 'rhinofi',
        icon: 'rhinofi.png',
      },
      Retrobridge: {
        name: 'Retro Bridge',
        twitter: 'Retro_bridge',
        icon: 'retro.png',
      },
      XY: {
        name: 'XY Finance',
        twitter: 'Xyfinance',
        icon: 'xy.svg',
      },
      Router: {
        name: 'Router Protocol',
        twitter: 'Routerprotocol',
        icon: 'router.svg',
      },
      Pheasant: {
        name: 'Pheasant Network',
        twitter: 'pheasantnetwork',
        icon: 'pheasant.png',
      },
      Comet: {
        name: 'Comet',
        twitter: 'Comet_Protocol',
        icon: 'comet.svg',
      },
      Symbiosis: {
        name: 'Symbiosis Finance',
        twitter: 'Symbiosis_fi',
        icon: 'symbiosis.svg',
      },
      BunnyFi: {
        name: 'BunnyFi',
        twitter: 'BunnyfiLabs',
        icon: 'bunnyfi.svg',
      },
      Layerswap: {
        name: 'Layerswap',
        twitter: 'layerswap',
        icon: 'layerswap.jpeg',
      },
      Minibridge: {
        name: 'Minibridge',
        twitter: 'Chaineye_tools',
        icon: 'minibridge.jpeg',
      },
      Stargate: {
        name: 'Stargate',
        twitter: 'StargateFinance',
        icon: 'stargate.jpeg',
      },
    };

    // loop through the items in page and add data to page
    page.map((item) => {
      const additionalData = data[item.name];
      if (additionalData) {
        item.name = additionalData.name;
        item.twitter = additionalData.twitter;
        item.icon = additionalData.icon;
      }
    });

    // append meson
    page.push({
      name: 'Meson',
      scores: [{ token: zeroAddress, score: 0 }],
      volume: 0,
      twitter: 'mesonfi',
      icon: 'mesonfi.jpg',
    });

    return page;
  }
}
