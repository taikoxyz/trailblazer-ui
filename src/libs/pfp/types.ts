import type { Address } from 'viem';

export interface IPfp {
  address: Address;
  tokenId: number;
  src: string;
  badgeId?: number;
}
