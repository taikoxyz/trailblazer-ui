import axios from 'axios';
import { zeroAddress } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setBridgeLeaderboard, setLeaderboard, setUserLeaderboard } from '$stores/leaderboard';

import type { BridgeData, BridgeLeaderboardPage, LeaderboardPage } from './types';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('Leaderboard');

export class Leaderboard {
  // dapp leaderboard
  static async getLeaderboard() {
    const response = await axios.get(`${baseApiUrl}/leaderboard/dapp`);
    const leaderboardPage: LeaderboardPage = response.data as LeaderboardPage;
    setLeaderboard(leaderboardPage);
    log('Leaderboard page: ', leaderboardPage);
  }

  static async getUserLeaderboard() {
    const response = await axios.get(`${baseApiUrl}/leaderboard/user`);
    const leaderboardPage: LeaderboardPage = response.data as LeaderboardPage;
    setUserLeaderboard(leaderboardPage);
  }

  static async getBridgeLeaderboard() {
    const response = await axios.get(`${baseApiUrl}/leaderboard/bridge`);
    const result: BridgeLeaderboardPage = response.data as BridgeLeaderboardPage;
    console.log('🚀 | Leaderboard | getBridgeLeaderboard | result:', result);

    setBridgeLeaderboard(this.appendBridgeAdditionalData(result.bridgingEntries));
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
