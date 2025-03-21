import { get } from 'svelte/store';
import { type Address, zeroAddress } from 'viem';

import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
import { type FactionNames, getFactionName } from '$lib/domains/nfts/types/badges/types';
import type { RecruitmentDetails } from '$lib/domains/profile/types/RecruitmentDetails';
import { getMovementName, Movements } from '$lib/domains/profile/types/types';
import { activeRecruitmentStore, currentCycleStore, currentRecruitmentStore } from '$shared/stores/recruitment';
import { type ActiveRecruitment, type IBadgeRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
import type { TBBadge } from '$shared/types/NFT';
import { getRecruitmentStatus } from '$shared/utils/badges/getRecruitmentStatus';
import { getCurrentSeasonEnd } from '$shared/utils/getCurrentSeasonEnd';
import { getLogger } from '$shared/utils/logger';

import BadgeRecruitmentAdapter from '../adapter/BadgeRecruitmentAdapter';
import type { RecruitmentCompleteLog, RecruitmentUpdatedLog } from '../dto/RecruitmentLogs';

const log = getLogger('BadgeRecruitmentService');

export default class BadgeRecruitmentService {
  private adapter: BadgeRecruitmentAdapter;

  constructor(adapter?: BadgeRecruitmentAdapter) {
    this.adapter = adapter || new BadgeRecruitmentAdapter();
  }
  /**
   * Fetches the system's enabled migrations
   * @return {*}  {Promise<RecruitmentDetails>}
   */
  async getEnabledRecruitmentDetails(): Promise<RecruitmentDetails> {
    log('getEnabledRecruitments');
    const currentCycle = await this.adapter.getRecruitmentCycleId();
    const recruitmentDetails: RecruitmentDetails = await this.adapter.fetchEnabledRecruitments(currentCycle);
    log('getEnabledRecruitments', { recruitmentDetails });
    return recruitmentDetails;
  }

  async getDefaultBadge(badgeId: number, movement: Movements = Movements.Devs): Promise<TBBadge> {
    log('getDefaultBadge');
    const faction: FactionNames = getFactionName(badgeId) as FactionNames;

    const movementName = getMovementName(movement);
    const path = `/badges/${movementName}/${faction}`.toLowerCase();

    const badge = {
      badgeId,
      movement,
      faction,
      address: zeroAddress,
      tokenUri: path,
      tokenId: -1,
      metadata: {
        image: `${path}.png`,
        'video/mp4': `${path}.mp4`,
      },
    } satisfies TBBadge;

    return badge;
  }

  /**
   * Initiate a recruitment (migration) process
   * @param isAddressEqual
   * @param badge
   * @returns {*} {Promise<ActiveRecruitment>}
   */
  async startRecruitment(address: Address, badge: TBBadge): Promise<ActiveRecruitment> {
    log('startRecruitment', { address, badge });
    const response: IBadgeRecruitment = await this.adapter.startRecruitment(address, badge);
    // map to ActiveRecruitment
    return {
      cycle: Number(response.recruitmentCycle),
      status: RecruitmentStatus.STARTED,
      badge,
      influences: {
        whale: Number(response.whaleInfluences),
        minnow: Number(response.minnowInfluences),
      },
      cooldowns: {
        claim: new Date(Number(response.cooldownExpiration) * 1000),
        influence: new Date(Number(response.influenceExpiration) * 1000),
      },
    };
  }

  /**
   * Influence (tamper) the recruitment process
   * @param address
   * @param nft
   * @param selectedMovement
   * @param recruitment
   * @returns {*} {Promise<IBadgeRecruitment>}
   * */
  async influenceRecruitment(address: Address, nft: TBBadge, selectedMovement: Movements): Promise<ActiveRecruitment> {
    log('influenceRecruitment', { address, nft, selectedMovement });
    const logs: RecruitmentUpdatedLog = await this.adapter.influenceRecruitment(address, nft, selectedMovement);
    log('influenceRecruitment logs', { logs });
    const influenceExpiration = new Date(parseInt(logs[0].args.influenceExpiration!.toString()) * 1000);
    const whaleInfluences = parseInt(logs[0].args.whaleInfluences!.toString());
    const minnowInfluences = parseInt(logs[0].args.minnowInfluences!.toString());
    const activeRecruitment = get(currentRecruitmentStore);
    const cycle = parseInt(logs[0].args.recruitmentCycle!.toString());

    if (!activeRecruitment) {
      throw new Error('Active recruitment not found');
    }
    activeRecruitment.influences.whale = whaleInfluences;
    activeRecruitment.cycle = cycle;
    activeRecruitment.influences.minnow = minnowInfluences;
    activeRecruitment.cooldowns.influence = influenceExpiration;
    activeRecruitment.status = RecruitmentStatus.REFINING;
    currentRecruitmentStore.set(activeRecruitment);
    log('influenceRecruitment update', { activeRecruitment });
    return activeRecruitment;
  }

  getOutdatedRecruitments(
    enabledRecruitments: number[],
    cycleId: number,
    recruitmentsOfUser: ActiveRecruitment[] | null,
  ) {
    if (!recruitmentsOfUser || recruitmentsOfUser?.length === 0) {
      return;
    }
    return recruitmentsOfUser.filter((recruitment) => {
      if (recruitment.cycle !== cycleId && !recruitment.recruitedBadge) {
        if (recruitment.status !== RecruitmentStatus.COMPLETED) return recruitment;
      }
    });
  }

  /**
   * End (claim) the recruitment process
   * @param address
   * @param badge
   * @returns {*} {Promise<IBadgeRecruitment>}
   */
  async endRecruitment(address: Address, badge: TBBadge): Promise<ActiveRecruitment> {
    log('endRecruitment', { address, badge });

    const logs: RecruitmentCompleteLog = await this.adapter.endRecruitment(address, badge);
    log('endRecruitment logs', logs);

    const { finalColor, s2TokenId } = logs[0].args;

    const movement = parseInt(finalColor!.toString()) as Movements;

    const defaultBadge = await this.getDefaultBadge(badge.badgeId);

    const metadata = await nftService.getBadgeNFTMetadata(badge.badgeId, movement);
    if (!metadata) {
      throw new Error('Metadata not found for badge');
    }

    const recruitedBadge = {
      ...defaultBadge,
      metadata: {
        ...metadata,
      },
      movement,
      badgeId: badge.badgeId,
      tokenId: Number(s2TokenId),
    } satisfies TBBadge;

    const endedRecruitment = {
      ...get(activeRecruitmentStore),
      status: RecruitmentStatus.COMPLETED,
      badge,
      recruitedBadge,
      cycle: 0,
      influences: {
        whale: 0,
        minnow: 0,
      },
      cooldowns: {
        claim: new Date(),
        influence: new Date(),
      },
    } satisfies ActiveRecruitment;

    return endedRecruitment;
  }

  /**
   * Get the recruitment status for a particular user
   * @param address
   * @returns {*} {Promise<ActiveRecruitment[]>}
   */
  async getUserRecruitments(address: Address): Promise<ActiveRecruitment[] | null> {
    log('getUserRecruitments 1', { address });

    try {
      const [openRecruitments, cycleId] = await Promise.all([
        this.adapter.getRecruitmentStatusForUser(address),
        this.adapter.getRecruitmentCycleId(),
      ]);

      if (openRecruitments.length === 0) {
        log('no recruitment found for user', { address });
        return null;
      }

      log('openRecruitments', { openRecruitments, cycleId });

      const activeRecruitments = await Promise.all(
        openRecruitments.map(async (recruitment) => {
          log('getUserRecruitments map', { recruitment });

          const cycle = Number(recruitment.recruitmentCycle);
          const influences = {
            whale: Number(recruitment.whaleInfluences),
            minnow: Number(recruitment.minnowInfluences),
          };
          const cooldowns = {
            claim: new Date(Number(recruitment.cooldownExpiration) * 1000),
            influence: new Date(Number(recruitment.influenceExpiration) * 1000),
          };

          const defaultBadgeData = await this.getDefaultBadge(Number(recruitment.s1BadgeId));
          const badge: TBBadge = {
            ...defaultBadgeData,
            tokenId: Number(recruitment.s1TokenId),
            badgeId: Number(recruitment.s1BadgeId),
          };

          let s2Badge: TBBadge | null = null;
          if (recruitment.s2TokenId) {
            s2Badge = {
              ...defaultBadgeData,
              tokenId: Number(recruitment.s2TokenId),
              badgeId: Number(recruitment.s1BadgeId),
            };
          }

          let activeRecruitment: ActiveRecruitment = {
            cycle,
            influences,
            cooldowns,
            status: RecruitmentStatus.NOT_STARTED, // Default status
            badge,
            recruitedBadge: s2Badge ? s2Badge : undefined,
          };
          log('getUserRecruitments activeRecruitment 1', { activeRecruitment });

          // Determine actual recruitment status
          const status = await getRecruitmentStatus(activeRecruitment, cycleId);
          activeRecruitment = { ...activeRecruitment, status };

          log('getRecruitmentStatus activeRecruitment 2', { activeRecruitment });
          return activeRecruitment;
        }),
      );

      // Filter out null values
      const filtered = activeRecruitments.filter(Boolean);
      activeRecruitmentStore.set(filtered);

      if (filtered.length > 0) {
        currentRecruitmentStore.set(filtered.find((recruitment) => recruitment.cycle === cycleId) || null);
      }

      return filtered;
    } catch (error) {
      console.error('Error in getUserRecruitments', error);
      return [] as ActiveRecruitment[];
    }
  }

  //   /**
  //    * Fetch the max amount of influences allowed
  //    * @param exp
  //    * @returns
  //    */
  //   async getMaxInfluences(exp: number): Promise<number> {
  //     log('getMaxInfluences', { exp });
  //     return this.adapter.getMaxInfluences(exp);
  //   }
  /**
   * Fetch current recruitment cycle id
   *
   * @return {*}  {Promise<number>}
   * @memberof BadgeRecruitmentAdapter
   */
  async getRecruitmentCycleId(): Promise<number> {
    log('getRecruitmentCycleId');

    const cycle = await this.adapter.getRecruitmentCycleId();

    currentCycleStore.set(cycle);

    return cycle;
  }
  /**
   * Resets the migration for a given token, cycle and user
   *
   * @param tokenId
   * @param badgeId
   * @param cycleId
   * @return {*}  {Promise<Address>}
   * @memberof BadgeRecruitmentAdapter
   */
  async resetMigration(badge: TBBadge, cycleId: number): Promise<Address> {
    log('resetMigration', { badge, cycleId });
    const txHash = await this.adapter.resetMigration(badge, cycleId);
    return txHash;
  }

  async determineRecruitmentStatus(recruitment: ActiveRecruitment, cycleId: number): Promise<RecruitmentStatus> {
    if (!recruitment) return RecruitmentStatus.NOT_STARTED;
    log('Determining status for recruitment:', recruitment);

    if (recruitment.status === RecruitmentStatus.COMPLETED) {
      return RecruitmentStatus.COMPLETED;
    }

    if (recruitment.badge.frozenUntil && recruitment.badge.frozenUntil >= getCurrentSeasonEnd()) {
      log('Badge is frozen until next season', recruitment);
      return RecruitmentStatus.LOCKED;
    }
    const influencing = recruitment?.cooldowns.influence
      ? new Date(recruitment.cooldowns.influence) > new Date()
      : false;

    const recruiting = recruitment?.cooldowns.claim ? new Date(recruitment.cooldowns.claim) > new Date() : false;

    if (influencing) {
      log('Influencing', recruitment);
      return RecruitmentStatus.REFINING;
    }

    if (recruiting) {
      log('Recruiting', recruitment);
      return RecruitmentStatus.CAN_REFINE;
    }

    if (recruitment.cycle !== cycleId) {
      return RecruitmentStatus.UNFINISHED;
    }

    return RecruitmentStatus.CAN_CLAIM;
  }
}
