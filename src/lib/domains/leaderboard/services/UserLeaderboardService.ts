import type { Address } from 'viem';

import { ProfileService } from '$lib/domains/profile/services/ProfileService';
import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getLogger } from '$libs/util/logger';

import { UserLeaderboardAdapter } from '../adapter/UserLeaderboardAdapter';
import { mapUserLeaderboardRow } from '../mapper/mapper';
import { UserLeaderboardRepository } from '../repository/UserLeaderboardRepository';
import type { UserLeaderboardItem, UserLeaderboardPage, UserLeaderboardRow } from '../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';

const log = getLogger('UserLeaderboardService');

export class UserLeaderboardService {
  // Adapters
  private leaderboardAdapter: UserLeaderboardAdapter;

  // Services
  private profileService: ProfileService;

  // Repositories
  private leaderboardRepository: UserLeaderboardRepository;

  constructor(
    leaderboardAdapter: UserLeaderboardAdapter = new UserLeaderboardAdapter(),
    leaderboardRepository: UserLeaderboardRepository = new UserLeaderboardRepository(),
    profileService: ProfileService = new ProfileService(),
  ) {
    this.leaderboardAdapter = leaderboardAdapter;
    this.leaderboardRepository = leaderboardRepository;
    this.profileService = profileService;
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
      const userDetailsList = await profileService.getUserInfoForLeaderboard(
        leaderboardData.items,
        leaderboardData.total,
        season,
      );
      log('Fetched user details:', userDetailsList);

      // Map addresses to user details for easy lookup
      const userDetailsMap = new Map<Address, UserInfoForLeaderboard>();
      userDetailsList.forEach((userInfo) => {
        userDetailsMap.set(userInfo.address, userInfo);
      });

      // Map leaderboard items to UnifiedLeaderboardRow[]
      const itemsWithDetails: UnifiedLeaderboardRow[] = leaderboardData.items.map((item, index) => {
        const userDetails = userDetailsMap.get(item.address);

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
          return mapUserLeaderboardRow(entry);
        }

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
        return mapped;
      });

      const userLeaderboardPage: UserLeaderboardPage = {
        items: itemsWithDetails,
        lastUpdated: Date.now(),
        pagination: {
          ...args,
          total: leaderboardData.total,
        },
      };

      await this.leaderboardRepository.update(userLeaderboardPage);
      log('Updated leaderboard repository', { userLeaderboardPage });

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
