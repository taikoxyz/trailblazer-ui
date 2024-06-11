import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { setLeaderboard, setUserLeaderboard } from '$stores/leaderboard';

import type { LeaderboardPage } from './types';

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
}
