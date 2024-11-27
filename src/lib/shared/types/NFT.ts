import type { Address } from 'viem';

import type { FactionNames } from '$lib/domains/nfts/types/badges/types';

export enum TokenType {
  Unknown = 0,
  ERC721 = 721,
  ERC1155 = 1155,
}

export interface NFT {
  address: Address;
  tokenId: number;
  tokenUri: string;
  metadata: Record<string, string | number | boolean | undefined | TokenType>;
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
