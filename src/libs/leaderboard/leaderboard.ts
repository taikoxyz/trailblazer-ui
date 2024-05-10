import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';

import type { LeaderboardPage } from './types';

export class Leaderboard {
  static async getLeaderboard(start: number, end: number) {
    const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/leaderboard?since=${start}&until=${end}`);
    const leaderboardPage: LeaderboardPage = (await response.json()) as LeaderboardPage;
    return leaderboardPage;
  }
}
