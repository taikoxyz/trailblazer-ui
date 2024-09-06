import { writable } from 'svelte/store';
import type { Address } from 'viem';

import { FactionNames } from '$configs/badges';
import { chainId } from '$libs/chain';

import { trailblazersBadgesAddress } from '../generated/abi';

export interface INftStore {
  season1: {
    address: Address;
    balances: Record<FactionNames, number>;
  };
}

export const nftStore = writable<INftStore>({
  season1: {
    address: trailblazersBadgesAddress[chainId],
    balances: {
      [FactionNames.Ravers]: -1,
      [FactionNames.Robots]: -1,
      [FactionNames.Bouncers]: -1,
      [FactionNames.Masters]: -1,
      [FactionNames.Monks]: -1,
      [FactionNames.Drummers]: -1,
      [FactionNames.Androids]: -1,
      [FactionNames.Shinto]: -1,
    },
  },
} satisfies INftStore);
