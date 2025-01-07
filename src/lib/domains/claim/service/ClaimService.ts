import * as Sentry from '@sentry/sveltekit';
import type { Address } from 'viem';

import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { pendingTransactions } from '$shared/stores/pendingTransactions';
import {
  ClaimContractError,
  InvalidClaimAmount,
  MissingClaimProof,
  TransactionTimedOutError,
  UnknownClaimError,
  UnknownPreflightError,
} from '$shared/types/errors';
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
    if (!proof) {
      throw new MissingClaimProof('Invalid proof');
    }
    if (amount <= 0) {
      throw new InvalidClaimAmount('Invalid amount');
    }
    try {
      const txHash = await this.claimAdapter.claim(address, amount, proof);
      await pendingTransactions.add(txHash);
    } catch (e) {
      Sentry.captureException(e);
      console.error(e);
      if (e instanceof TransactionTimedOutError) {
        throw e;
      }
      throw new UnknownClaimError('Error claiming token');
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
      const hasClaimed = await this.claimAdapter.hasClaimed(address, season);
      if (hasClaimed) {
        log('Has claimed %s', hasClaimed);
        return hasClaimed;
      } else {
        throw new ClaimContractError('Error checking hasClaimed status');
      }
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
      Sentry.captureException(e);
      console.error(e);
      throw new UnknownPreflightError('Error preflight');
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
