import type { Hex } from 'viem';

import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { TooManyRequestsError } from '$shared/types/errors';

import type { BasedLinerSubmitDto } from '../../dto/BasedlinerSubmit.dto';

export class BasedLinerAdapter {
  /**
   * Fetches the time difference between the current block timestamp and the provided timestamp.
   * @param args - The arguments containing stage, phase, timestamp, wallet, and txHash.
   * @returns The time difference in seconds.
   */
  static async submitStage(args: BasedLinerSubmitDto) {
    try {
      const payload: BasedLinerSubmitDto = {
        address: args.address,
        stage: args.stage,
        phase: args.phase,
        timestamp: args.timestamp || 0,
        tx_hash: args.tx_hash,
      };

      return await fetchFromApi<Response>('/basedliner/submit', 4, {
        method: 'POST',
        headers: { 'x-api-key': `${API_KEY}` },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error submitting stage', error);

      // Check if it's a 429 Too Many Requests error
      if (error instanceof Error && error.message.includes('API Error: 429')) {
        throw new TooManyRequestsError('Rate limit exceeded. Please wait before submitting again.');
      }

      throw new Error('Failed to submit stage');
    }
  }

  static async waitForTransactionReceipt({ txHash }: { txHash: Hex }) {
    const { getPublicClient } = await import('@wagmi/core');
    const { basedLinersServerConfig } = await import('$shared/wagmi/server');

    const client = getPublicClient(basedLinersServerConfig);

    if (!client) throw new Error('Could not get public client');

    const receipt = await client.waitForTransactionReceipt({ hash: txHash });
    if (!receipt) throw new Error('No receipt found for this txHash');

    return receipt;
  }
}
