import type { Address, Hex } from 'viem';

import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { pendingTransactions } from '$shared/stores/pendingTransactions';
import { ClaimContractError, TransactionTimedOutError, UnknownClaimError } from '$shared/types/errors';
import { getLogger } from '$shared/utils/logger';

import { ClaimClientAdapter } from '../adapter/ClaimClientAdapter';
import type { ClaimEligibilityDto } from '../dto/ClaimServer.dto';

const log = getLogger('ClaimServerService');

export interface IClaimServerService {
  checkEligibility(address: Address): Promise<ClaimEligibilityDto>;
  executeClaim(address: Address, season: number): Promise<{ txHash: Hex }>;
  hasClaimed(address: Address, season: number): Promise<boolean>;
  addTokenToWallet(): Promise<boolean>;
}

export class ClaimServerServiceClient implements IClaimServerService {
  private claimAdapter: ClaimClientAdapter;

  constructor(claimAdapter?: ClaimClientAdapter) {
    this.claimAdapter = claimAdapter || new ClaimClientAdapter();
  }

  /**
   * Check user eligibility for claiming tokens.
   * This uses the public serverside endpoint.
   * @param address - The user's wallet address
   * @returns Eligibility data with address and claimable value
   */
  async checkEligibility(address: Address): Promise<ClaimEligibilityDto> {
    log('Checking eligibility for %s', address);
    return await this.claimAdapter.checkEligibility(address);
  }

  /**
   * Execute the complete claim process server-side.
   * This handles blacklist checks, proof fetching, and transaction execution server-side.
   * @param address - The user's wallet address
   * @param season - The season number
   * @returns Transaction result with hash and receipt
   */
  async executeClaim(address: Address, season: number): Promise<{ txHash: Hex }> {
    log('Executing claim for %s in season %s', address, season);

    // Check blacklist status
    const blacklisted = await profileService.getBlacklistStatus(address, season);
    if (blacklisted) {
      throw new Error('You are blacklisted');
    }

    try {
      // Execute claim client-side (adapter fetches proof from server then executes transaction)
      const txHash = await this.claimAdapter.executeClaim(address);

      // Add transaction to pending transactions for UI tracking
      await pendingTransactions.add(txHash);

      return { txHash };
    } catch (e) {
      console.error(e);
      if (e instanceof TransactionTimedOutError) {
        throw e;
      }
      throw new UnknownClaimError('Error executing claim');
    }
  }

  /**
   * Check if the user has already claimed tokens.
   * @param address - The user's wallet address
   * @param season - The season number
   * @returns Whether the user has already claimed
   */
  async hasClaimed(address: Address, season: number): Promise<boolean> {
    log('Checking if %s has claimed in season %s', address, season);
    try {
      const hasClaimed = await this.claimAdapter.hasClaimed(address, season);
      if (hasClaimed !== null) {
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
   * Add token to the wallet for user convenience.
   * @returns Whether the token was successfully added to the wallet
   */
  async addTokenToWallet(): Promise<boolean> {
    return await this.claimAdapter.addTokenToWallet();
  }
}
