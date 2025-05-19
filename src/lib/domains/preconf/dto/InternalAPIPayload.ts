import type { Address, Hex } from 'viem';

import { PRECONF_CAMPAIGN_PHASE } from '../types';

export interface InternalAPIPayload {
  phase: PRECONF_CAMPAIGN_PHASE;
  wallet: Address;
  txHash: Hex;
  phaseEnded: boolean;
}
