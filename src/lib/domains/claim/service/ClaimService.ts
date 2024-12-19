import type { Address } from 'viem';

import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { pendingTransactions } from '$shared/stores/pendingTransactions';
import { getLogger } from '$shared/utils/logger';

import { ClaimAdapter } from '../adapter/ClaimAdapter';
import type { PreflightResponse } from '../dto/prefilght.dto';
import type { IClaimService } from './IClaimService';

const log = getLogger('ClaimService');

export class ClaimService implements IClaimService {
  // Adapter
  private claimAdapter: ClaimAdapter;

  constructor(claimAdapter?: ClaimAdapter) {
    this.claimAdapter = claimAdapter || new ClaimAdapter();
  }

  /**
   * Claim token reward
   *
   * @param {Address} address
   * @param {number} amount
   * @param {string} proof
   * @param {number} season
   * @return {*}  {Promise<void>}
   * @memberof ClaimService
   */
  async claim(address: Address, amount: number, proof: string, season: number): Promise<void> {
    log('Claiming %s for %s in season %s', amount, address, season);
    const blacklisted = await profileService.getBlacklistStatus(address, season);
    if (blacklisted) {
      throw new Error('You are blacklisted');
    }
    try {
      const txHash = await this.claimAdapter.claim(address, amount, proof);
      await pendingTransactions.add(txHash);
    } catch (e) {
      console.error(e);
      throw new Error('Error claiming token');
    }
  }

  /**
   * Check if the user has already claimed the token
   *
   * @param {Address} address
   * @param {number} season
   * @return {*}  {Promise<boolean>}
   * @memberof ClaimService
   */
  async hasClaimed(address: Address, season: number): Promise<boolean> {
    log('Checking if %s has claimed in season %s', address, season);
    try {
      return this.claimAdapter.hasClaimed(address, season);
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  /**
   * Preflight check for the claim by requesting the proof from the API
   *
   * @param {Address} address
   * @param {number} season
   * @return {*}  {Promise<PreflightResponse>}
   * @memberof ClaimService
   */
  async preflight(address: Address, season: number): Promise<PreflightResponse> {
    log('Preflight for %s in season %s', address, season);
    const blacklisted = await profileService.getBlacklistStatus(address, season);
    if (blacklisted) {
      throw new Error('You are blacklisted');
    }
    try {
      const data = await this.claimAdapter.preflight(address, season);
      const { value, proof } = data;
      return { address, value: parseFloat(value || '0'), proof };
      // return { address, value: 10000.14, proof };
    } catch (e) {
      console.error(e);
      throw new Error('Error preflight');
    }
  }

  /**
   * Add token to the wallet
   *
   * @return {*}  {Promise<boolean>}
   * @memberof ClaimService
   */
  async addTokenToWallet(): Promise<boolean> {
    return this.claimAdapter.addTokenToWallet();
  }
}
