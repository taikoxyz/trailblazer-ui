import type { Address } from 'viem';

import type { FactionNames } from '$configs/badges';

export interface NFT {
  address: Address;
  tokenId: number;
  src: string;
  badgeId?: number;
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
