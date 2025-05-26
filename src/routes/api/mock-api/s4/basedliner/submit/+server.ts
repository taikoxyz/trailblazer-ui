import type { RequestHandler } from '@sveltejs/kit';
import { getBlock } from '@wagmi/core';

import { PRECONF_TX_STAGE } from '$lib/domains/preconf/types';
import { wagmiConfig } from '$shared/wagmi';

import { MockBasedlinerStore } from '../store';

const updateLeaderboard = async ({
  address,
  stage,
  timestamp,
  blockNumber,
}: {
  address: string;
  stage: PRECONF_TX_STAGE;
  timestamp: number;
  blockNumber: number;
}) => {
  MockBasedlinerStore.update((store) => {
    const entry = store[address] || {
      rank: 0, // Will be recalculated
      address,
      'phase-1': null,
      'phase-2': null,
      total: null,
    };
    if (stage === PRECONF_TX_STAGE.INITIAL) {
      entry['phase-1'] = timestamp;
    }
    store[address] = entry;
    return store;
  });

  if (stage === PRECONF_TX_STAGE.FINAL) {
    const block = await getBlock(wagmiConfig, {
      blockNumber: BigInt(blockNumber),
    });
    const blockTime = block.timestamp * 1000n;

    MockBasedlinerStore.update((store) => {
      const entry = store[address];
      entry['phase-2'] = Number(blockTime);
      entry.total = (entry['phase-1'] as number) - (entry['phase-2'] as number);

      // Calculate total if both phases are set
      if (entry['phase-1'] !== null && entry['phase-2'] !== null) {
        entry.total = (entry['phase-1'] as number) - (entry['phase-2'] as number);
      } else {
        entry.total = null;
      }

      // Recalculate ranks
      const sorted = Object.values(store).sort((a, b) => (b.total ?? -Infinity) - (a.total ?? -Infinity));
      sorted.forEach((e, i) => {
        e.rank = i + 1;
      });

      // Rebuild store with updated ranks
      const newStore: typeof store = {};
      sorted.forEach((e) => {
        newStore[e.address] = e;
      });
      return newStore;
    });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { phase, stage, wallet, timestamp, blockNumber } = body;
  if (phase === null || stage === null || !wallet || (!timestamp && !blockNumber)) {
    console.error('Missing required fields:', {
      phase,
      stage,
      address: wallet,
      timestamp,
      blockNumber,
    });

    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }
  updateLeaderboard({ address: wallet, stage, timestamp, blockNumber });
  let leaderboard;
  MockBasedlinerStore.subscribe((v) => {
    leaderboard = v;
  })();
  return new Response(JSON.stringify({ leaderboard }), { status: 200 });
};
