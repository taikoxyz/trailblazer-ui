import type { Address, Hex } from 'viem';

import { PRECONF_CAMPAIGN_PHASE, PRECONF_TX_STAGE } from './../types';

export type BasedLinerSubmitDto = {
  address: Address;
  stage: PRECONF_TX_STAGE;
  phase: PRECONF_CAMPAIGN_PHASE;
  timestamp: number;
  tx_hash: Hex;
};
