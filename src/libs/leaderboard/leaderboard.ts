import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { setLeaderboard } from '$stores/leaderboard';

import type { LeaderboardPage } from './types';

export class Leaderboard {
  static async getLeaderboard() {
    const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/leaderboard`);
    const leaderboardPage: LeaderboardPage = (await response.json()) as LeaderboardPage;
    setLeaderboard(leaderboardPage)
  }
}
