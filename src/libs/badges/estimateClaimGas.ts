import { getConnectorClient } from '@wagmi/core';
import { type Address, formatGwei } from 'viem';
import { estimateContractGas as viemEstimateContractGas } from 'viem/actions';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import type { FACTIONS } from '$configs/badges';


export default async function estimateContractGas(params: Parameters<typeof viemEstimateContractGas>[1]) {
    try {

      return ;
    } catch (e) {
      return 0;
    }
  }

export async function estimateClaimGas(factionId: FACTIONS): Promise<number> {

    try {
    const client = await getConnectorClient(wagmiConfig);

    const gasEstimate = await viemEstimateContractGas(client,{
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'mint',
      args: [
        '0x8e9534f5bdae7b15e940d79257f5f6b7c347c8c34e6e056e182a9b405dab2e7fa1b4cb15304d79cc8b14a4589c6e22e541dab3a9e02d6f0d6b3f4a1dc3b8b6b7'
        , BigInt(factionId)],
    });
    // proper parsing for 0-valued gas estimates
    return parseFloat(formatGwei(gasEstimate === 0n ? BigInt(0) : gasEstimate));
} catch (e){
    console.error(e)
    return -1
}
}
