import axios from 'axios';
import { getAddress } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import type { PaginationInfo } from '$libs/leaderboard/types';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setUserLeaderboard } from '$stores/leaderboard';

import type {
  UserLeaderboardItem,
  UserLeaderboardPage,
  UserLeaderboardPageApiResponse,
  UserLeaderboardRow,
} from './types';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('UserLeaderboard S2');

export class UserLeaderboard {
  static async getUserLeaderboard(
    args: PaginationInfo<UserLeaderboardItem>,
  ): Promise<PaginationInfo<UserLeaderboardItem>> {
    log('getting s2 user leaderboard', args, baseApiUrl);

    try {
      const response = await axios.get<UserLeaderboardPageApiResponse>(`${baseApiUrl}/s2/v2/leaderboard/user`, {
        ...globalAxiosConfig,
        params: args,
      });

      log('response', response);

      const leaderboardPage: UserLeaderboardPage = { items: [], totalUsers: 0, pageNumber: 0, lastUpdated: 0 };
      leaderboardPage.lastUpdated = response.data.lastUpdated;
      leaderboardPage.totalUsers = response.data.data.total || 0;
      leaderboardPage.pageNumber = response.data.data.page;
      leaderboardPage.items = response.data.data.items as UserLeaderboardRow[];

      log('user leaderboard page: ', leaderboardPage);

      // fetch the pfps for the current page
      const addresses = leaderboardPage.items.map((item) => getAddress(item.address));
      const icons = await profileService.getProfilePictures(addresses);

      log('icons', icons);

      for (const item of leaderboardPage.items) {
        item.icon = icons[getAddress(item.address)];
      }

      setUserLeaderboard(leaderboardPage);

      const { page, size, total, total_pages, max_page } = response.data.data;

      return {
        items: [],
        first: 0,
        last: max_page,
        total,
        size,
        total_pages,
        page,
      } satisfies PaginationInfo<UserLeaderboardItem>;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return args;
    }
  }
}
