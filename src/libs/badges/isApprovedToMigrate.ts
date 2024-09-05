import type { Address } from 'viem';

import { chainId } from '$libs/chain';

import { trailblazersBadgesS2Address } from '../../generated/abi';
import { getApproved } from './getApproved';
import { isApprovedForAllS2 } from './isApprovedForAllS2';

export default async function isApprovedToMigrate(address: Address, badgeId?: number): Promise<boolean> {
  const s2ContractAddress = trailblazersBadgesS2Address[chainId];
  const approvedForAllS2 = await isApprovedForAllS2(address);
  const isApproved = badgeId !== undefined && (await getApproved(address, badgeId)) === s2ContractAddress;

  return approvedForAllS2 || isApproved;
}
