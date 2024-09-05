import type { Address } from 'viem';

export interface IPfp {
  address: Address;
  badgeId: number;
  tokenId: number;
  src: string;
}
