import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { FactionNames } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { config } from '$libs/wagmi';
import type { IChainId } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';

export async function getUserBadges(address: Address): Promise<Record<FactionNames, boolean>> {
  const out = {
    [FactionNames.Ravers]: false,
    [FactionNames.Robots]: false,
    [FactionNames.Bouncers]: false,
    [FactionNames.Masters]: false,
    [FactionNames.Monks]: false,
    [FactionNames.Drummers]: false,
    [FactionNames.Androids]: false,
    [FactionNames.Shinto]: false,
  };

  let { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) {
    selectedNetworkId = config.chains[0].id;
  }

  const chainId = selectedNetworkId as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];
  const result = await readContract(config, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'badgeBalances',
    args: [address],
    chainId,
  });

  const factionNames = Object.keys(FactionNames);

  result.forEach((owned, index) => {
    out[factionNames[index] as FactionNames] = owned;
  });

  return out;
}
