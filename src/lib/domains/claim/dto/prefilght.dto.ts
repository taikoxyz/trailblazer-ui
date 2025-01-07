import type { Address, Hash } from 'viem';

export type PreflightDTO = {
  value: string;
  proof: Hash;
};

export type PreflightResponse = {
  address: Address;
  value: number;
  proof: Hash;
};
