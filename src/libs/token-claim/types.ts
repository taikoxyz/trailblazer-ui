import type { Address } from 'viem';

export interface ITokenClaimPreflight {
  address: Address;
  value: number;
  proof: string;
}
