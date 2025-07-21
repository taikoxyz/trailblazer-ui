import type { Address } from 'viem';

export type ClaimEligibilityDto = {
  address: Address;
  value: string;
};

export type ClaimProofDto = {
  address: Address;
  value: string;
  proof: string;
};

export type ClaimProofResponseDto = {
  proof: string;
  amount: string;
};
