import { getConnectorClient } from '@wagmi/core';
import { type Address, formatGwei } from 'viem';
import { estimateContractGas as viemEstimateContractGas } from 'viem/actions';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';


export default async function estimateContractGas(params: Parameters<typeof viemEstimateContractGas>[1]) {
    try {
      const client = await getConnectorClient(wagmiConfig);

      return await viemEstimateContractGas(client, params);
    } catch (e) {
      return 0;
    }
  }

export async function estimateClaimGas(address: Address): Promise<number> {
    const gasEstimate = await estimateContractGas({
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'mint',
      args: [
        '0x'
        , address],
    });
    // proper parsing for 0-valued gas estimates
    return parseFloat(formatGwei(gasEstimate === 0 ? BigInt(0) : gasEstimate));
}
