import { getBlock } from '@wagmi/core';
import type { Address, Hex } from 'viem';

import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';

import { BasedLinerAdapter } from '../../adapter/server/BasedLinerAdapter.server';
import { type PRECONF_CAMPAIGN_PHASE, PRECONF_TX_STAGE } from '../../types';

const log = getLogger('BasedLinerService');
export class BasedLinerService {
  static getTimingDiffForAddress(address: Address) {
    if (!address) {
      throw new Error('Address is required');
    }
    throw new Error('Method not implemented.');
  }

  static async submitPhase(args: { phase: PRECONF_CAMPAIGN_PHASE; timestamp: number; wallet: Address; txHash: Hex }) {
    const { phase, timestamp, wallet, txHash } = args;

    const initialResponse = await BasedLinerAdapter.submitStage({
      stage: PRECONF_TX_STAGE.INITIAL,
      phase,
      timestamp,
      wallet,
    });
    //TOOD check if the response is ok
    log('initialResponse', initialResponse);

    const receipt = await BasedLinerAdapter.waitForTransactionReceipt({
      txHash,
    });
    if (!receipt) throw new Error('No receipt found for this txHash');
    const blockNumber = receipt.blockNumber;

    const finalResponse = await BasedLinerAdapter.submitStage({
      stage: PRECONF_TX_STAGE.FINAL,
      phase,
      blockNumber: Number(blockNumber),
      wallet,
    });

    //TOOD check if the response is ok
    log('finalResponse', finalResponse);

    const block = await getBlock(wagmiConfig, {
      blockNumber,
    });
    const blockTime = block.timestamp * 1000n;

    // TODO fetch diff from api

    const txTime = BigInt(timestamp);
    const diff = blockTime - txTime;

    return Number(diff);
  }
}
