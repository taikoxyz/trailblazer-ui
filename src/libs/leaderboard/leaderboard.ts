import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { setBridgeLeaderboard, setLeaderboard, setUserLeaderboard } from '$stores/leaderboard';

import type { BridgeLeaderboardPage, LeaderboardPage } from './types';

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
    setBridgeLeaderboard(leaderboardPage);
  }
}
