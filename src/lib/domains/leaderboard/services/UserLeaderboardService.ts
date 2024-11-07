import type { Address } from 'viem';

import { UserLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/UserLeaderboardAdapter';
import { mapUserLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { UserLeaderboardRepository } from '$lib/domains/leaderboard/repository/UserLeaderboardRepository';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type {
  UserLeaderboardItem,
  UserLeaderboardPage,
  UserLeaderboardRow,
} from '$lib/domains/leaderboard/types/user/types';
import type { IProfileService } from '$lib/domains/profile/services/IProfileService';
import { ProfileService } from '$lib/domains/profile/services/ProfileService';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('UserLeaderboardService');

export class UserLeaderboardService {
  // Adapters
  private leaderboardAdapter: UserLeaderboardAdapter;

  // Services
  private profileService: IProfileService;

  // Repositories
  private leaderboardRepository: UserLeaderboardRepository;

  constructor(
    leaderboardAdapter?: UserLeaderboardAdapter,
    leaderboardRepository?: UserLeaderboardRepository,
    profileService?: IProfileService,
  ) {
    this.leaderboardAdapter = leaderboardAdapter || new UserLeaderboardAdapter();
    this.leaderboardRepository = leaderboardRepository || new UserLeaderboardRepository();
    this.profileService = profileService || new ProfileService();
  }

  /**
   * Fetches user leaderboard data for a given season with pagination.
   *
   * @param args - Pagination and filtering parameters.
   * @param season - The current season number.
   * @returns A promise that resolves to a UserLeaderboardPage.
   */
  async getUserLeaderboardData(
    args: PaginationInfo<UserLeaderboardItem>,
    season: number,
  ): Promise<UserLeaderboardPage> {
    try {
      log('Fetching leaderboard data', { args, season });
      const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardData(args, season);
      log('Fetched leaderboard data', { leaderboardData });

      if (!leaderboardData.items?.length) {
        log('No leaderboard items found', { args, season });
        return {
          items: [],
          lastUpdated: Date.now(),
          pagination: { ...args, total: leaderboardData.total, total_pages: leaderboardData.total_pages },
        };
      }

      // Fetch user details in bulk
      const userDetailsList = await this.profileService.getUserInfoForLeaderboard(
        leaderboardData.items,
        leaderboardData.total,
        season,
      );
      log('Fetched user details:', userDetailsList);

      const userDetailsMap = new Map<Address, UserInfoForLeaderboard>();
      userDetailsList.forEach((userInfo) => {
        userDetailsMap.set(userInfo.address, userInfo);
      });

      const itemsWithDetails: UnifiedLeaderboardRow[] = [];

      for (let index = 0; index < leaderboardData.items.length; index++) {
        const item = leaderboardData.items[index];
        const userDetails = userDetailsMap.get(item.address);

        try {
          if (!userDetails) {
            log(`No user details found for address ${item.address}, using default values.`);
            const entry: UserLeaderboardRow = {
              address: item.address,
              score: item.score,
              icon: '',
              level: '',
              rank: index + 1 + args.page * args.size,
              title: '',
            };
            const mapped = mapUserLeaderboardRow(entry);
            itemsWithDetails.push(mapped);
          } else {
            log(`Details for ${item.address}`, userDetails);
            const entry: UserLeaderboardRow = {
              address: item.address,
              score: item.score,
              icon: userDetails.profilePicture,
              level: userDetails.level,
              rank: index + 1 + args.page * args.size,
              title: userDetails.title,
            };
            log(`Entry`, entry);
            const mapped = mapUserLeaderboardRow(entry);
            log(`Mapped`, mapped);
            itemsWithDetails.push(mapped);
          }
        } catch (mapError) {
          log(`Error mapping leaderboard row for address ${item.address}:`, mapError);
        }
      }

      const userLeaderboardPage: UserLeaderboardPage = {
        items: itemsWithDetails,
        lastUpdated: Date.now(),
        pagination: {
          ...args,
          total: leaderboardData.total,
        },
      };

      if (itemsWithDetails.length > 0) {
        await this.leaderboardRepository.update(userLeaderboardPage);
        log('Updated leaderboard repository', { userLeaderboardPage });
      }

      return userLeaderboardPage;
    } catch (error) {
      log('Error fetching user leaderboard data', { error, args, season });
      return {
        items: [],
        lastUpdated: Date.now(),
        pagination: { ...args },
      };
    }
  }

  /**
   * Retrieves the leaderboard data for a given user address.
   *
   * @param {number} season
   * @param {Address} address
   * @return {*}  {(Promise<UnifiedLeaderboardRow | null>)}
   * @memberof UserLeaderboardService
   */
  async getUserLeaderboardDataForAddress(season: number, address: Address): Promise<UnifiedLeaderboardRow | null> {
    log('Fetching leaderboard data for address', { season, address });
    try {
      const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardPositionForAddress(season, address);
      log('Fetched leaderboard data', { leaderboardData });

      if (!leaderboardData.items?.length) {
        log('No leaderboard items found', { season, address });
        return null;
      }

      const profilePicture = await this.profileService.getProfilePicture(address);
      const userLeaderboardItem = leaderboardData.items[0];

      const percentile = this.profileService.calculatePercentile(userLeaderboardItem.rank, leaderboardData.total);
      const { level, title } = this.profileService.getLevel(percentile);

      const userLeaderboardRow: UserLeaderboardRow = {
        address: userLeaderboardItem.address,
        score: userLeaderboardItem.totalScore ? userLeaderboardItem.totalScore : 0,
        rank: userLeaderboardItem.rank,
        level,
        title,
      };
      const entry: UserLeaderboardRow = {
        ...userLeaderboardRow,
        icon: profilePicture || '',
      };
      const mapped = mapUserLeaderboardRow(entry);
      log('Mapped user leaderboard row', mapped);

      return mapped;
    } catch (error) {
      log('Error fetching user leaderboard data', { error, season, address });
      return null;
    }
  }

  /**
   * Retrieves the profile icon for a given user address
   *
   * @param address - The user's address.
   * @returns A promise that resolves to the profile icon URL or null if unavailable.
   */
  private async getProfileIcon(address: Address): Promise<string | null> {
    try {
      const icon = await this.profileService.getProfilePicture(address);
      return icon;
    } catch (error) {
      log('Failed to fetch profile picture', { address, error });

      return null;
    }
  }
}
