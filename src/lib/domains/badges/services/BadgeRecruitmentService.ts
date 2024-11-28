import type { Address } from 'viem';

import type { Movements } from '$lib/domains/profile/types/types';
import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
import { activeRecruitment } from '$shared/stores/recruitment';
import type { NFT } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

import BadgeRecruitmentAdapter from '../adapter/BadgeRecruitmentAdapter';

const log = getLogger('BadgeRecruitmentService');

export default class BadgeRecruitmentService {
  private adapter: BadgeRecruitmentAdapter;

  constructor(recruitmentAdapter?: BadgeRecruitmentAdapter) {
    this.adapter = recruitmentAdapter || new BadgeRecruitmentAdapter();
  }
  /**
   * Fetches the system's enabled migrations
   * @return {*}  {Promise<number[]>}
   */
  async getEnabledRecruitments(): Promise<number[]> {
    log('getEnabledRecruitments');
    return this.adapter.fetchEnabledRecruitments();
  }

  /**
   * Initiate a recruitment (migration) process
   * @param address
   * @param nft
   * @param recruitment
   * @returns {*} {Promise<IBadgeRecruitment>}
   */
  async startRecruitment(address: Address, nft: NFT, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
    log('startRecruitment', { address, nft, recruitment });
    return this.adapter.startRecruitment(address, nft, recruitment);
  }

  /**
   * Influence (tamper) the recruitment process
   * @param address
   * @param nft
   * @param selectedMovement
   * @param recruitment
   * @returns {*} {Promise<IBadgeRecruitment>}
   * */
  async influenceRecruitment(
    address: Address,
    nft: NFT,
    selectedMovement: Movements,
    recruitment: IBadgeRecruitment,
  ): Promise<IBadgeRecruitment> {
    log('influenceRecruitment', { address, nft, selectedMovement });
    return this.adapter.influenceRecruitment(address, nft, selectedMovement, recruitment);
  }

  /**
   * End (claim) the recruitment process
   * @param address
   * @param nft
   * @param recruitment
   * @returns {*} {Promise<IBadgeRecruitment>}
   */
  async endRecruitment(address: Address, nft: NFT, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
    log('endRecruitment', { address, nft, recruitment });
    return this.adapter.endRecruitment(address, nft, recruitment);
  }

  /**
   * Get the recruitment status for a particular user
   * @param address
   * @returns {*} {Promise<IBadgeRecruitment[]>}
   */
  async getRecruitmentStatus(address: Address): Promise<IBadgeRecruitment[]> {
    log('getRecruitmentStatus', { address });
    const recruitments = await this.adapter.getRecruitmentStatus(address);
    const foundActive = recruitments.find(
      (recruitment) =>
        recruitment.status === RecruitmentStatus.STARTED ||
        recruitment.status === RecruitmentStatus.CAN_REFINE ||
        recruitment.status === RecruitmentStatus.CAN_CLAIM,
    );

    activeRecruitment.set(foundActive as IBadgeRecruitment);
    return recruitments as IBadgeRecruitment[];
  }

  /**
   * Fetch the max amount of influences allowed
   * @param exp
   * @returns
   */
  async getMaxInfluences(exp: number): Promise<number> {
    log('getMaxInfluences', { exp });
    return this.adapter.getMaxInfluences(exp);
  }
}
