import { readContract } from '@wagmi/core';
import { type Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('BadgeS1Adapter');

export class BadgeS1Adapter {
  /**
   * Fetches the token id for a given address and faction id.
   *
   * @param {Address} address
   * @param {number} factionId
   * @return {*}  {Promise<number>}
   * @memberof BadgeAdapter
   */
  async getTokenId(address: Address, factionId: number): Promise<number> {
    log('getTokenId', { address, factionId });

    const contractAddress = trailblazersBadgesAddress[chainId];
    const result = await readContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: contractAddress,
      functionName: 'getTokenId',
      args: [address, BigInt(factionId)],
      chainId,
    });

    return parseInt(result.toString(16), 16);
  }
}
