// import type { Address } from 'viem';

// import type { Movements } from '$lib/domains/profile/types/types';
// import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
// import { activeRecruitment } from '$shared/stores/recruitment';
// import type { TBBadge } from '$shared/types/NFT';
import { type Address, zeroAddress } from 'viem';

import { type FactionNames, getFactionName } from '$lib/domains/nfts/types/badges/types';
import { getMovementName, Movements } from '$lib/domains/profile/types/types';
import { activeRecruitmentStore, currentCycleStore } from '$shared/stores/recruitment';
import { RecruitmentStatus, type ActiveRecruitment, type IBadgeRecruitment } from '$shared/types/BadgeRecruitment';
import type { TBBadge } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

import BadgeRecruitmentAdapter from '../adapter/BadgeRecruitmentAdapter';
import { getRecruitmentStatus } from '$shared/utils/badges/getRecruitmentStatus';
import { get } from 'svelte/store';

const log = getLogger('BadgeRecruitmentService');

export default class BadgeRecruitmentService {
  private adapter: BadgeRecruitmentAdapter;

  constructor(adapter?: BadgeRecruitmentAdapter) {
    this.adapter = adapter || new BadgeRecruitmentAdapter();
  }
  /**
   * Fetches the system's enabled migrations
   * @return {*}  {Promise<number[]>}
   */
  async getEnabledRecruitments(): Promise<number[]> {
    log('getEnabledRecruitments');
    const currentCylce = await this.adapter.getRecruitmentCycleId();
    const recruitments = await this.adapter.fetchEnabledRecruitments(currentCylce);
    log('getEnabledRecruitments', { recruitments });
    return recruitments;
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
   * @returns {*} {Promise<IBadgeRecruitment>}
   */
  async startRecruitment(address: Address, badge: TBBadge): Promise<IBadgeRecruitment> {
    log('startRecruitment', { address, badge });
    return this.adapter.startRecruitment(address, badge);
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
    const logs = await this.adapter.influenceRecruitment(address, nft, selectedMovement);
    log('influenceRecruitment logs', { logs });
    const influenceExpiration = new Date(parseInt(logs[0].args.influenceExpiration!.toString()) * 1000);
    const whaleInfluences = parseInt(logs[0].args.whaleInfluences!.toString());
    const minnowInfluences = parseInt(logs[0].args.minnowInfluences!.toString());
    const activeRecruitment = get(activeRecruitmentStore);

    if (!activeRecruitment) {
      throw new Error('Active recruitment not found');
    }
    activeRecruitment.influences.whale = whaleInfluences;
    activeRecruitment.influences.minnow = minnowInfluences;
    activeRecruitment.cooldowns.influence = influenceExpiration;
    activeRecruitmentStore.set(activeRecruitment);
    log('influenceRecruitment update', { activeRecruitment });
    return activeRecruitment;
  }

  /**
   * End (claim) the recruitment process
   * @param address
   * @param badge
   * @returns {*} {Promise<IBadgeRecruitment>}
   */
  async endRecruitment(address: Address, badge: TBBadge): Promise<ActiveRecruitment> {
    log('endRecruitment', { address, badge });

    const logs = await this.adapter.endRecruitment(address, badge);

    const { finalColor, s2TokenId } = logs[0].args;
    const movement = parseInt(finalColor!.toString()) as Movements;

    const defaultBadge = await this.getDefaultBadge(badge.badgeId);
    const recruitedBadge = {
      ...defaultBadge,
      movement,
      badgeId: badge.badgeId,
      tokenId: parseInt(s2TokenId),
    } satisfies TBBadge;

    const endRecruitment = {
      ...get(activeRecruitmentStore),
      status: RecruitmentStatus.COMPLETED,
      badge,
      recruitedBadge,
    } as ActiveRecruitment;

    return endRecruitment;
  }

  /**
   * Get the recruitment status for a particular user
   * @param address
   * @returns {*} {Promise<ActiveRecruitment>}
   */
  async getUserRecruitments(address: Address): Promise<ActiveRecruitment> {
    log('getUserRecruitments', { address });
    try {
      const [recruitment, cycleId] = await Promise.all([
        this.adapter.getRecruitmentStatusForUser(address),
        this.adapter.getRecruitmentCycleId(),
      ]);

      const status = await getRecruitmentStatus(recruitment);
      log('getRecruitmentStatus', { recruitment, status, cycleId });

      // const foundActive = recruitments.find(
      //   (recruitment) =>
      //     recruitment.cycleId === cycleId &&
      //     (recruitment.status === RecruitmentStatus.STARTED ||
      //       recruitment.status === RecruitmentStatus.CAN_REFINE ||
      //       recruitment.status === RecruitmentStatus.CAN_CLAIM),
      // );

      const defaultBadgeData = await this.getDefaultBadge(Number(recruitment.s1BadgeId));

      const badge: TBBadge = {
        ...defaultBadgeData,
        tokenId: Number(recruitment.s1TokenId),
        badgeId: Number(recruitment.s1BadgeId),
      };

      const activeRecruitment: ActiveRecruitment = {
        influences: {
          whale: Number(recruitment.whaleInfluences),
          minnow: Number(recruitment.minnowInfluences),
        },
        cooldowns: {
          claim: new Date(Number(recruitment.cooldownExpiration) * 1000),
          influence: new Date(Number(recruitment.influenceExpiration) * 1000),
        },
        status,
        badge,
      };

      activeRecruitmentStore.set(activeRecruitment);

      log('getUserRecruitments', { recruitment });

      return activeRecruitment;
    } catch (error) {
      console.error('Error in getUserRecruitments', error);
      return {} as ActiveRecruitment;
    }
  }

  async canRecruitInCycle(address: Address, cylce: number, badge: TBBadge): Promise<boolean> {
    log('canRecruitInCycle', { address, cylce, badge });
    const alreadyRecruited = await this.adapter.hasRecruitedInCycle(address, cylce, badge.badgeId);
    return !alreadyRecruited;
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
  //   /**
  //    * Resets the migration for a given token, cycle and user
  //    *
  //    * @param tokenId
  //    * @param badgeId
  //    * @param cycleId
  //    * @return {*}  {Promise<void>}
  //    * @memberof BadgeRecruitmentAdapter
  //    */
  //   async resetMigration(tokenId: number, badgeId: number, cycleId: number): Promise<void> {
  //     log('resetMigration', { tokenId, badgeId, cycleId });
  //     return this.adapter.resetMigration(tokenId, badgeId, cycleId);
  //   }
}
