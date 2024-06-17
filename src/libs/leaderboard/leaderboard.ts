import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { setBridgeLeaderboard, setLeaderboard, setUserLeaderboard } from '$stores/leaderboard';

import type { BridgeData, BridgeDataFlat, BridgeLeaderboardPage, LeaderboardPage } from './types';

export class Leaderboard {
  static async getLeaderboard() {
    const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/leaderboard`);
    const leaderboardPage: LeaderboardPage = (await response.json()) as LeaderboardPage;
    setLeaderboard(leaderboardPage);
  }

  static async getUserLeaderboard() {
    const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user/leaderboard`);
    const leaderboardPage: LeaderboardPage = (await response.json()) as LeaderboardPage;
    setUserLeaderboard(leaderboardPage);
  }

  static async getBridgeLeaderboard() {
    const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/bridge`);
    const leaderboardPage: BridgeLeaderboardPage = (await response.json()) as BridgeLeaderboardPage;
    leaderboardPage.items.forEach((item: BridgeData) => {
      // If WETH

      item.bridged?.forEach((bridged: BridgeDataFlat) => {
        if (bridged.token === '0xA51894664A773981C6C112C43ce576f315d5b1B6') {
          bridged.token = '0x0000000000000000000000000000000000000000';
        }
      });
    });

    const tokenPrices: { [key: string]: number } = {
      '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b': 1.0, // Example price
      '0x0000000000000000000000000000000000000000': 3500.0, // Example price
    };

    // Group by address and then by token
    const groupedData = leaderboardPage.items.reduce((acc: { [key: string]: BridgeData }, curr: BridgeDataFlat) => {
      if (!acc[curr.address]) {
        acc[curr.address] = { address: curr.address, bridged: [], value: 0 };
      }
      acc[curr.address].bridged.push({ token: curr.token, score: curr.score });
      acc[curr.address].value = (acc[curr.address].value || 0) + curr.score * (tokenPrices[curr.token] || 0);
      return acc;
    }, {});
    const result: BridgeData[] = Object.values(groupedData).sort(
      (a: BridgeData, b: BridgeData) => b.value - a.value,
    ) as BridgeData[];

    leaderboardPage.items = this.appendBridgeAdditionalData(result);

    setBridgeLeaderboard(leaderboardPage);
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
    };

    // loop through the items in page and add data to page
    page.map((item) => {
      const additionalData = data[item.address];
      if (additionalData) {
        item.name = additionalData.name;
        item.twitter = additionalData.twitter;
        item.icon = additionalData.icon;
      }
    });

    // append meson
    page.push({
      address: 'Meson',
      bridged: [{ token: '', score: 0 }],
      value: 0,
      name: 'mesonfi',
      twitter: 'mesonfi',
      icon: 'mesonfi.jpg',
    });

    return page;
  }
}
