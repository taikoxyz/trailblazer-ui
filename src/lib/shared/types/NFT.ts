import type { Address } from 'viem';

import type { FactionNames } from '$configs/badges';
import type { Movements } from '$lib/domains/profile/types/types';

export interface NFT {
  address: Address;
  tokenId: number;
  tokenUri: string;
  src: string;
  badgeId?: number;
  erc?: number;
  movement?: Movements;
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
