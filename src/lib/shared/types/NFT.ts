import type { Address } from 'viem';

import type { FactionNames } from '$configs/badges';
import type { Movements } from '$lib/domains/profile/types/types';

export interface NFT {
  address: Address;
  tokenId: number;
  tokenUri: string;
  badgeId?: number;
  erc?: number;
  movement?: Movements;
  assets: {
    image: string;
    // Record<type, src>
    video?: Record<string, string>;
  };
}

export interface IUserBadges {
  [FactionNames.Ravers]: boolean;
  [FactionNames.Robots]: boolean;
  [FactionNames.Bouncers]: boolean;
  [FactionNames.Masters]: boolean;
  [FactionNames.Monks]: boolean;
  [FactionNames.Drummers]: boolean;
  [FactionNames.Androids]: boolean;
  [FactionNames.Shinto]: boolean;
}
