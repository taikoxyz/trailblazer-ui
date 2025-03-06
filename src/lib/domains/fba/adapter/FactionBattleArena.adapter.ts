import type { Address } from 'viem';

import { badgesSubgraphClient } from '$shared/services/graphql/client';
import { GET_S2_BADGE_MULTIPLIER_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';
import { readContract, signMessage, waitForTransactionReceipt, watchContractEvent, writeContract } from '@wagmi/core';
import { factionBattleArenaAbi, factionBattleArenaAddress } from '$generated/abi';
import { chainId } from '$shared/utils/chain';
import { wagmiConfig } from '$shared/wagmi';


const log = getLogger('FactionBattleArenaAdapter');

export default class FactionBattleArenaAdapter {
    // tmp dev-room method
    async _executeLeagueAndStartNext(seed:number): Promise<void> {
        log('Executing league and starting next');

        await readContract(wagmiConfig, {
              abi: factionBattleArenaAbi,
              address: factionBattleArenaAddress[chainId],
              functionName: 'executeLeagueAndStartNext',
              args: [BigInt(seed)],
              chainId,
            });
    }

    async fetchLeagueIds(): Promise<number[]> {
        log('Fetching league ids');


    }

  async fetchS2BadgeMultiplier(address: Address, season: number): Promise<S2Multipliers> {
    log('Fetching S2 badge multiplier', { address, season });
    try {
    } catch (error) {
    }
}
}
