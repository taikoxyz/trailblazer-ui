import type { Address } from 'viem';

import { FactionNames } from '$lib/domains/nfts/types/badges/types';
import type { Movements } from '$lib/domains/profile/types/types';

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

export interface BadgesByMovement {
  [Movements.Devs]: BadgesByFaction;
  [Movements.Minnows]: BadgesByFaction;
  [Movements.Whales]: BadgesByFaction;
}

export interface BadgesByFaction {
  [FactionNames.Ravers]: NFT[];
  [FactionNames.Robots]: NFT[];
  [FactionNames.Bouncers]: NFT[];
  [FactionNames.Masters]: NFT[];
  [FactionNames.Monks]: NFT[];
  [FactionNames.Drummers]: NFT[];
  [FactionNames.Androids]: NFT[];
  [FactionNames.Shinto]: NFT[];
}

export interface Badge {
  [FactionNames.Ravers]: boolean;
  [FactionNames.Robots]: boolean;
  [FactionNames.Bouncers]: boolean;
  [FactionNames.Masters]: boolean;
  [FactionNames.Monks]: boolean;
  [FactionNames.Drummers]: boolean;
  [FactionNames.Androids]: boolean;
  [FactionNames.Shinto]: boolean;
}
