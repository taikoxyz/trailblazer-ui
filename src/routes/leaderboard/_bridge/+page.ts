import { browser } from '$app/environment';
import { Leaderboard } from '$libs/leaderboard';

export const load = async () => {
  if (browser) {
    await Leaderboard.getBridgeLeaderboard();
  }
};
