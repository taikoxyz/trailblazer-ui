import axios from 'axios';
import { isAddress } from 'ethereum-address';

import { errorToast } from '$components/NotificationToast';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import dappDetailsMapping from '$libs/leaderboard/json/dappDetailsMapping.json';
import type { PaginationInfo, ProtocolApiResponse, UnifiedLeaderboardRow } from '$libs/leaderboard/types';
import type { DappLeaderboardItem, DappLeaderboardPage, DappLeaderboardPageApiResponse } from '$libs/leaderboard/types';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setDappLeaderboard, setDappLeaderboardLastUpdated } from '$stores/leaderboard';

interface DetailsMapping {
  [slug: string]: {
    name?: string;
    icon?: string;
    handle?: string;
  };
}
const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('DappsLeaderboard S2');
export class DappsLeaderboardS2 {
  static async getDappLeaderboard(
    args: PaginationInfo<DappLeaderboardItem>,
  ): Promise<PaginationInfo<DappLeaderboardItem>> {
    log('baseApiUrl', baseApiUrl);

    try {
      log('args', args);

      // Temporary fetch 200 items at once instead of just 10
      args.size = 200; // TODO: remove after filter is handled by BE
      const response = await axios.get<DappLeaderboardPageApiResponse>(`${baseApiUrl}/s2/v2/leaderboard/dapp`, {
        ...globalAxiosConfig,
        params: args,
      });

      log('response', response);
      const leaderboardPageApiResponse: DappLeaderboardPageApiResponse = response.data;

      const leaderboardPage: DappLeaderboardPage = { items: [], lastUpdated: 0 };

      const detailMapping: DetailsMapping = dappDetailsMapping;

      if (!leaderboardPageApiResponse.data.items) {
        throw new Error('No Items found');
      }

      const items = await Promise.all(
        leaderboardPageApiResponse.data.items
          // TODO: remove filter after its handled by BE
          .filter((item) => !isAddress(item.slug)) // filter out non whitelisted
          .map(async (item) => {
            const details = await axios.get<ProtocolApiResponse>(`${baseApiUrl}/protocol/details`, {
              ...globalAxiosConfig,
              params: { slug: item.slug },
            });
            const protocolDetails = details.data;

            const entry: UnifiedLeaderboardRow = {
              address: item.address,
              data: protocolDetails.protocols,
              totalScore: item.score,
            };

            if (detailMapping[item.slug]?.icon) {
              entry.icon = detailMapping[item.slug].icon;
            }
            if (detailMapping[item.slug]?.handle) {
              entry.handle = detailMapping[item.slug].handle;
            }

            return entry;
          }),
      );
      leaderboardPage.items = items;

      setDappLeaderboard(leaderboardPage);
      setDappLeaderboardLastUpdated(response.data.lastUpdated);

      log('Leaderboard page: ', leaderboardPage);
      const { page, size, total, total_pages, max_page } = leaderboardPageApiResponse.data;

      return {
        first: 0,
        last: max_page,
        total,
        size,
        total_pages,
        page,
      } satisfies PaginationInfo<DappLeaderboardItem>;
    } catch (error) {
      errorToast({
        title: 'Error fetching leaderboard',
        message: `${error}`,
      });
      console.error('Error fetching leaderboard:', error);

      return args;
    }
  }
}
