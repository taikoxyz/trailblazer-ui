import type { Address } from 'viem';

import type { PreflightResponse } from '../dto/prefilght.dto';

export interface IClaimService {
  claim(address: Address, amount: number, proof: string, season: number): Promise<void>;
  hasClaimed(address: Address, season: number): Promise<boolean>;
  preflight(address: Address, season: number): Promise<PreflightResponse>;
  addTokenToWallet(): Promise<boolean>;
}
