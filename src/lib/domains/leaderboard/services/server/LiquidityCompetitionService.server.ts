import type { Address } from 'viem';

import { LiquidityCompetitionAdapter } from '$lib/domains/leaderboard/adapter/server/LiquidityCompetitionAdapter.server';
import { mapLiquidityLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { LiquidityCompetitionRepository } from '$lib/domains/leaderboard/repository/LiquidityCompetitionRepository';
import type { LiquidityCompetitionPage, LiquidityCompetitionRow } from '$lib/domains/leaderboard/types/liquidity/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { IProfileService } from '$lib/domains/profile/services/IProfileService';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import { getLogger } from '$shared/utils/logger';

import type { LiquidityCompetitionArgs, LiquidityCompetitionUserArgs } from '../../types/competition/types';
import { getSeasonForLiquidityEdition } from '../../utils/mapEditionToSeason';

const log = getLogger('LiquidityCompetitionService');

export class LiquidityCompetitionService {
  // Adapters
  private leaderboardAdapter: LiquidityCompetitionAdapter;

  // Services
  private profileService: IProfileService;

  // Repositories
  private readonly liquidityCompetitionRepository: LiquidityCompetitionRepository;

  constructor(
    leaderboardAdapter: LiquidityCompetitionAdapter,
    liquidityCompetitionRepository: LiquidityCompetitionRepository,
    profileService: IProfileService,
  ) {
    this.leaderboardAdapter = leaderboardAdapter;
    this.liquidityCompetitionRepository = liquidityCompetitionRepository;
    this.profileService = profileService;
  }

  /**
   * Fetches liquidity competition leaderboard data for a given season with pagination.
   *
   * @param args - Pagination and filtering parameters.
   * @param season - The current season number.
   * @returns A promise that resolves to a LiquidityCompetitionPage.
   */
  async getLiquidityCompetitionLeaderboard(args: LiquidityCompetitionArgs): Promise<LiquidityCompetitionPage> {
    try {
      const { competitionType, edition, pagination } = args;
      log('Fetching leaderboard data', { args, edition, competitionType });

      const season = getSeasonForLiquidityEdition(edition);
      const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardData(args);
      log('Fetched leaderboard data', leaderboardData);

      if (!leaderboardData.items?.length) {
        log('No leaderboard items found', { args, season });
        return {
          items: [],
          lastUpdated: Date.now(),
          pagination: { ...pagination, total: leaderboardData.total, total_pages: leaderboardData.total_pages },
        };
      }

      // Fetch user details in bulk
      const userDetailsList = await this.profileService.getUserInfoForLeaderboard(
        leaderboardData.items,
        leaderboardData.total,
        season,
      );

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
            const entry: LiquidityCompetitionRow = {
              address: item.address,
              score: item.score,
              icon: '',
              rank: index + 1 + pagination.page * pagination.size,
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
        lastUpdated: Date.now(),
        pagination: {
          ...pagination,
          total: leaderboardData.total,
          total_pages: leaderboardData.total_pages,
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
   * @param {args} season
   * @return {*}  {(Promise<UnifiedLeaderboardRow | null>)}
   * @memberof LiquidityCompetitionService
   */
  async getLiquidityCompetitionDataForAddress(
    args: LiquidityCompetitionUserArgs,
  ): Promise<UnifiedLeaderboardRow | null> {
    try {
      const { season, address } = args;
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
