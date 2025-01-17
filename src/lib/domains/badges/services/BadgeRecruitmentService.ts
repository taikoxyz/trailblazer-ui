// import type { Address } from 'viem';

// import type { Movements } from '$lib/domains/profile/types/types';
// import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
// import { activeRecruitment } from '$shared/stores/recruitment';
// import type { TBBadge } from '$shared/types/NFT';
import { getFactionName, type FactionNames } from '$lib/domains/nfts/types/badges/types';
import { getMovementName, Movements } from '$lib/domains/profile/types/types';
import type { TBBadge } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';
import { zeroAddress } from 'viem';
import BadgeRecruitmentAdapter from '../adapter/BadgeRecruitmentAdapter';

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
    const recruitments = await this.adapter.fetchEnabledRecruitments();
    log('getEnabledRecruitments', { recruitments });
    return recruitments;
  }

  async getBadge(badgeId: number): Promise<TBBadge> {
    log('getBadge');
    const faction: FactionNames = getFactionName(badgeId) as FactionNames;
    const movement: Movements = Movements.Devs;
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

  //   /**
  //    * Initiate a recruitment (migration) process
  //    * @param address
  //    * @param nft
  //    * @param recruitment
  //    * @returns {*} {Promise<IBadgeRecruitment>}
  //    */
  //   async startRecruitment(address: Address, nft: TBBadge, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
  //     log('startRecruitment', { address, nft, recruitment });
  //     return this.adapter.startRecruitment(address, nft, recruitment);
  //   }

  //   /**
  //    * Influence (tamper) the recruitment process
  //    * @param address
  //    * @param nft
  //    * @param selectedMovement
  //    * @param recruitment
  //    * @returns {*} {Promise<IBadgeRecruitment>}
  //    * */
  //   async influenceRecruitment(
  //     address: Address,
  //     nft: TBBadge,
  //     selectedMovement: Movements,
  //     recruitment: IBadgeRecruitment,
  //   ): Promise<IBadgeRecruitment> {
  //     log('influenceRecruitment', { address, nft, selectedMovement });
  //     return this.adapter.influenceRecruitment(address, nft, selectedMovement, recruitment);
  //   }

  //   /**
  //    * End (claim) the recruitment process
  //    * @param address
  //    * @param nft
  //    * @param recruitment
  //    * @returns {*} {Promise<IBadgeRecruitment>}
  //    */
  //   async endRecruitment(address: Address, nft: TBBadge, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
  //     log('endRecruitment', { address, nft, recruitment });
  //     return this.adapter.endRecruitment(address, nft, recruitment);
  //   }

  //   /**
  //    * Get the recruitment status for a particular user
  //    * @param address
  //    * @returns {*} {Promise<IBadgeRecruitment[]>}
  //    */
  //   async getRecruitmentStatus(address: Address): Promise<IBadgeRecruitment[]> {
  //     log('getRecruitmentStatus', { address });
  //     const recruitments = await this.adapter.getRecruitmentStatus(address);
  //     const cycleId = await this.adapter.getRecruitmentCycleId();
  //     const foundActive = recruitments.find(
  //       (recruitment) =>
  //         recruitment.cycleId === cycleId &&
  //         (recruitment.status === RecruitmentStatus.STARTED ||
  //           recruitment.status === RecruitmentStatus.CAN_REFINE ||
  //           recruitment.status === RecruitmentStatus.CAN_CLAIM),
  //     );

  //     activeRecruitment.set(foundActive as IBadgeRecruitment);

  //     log('getRecruitmentStatus', { recruitments, foundActive });

  //     return recruitments as IBadgeRecruitment[];
  //   }

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
    return this.adapter.getRecruitmentCycleId();
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
