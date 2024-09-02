import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { FactionNames } from '$configs/badges';
import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

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

  const contractAddress = trailblazersBadgesAddress[chainId];

  const result = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'badgeBalancesV2',
    args: [address],
    chainId,
  });

  const factionNames = Object.keys(FactionNames);

  result.forEach((owned, index) => {
    out[factionNames[index] as FactionNames] = owned;
  });

  return out;
}

/*

import type { Address } from 'viem';

import { FactionNames } from '$configs/badges';


export async function getUserBadges(address?: Address): Promise<Record<FactionNames, boolean>> {
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

  const factionNames = Object.keys(FactionNames);

  factionNames.forEach((_, index) => {
    out[factionNames[index] as FactionNames] = true// owned;
  });

  return out;
}

*/
