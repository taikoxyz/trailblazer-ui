import axios from 'axios';
import { isAddress } from 'viem';

import { errorToast } from '$components/NotificationToast';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/config/axiosConfig';
import gamingDetailsMapping from '$libs/leaderboard/json/gamingDetailsMapping.json';
import type {
  DappLeaderboardItem,
  DappLeaderboardPage,
  DappLeaderboardPageApiResponse,
  DetailsMapping,
  PaginationInfo,
  ProtocolApiResponse,
  UnifiedLeaderboardRow,
} from '$libs/leaderboard/types';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { setGamingLeaderboard, setGamingLeaderboardLastUpdated } from '$stores/leaderboards/gamingLeaderboard';

const log = getLogger('GamingLeaderboard');

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export class GamingLeaderboard {
  static async getGamingLeaderboard(
    args: PaginationInfo<DappLeaderboardItem>,
  ): Promise<PaginationInfo<DappLeaderboardItem>> {
    log('baseApiUrl', baseApiUrl);

    try {
      log('args', args);
      const response = await axios.get<DappLeaderboardPageApiResponse>(`${baseApiUrl}/s2/v2/leaderboard/gaming`, {
        ...globalAxiosConfig,
        params: args,
      });

      log('response', response);
      const leaderboardPageApiResponse: DappLeaderboardPageApiResponse = response.data;

      const leaderboardPage: DappLeaderboardPage = { items: [], lastUpdated: 0 };

      const detailMapping: DetailsMapping = gamingDetailsMapping;
      log('detailMapping', detailMapping);

      if (!leaderboardPageApiResponse.data.items) {
        throw new Error('No Items found');
      }

      const items = await Promise.all(
        leaderboardPageApiResponse.data.items.map(async (item) => {
          let entry: UnifiedLeaderboardRow;
          if (isAddress(item.slug)) {
            entry = {
              address: item.address,
              data: [],
              totalScore: item.score,
            };
          } else {
            const details = await axios.get<ProtocolApiResponse>(`${baseApiUrl}/protocol/gaming`, {
              ...globalAxiosConfig,
              params: { slug: item.slug },
            });
            const protocolDetails = details.data;

            entry = {
              address: item.address,
              data: protocolDetails.protocols,
              totalScore: item.score,
            };
          }
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

      setGamingLeaderboard(leaderboardPage);
      setGamingLeaderboardLastUpdated(response.data.lastUpdated);

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
      return args;
    }
  }
}
