import type { Address } from 'viem';

import { FactionNames } from '$lib/domains/nfts/types/badges/types';
import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import type { Movements } from '$lib/domains/profile/types/types';
import type { NftTypes } from '$lib/domains/profile/types/UserNFTs';

export enum TokenType {
  Unknown = 0,
  ERC721 = 721,
  ERC1155 = 1155,
}

export interface NFT {
  address: Address;
  tokenId: number;
  tokenUri: string;
  metadata: NFTMetadata;
  frozenAt?: number | null;
}

export interface TBBadge extends NFT {
  badgeId: number;
  movement: Movements;
  faction: FactionNames;
  tokenUri: string;
}

// export type Metadata = Record<string, string | number | boolean | undefined | TokenType>;

export interface BadgeDetails {
  badge: TBBadge | TBBadge[] | null;
  allBadges: TBBadge[] | NFT[] | null;
  total: number;
  faction: FactionNames | NftTypes;
}

export interface BadgesByMovement {
  [Movements.Devs]: BadgesByFaction;
  [Movements.Minnows]: BadgesByFaction;
  [Movements.Whales]: BadgesByFaction;
}

export interface BadgeDetailsByMovement {
  [Movements.Devs]: BadgeDetailsByFaction;
  [Movements.Minnows]: BadgeDetailsByFaction;
  [Movements.Whales]: BadgeDetailsByFaction;
}

export interface BadgeDetailsByFaction {
  [FactionNames.Ravers]: BadgeDetails;
  [FactionNames.Robots]: BadgeDetails;
  [FactionNames.Bouncers]: BadgeDetails;
  [FactionNames.Masters]: BadgeDetails;
  [FactionNames.Monks]: BadgeDetails;
  [FactionNames.Drummers]: BadgeDetails;
  [FactionNames.Androids]: BadgeDetails;
  [FactionNames.Shinto]: BadgeDetails;
}

export interface BadgesByFaction {
  [FactionNames.Ravers]: TBBadge[];
  [FactionNames.Robots]: TBBadge[];
  [FactionNames.Bouncers]: TBBadge[];
  [FactionNames.Masters]: TBBadge[];
  [FactionNames.Monks]: TBBadge[];
  [FactionNames.Drummers]: TBBadge[];
  [FactionNames.Androids]: TBBadge[];
  [FactionNames.Shinto]: TBBadge[];
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
