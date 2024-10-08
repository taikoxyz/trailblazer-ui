import type { Address } from 'viem';

import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/dapps/types';

import type { UserInfoForLeaderboard } from '../types/UserInfoForLeaderboard';

export interface IProfileService {
  getUserInfoForLeaderboard(
    entries: UserLeaderboardItem[],
    total: number,
    season: number,
  ): Promise<UserInfoForLeaderboard[]>;

  getProfilePicture(address: Address): Promise<string | null>;
}
