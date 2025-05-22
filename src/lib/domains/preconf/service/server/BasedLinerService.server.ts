import { getBlock } from '@wagmi/core';
import { type Address, type Hex, zeroAddress } from 'viem';

import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { wagmiConfig } from '$shared/wagmi';

import { BasedLinerAdapter } from '../../adapter/server/BasedLinerAdapter.server';
import type { BasedlinerLeaderboard } from '../../dto/BasedlinerLeaderboard';
import { type PRECONF_CAMPAIGN_PHASE, PRECONF_TX_STAGE } from '../../types';

const BASEDLINER_LEADERBOARD_API = '/basedliner/leaderboard';
export class BasedLinerService {
  static getTimingDiffForAddress(address: Address) {
    if (!address) {
      throw new Error('Address is required');
    }
    throw new Error('Method not implemented.');
  }

  static async submitPhase(args: { phase: PRECONF_CAMPAIGN_PHASE; timestamp: number; wallet: Address; txHash: Hex }) {
    const { phase, timestamp, wallet, txHash } = args;

    if (phase === undefined || phase === null || !timestamp || !wallet || wallet === zeroAddress || !txHash) {
      throw new Error('Phase, timestamp, wallet and txHash are required');
    }

    try {
      await BasedLinerAdapter.submitStage({
        stage: PRECONF_TX_STAGE.INITIAL,
        phase,
        timestamp,
        address: wallet,
        tx_hash: txHash,
      });
    } catch (error) {
      console.error('Error submitting phase:', error);
      throw new Error('Failed to submit phase');
    }

    const receipt = await BasedLinerAdapter.waitForTransactionReceipt({
      txHash,
    });

    if (!receipt) throw new Error('No receipt found for this txHash');
    const blockNumber = receipt.blockNumber;

    const block = await getBlock(wagmiConfig, {
      blockNumber,
    });
    const blockTime = block.timestamp * 1000n;

    try {
      await BasedLinerAdapter.submitStage({
        stage: PRECONF_TX_STAGE.FINAL,
        phase,
        address: wallet,
        timestamp: Number(blockTime),
        tx_hash: txHash,
      });
    } catch (error) {
      console.error('Error submitting phase:', error);
      throw new Error('Failed to submit phase');
    }

    // TODO fetch diff from api

    const txTime = BigInt(timestamp);
    const diff = blockTime - txTime;

    return Number(diff);
  }

  /**
   * Fetches the leaderboard data from the API.
   * @param {string} [address] - The address to filter the leaderboard by.
   * @returns {Promise<BasedlinerLeaderboard[]>} - The leaderboard data.
   * @memberof BasedLinerService
   */
  static async getLeaderboard({ address }: { address?: string }) {
    const queryParams = new URLSearchParams();
    if (address) queryParams.set('address', address);
    const endpoint = `${BASEDLINER_LEADERBOARD_API}?${queryParams.toString()}`;
    const response = await fetchFromApi<{ data: { items: BasedlinerLeaderboard[] } }>(endpoint, 4, {
      headers: { 'x-api-key': `${API_KEY}` },
      method: 'GET',
    });
    // If address is provided, return single entry, else return all entries
    if (address) {
      return response.data.items[0] || null;
    }
    return response.data.items || [];
  }

  /**
   * Fetches the leaderboard entry for a specific address.
   * @param {string} address - The address to fetch the leaderboard entry for.
   * @returns {Promise<BasedlinerLeaderboard>} - The leaderboard entry data.
   * @memberof BasedLinerService
   */
  static async getLeaderboardEntry({ address }: { address: string }) {
    return await this.getLeaderboard({ address });
  }
}
