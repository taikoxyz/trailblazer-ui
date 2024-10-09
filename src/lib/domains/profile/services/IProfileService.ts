import type { Address } from 'viem';

import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/dapps/types';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';

export interface IProfileService {
  getUserInfoForLeaderboard(
    entries: UserLeaderboardItem[],
    total: number,
    season: number,
  ): Promise<UserInfoForLeaderboard[]>;

  getProfilePicture(address: Address): Promise<string | null>;
}
