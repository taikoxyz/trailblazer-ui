import type { Address } from 'viem';

import type { Movements } from '$lib/domains/profile/types/types';
import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
import { activeRecruitment } from '$shared/stores/recruitment';
import type { NFT } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

import { BadgeRecruitmentAdapter } from '../adapter/BadgeRecruitmentAdapter';

const log = getLogger('BadgeRecruitmentService');

export class BadgeRecruitmentService {
  private adapter: BadgeRecruitmentAdapter;

  constructor(recruitmentAdapter?: BadgeRecruitmentAdapter) {
    this.adapter = recruitmentAdapter || new BadgeRecruitmentAdapter();
  }

  async getEnabledRecruitments(): Promise<number[]> {
    log('getEnabledRecruitments');
    return this.adapter.fetchEnabledRecruitments();
  }

  async startRecruitment(address: Address, nft: NFT, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
    log('startRecruitment', { address, nft, recruitment });
    return this.adapter.startRecruitment(address, nft, recruitment);
  }

  async influenceRecruitment(
    address: Address,
    nft: NFT,
    selectedMovement: Movements,
    recruitment: IBadgeRecruitment,
  ): Promise<IBadgeRecruitment> {
    log('influenceRecruitment', { address, nft, selectedMovement });
    return this.adapter.influenceRecruitment(address, nft, selectedMovement, recruitment);
  }

  async endRecruitment(address: Address, nft: NFT, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
    log('endRecruitment', { address, nft, recruitment });
    return this.adapter.endRecruitment(address, nft, recruitment);
  }

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

  async getMaxInfluences(exp: number): Promise<number> {
    log('getMaxInfluences', { exp });
    return this.adapter.getMaxInfluences(exp);
  }
}
