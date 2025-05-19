import { BasedLinersAbi, basedLinersAddress } from '$generated/abi';
import { chainId } from '$shared/utils/chain';
import getConnectedAddress from '$shared/utils/getConnectedAddress';

import { BasedLinerAdapter } from '../adapter/BasedLinerAdapter';
import type { InternalAPIPayload } from '../dto/InternalAPIPayload';
import { PRECONF_CAMPAIGN_PHASE } from '../types';

const PHASE_TO_EVENT_ID = {
  [PRECONF_CAMPAIGN_PHASE.BEFORE]: 0,
  [PRECONF_CAMPAIGN_PHASE.AFTER]: 1,
};

export class BasedLinerService {
  /**
   * Calls the adapter to send the transaction and returns the txHash
   */
  static async registerPhase(phase: PRECONF_CAMPAIGN_PHASE) {
    const eventId = PHASE_TO_EVENT_ID[phase];

    if (eventId === undefined) {
      throw new Error(`Invalid phase: ${phase}`);
    }

    // 1. get the txHash
    const txHash = await BasedLinerAdapter.sendTx({
      contractAddress: basedLinersAddress[chainId],
      abi: BasedLinersAbi,
      functionName: 'register',
      args: [eventId],
    });

    // TODO: handle event ended, then assume an avg of n seconds and call with phaseEnded true

    const payload: InternalAPIPayload = {
      phase,
      wallet: getConnectedAddress(),
      txHash,
      phaseEnded: false,
    };

    // 2. Call the backend API with the payload
    const res = await fetch('/api/basedliner/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Error calling API:', res.status, res.statusText);
      throw new Error(`API call failed: ${res.status} ${res.statusText}`);
    }
    // 3. Parse the response and return it
    const response = await res.json();

    return response;
  }
}
