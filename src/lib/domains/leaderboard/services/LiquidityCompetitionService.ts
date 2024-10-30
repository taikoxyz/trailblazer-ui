import type { Address } from 'viem';

import type { IProfileService } from '$lib/domains/profile/services/IProfileService';
import { ProfileService } from '$lib/domains/profile/services/ProfileService';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

import { LiquidityCompetitionAdapter } from '../adapter/LiquidityCompetitionAdapter';
import { mapLiquidityLeaderboardRow } from '../mapper/mapper';
import { LiquidityCompetitionRepository } from '../repository/LiquidityCompetitionRepository';
import type { LiquidityCompetitionPage, LiquidityCompetitionRow } from '../types/liquidity/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';
import type { UserLeaderboardItem } from '../types/user/types';

const log = getLogger('LiquidityCompetitionService');

export class LiquidityCompetitionService {
  // Adapters
  private leaderboardAdapter: LiquidityCompetitionAdapter;

  // Services
  private profileService: IProfileService;

  // Repositories
  private readonly liquidityCompetitionRepository: LiquidityCompetitionRepository;

  constructor(
    leaderboardAdapter?: LiquidityCompetitionAdapter,
    liquidityCompetitionRepository?: LiquidityCompetitionRepository,
    profileService?: IProfileService,
  ) {
    this.leaderboardAdapter = leaderboardAdapter || new LiquidityCompetitionAdapter();
    this.liquidityCompetitionRepository = liquidityCompetitionRepository || new LiquidityCompetitionRepository();
    this.profileService = profileService || new ProfileService();
  }

  /**
   * Fetches liquidity competition leaderboard data for a given season with pagination.
   *
   * @param args - Pagination and filtering parameters.
   * @param season - The current season number.
   * @returns A promise that resolves to a LiquidityCompetitionPage.
   */
  async getLiquidityCompetitionLeaderboard(
    args: PaginationInfo<UserLeaderboardItem>,
    season: number,
  ): Promise<LiquidityCompetitionPage> {
    try {
      log('Fetching leaderboard data', { args, season });
      const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardData(args, season);
      log('Fetched leaderboard data', leaderboardData);

      if (!leaderboardData.data.items?.length) {
        log('No leaderboard items found', { args, season });
        return {
          items: [],
          lastUpdated: Date.now(),
          pagination: { ...args, total: leaderboardData.data.total, total_pages: leaderboardData.data.total_pages },
        };
      }

      // Fetch user details in bulk
      const userDetailsList = await this.profileService.getUserInfoForLeaderboard(
        leaderboardData.data.items,
        leaderboardData.data.total,
        season,
      );

      const userDetailsMap = new Map<Address, UserInfoForLeaderboard>();
      userDetailsList.forEach((userInfo) => {
        userDetailsMap.set(userInfo.address, userInfo);
      });

      const itemsWithDetails: UnifiedLeaderboardRow[] = [];
      for (let index = 0; index < leaderboardData.data.items.length; index++) {
        const item = leaderboardData.data.items[index];
        const userDetails = userDetailsMap.get(item.address);

        try {
          if (!userDetails) {
            log(`No user details found for address ${item.address}, using default values.`);
            const entry: LiquidityCompetitionRow = {
              address: item.address,
              score: item.score,
              icon: '',
              rank: index + 1 + args.page * args.size,
            };
            const mapped = mapLiquidityLeaderboardRow(entry);
            itemsWithDetails.push(mapped);
          } else {
            log(`Details for ${item.address}`, userDetails);
            const entry: LiquidityCompetitionRow = {
              address: item.address,
              score: item.score,
              icon: userDetails.profilePicture,
              rank: item.rank,
            };
            log(`Entry`, entry);
            const mapped = mapLiquidityLeaderboardRow(entry);
            log(`Mapped`, mapped);
            itemsWithDetails.push(mapped);
          }
        } catch (mapError) {
          log(`Error mapping leaderboard row for address ${item.address}:`, mapError);
        }
      }

      const liquidityCompetionPage: LiquidityCompetitionPage = {
        items: itemsWithDetails,
        lastUpdated: leaderboardData.lastUpdated,
        pagination: {
          ...args,
          total: leaderboardData.data.total,
        },
      };
      log('Liquidity competition leaderboard page', liquidityCompetionPage, liquidityCompetionPage.lastUpdated);

      if (itemsWithDetails.length > 0) {
        await this.liquidityCompetitionRepository.update(liquidityCompetionPage);
        log('Updated leaderboard repository', liquidityCompetionPage);
      }

      return liquidityCompetionPage;
    } catch (error) {
      log('Failed to fetch leaderboard data', error);
      throw error;
    }
  }

  /**
   * Fetches a single liquidity competition leaderboard entry for a given season with pagination.
   *
   * @param {number} season
   * @param {Address} address of the user
   * @return {*}  {(Promise<UnifiedLeaderboardRow | null>)}
   * @memberof LiquidityCompetitionService
   */
  async getLiquidityCompetitionDataForAddress(season: number, address: Address): Promise<UnifiedLeaderboardRow | null> {
    try {
      log('Fetching user leaderboard data', season, address);
      const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardPositionForAddress(season, address);

      log('Fetched user leaderboard data', leaderboardData);

      if (!leaderboardData.items?.length) {
        log('No leaderboard items found', { season, address });
        return null;
      }

      const profilePicture = await this.profileService.getProfilePicture(address);

      const userLeaderboardItem = leaderboardData.items[0];
      const userLeaderboardRow: UserLeaderboardItem = {
        address: userLeaderboardItem.address,
        score: userLeaderboardItem.score,
        rank: userLeaderboardItem.rank,
      };

      const entry: LiquidityCompetitionRow = {
        ...userLeaderboardRow,
        icon: profilePicture || '',
      };
      const mapped = mapLiquidityLeaderboardRow(entry);
      log('Mapped user leaderboard row', mapped);

      return mapped;
    } catch (error) {
      log('Failed to fetch user leaderboard data', error);
      throw error;
    }
  }
}
