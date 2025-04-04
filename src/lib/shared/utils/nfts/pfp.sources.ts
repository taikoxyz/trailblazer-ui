import type { Address } from 'viem';

import { taikoonTokenAddress, trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';

import { chainId } from '../chain';

export const PFP_SOURCE_TRAILBLAZER_BADGES_S1 = trailblazersBadgesAddress[chainId];
export const PFP_SOURCE_TRAILBLAZER_BADGES_S2 = trailblazersBadgesS2Address[chainId];
export const PFP_SOURCE_TAIKOONS = taikoonTokenAddress[chainId];
export const PFP_SOURCE_SNAEFELLS = '0xa5804b2a764f9808858355c1f1832588f47ab654' as Address;
export const PFP_SOURCE_TAIKONAUTS = '0x56b0d8d04de22f2539945258ddb288c123026775';
export const PFP_SOURCE_SENTINELS = '0xb941ac9AD2f10F38d9852B58cbFf709573E665AA';

export const PFP_SOURCES: Address[] = [
  PFP_SOURCE_TRAILBLAZER_BADGES_S1,
  PFP_SOURCE_TRAILBLAZER_BADGES_S2,
  PFP_SOURCE_TAIKOONS,
  PFP_SOURCE_SNAEFELLS,
  PFP_SOURCE_TAIKONAUTS,
  PFP_SOURCE_SENTINELS,
];
