import type { Address } from 'viem';

export type DomainResponse = {
  zns: string;
  dotTaiko: string;
  address: Address;
};

export type DomainNames = {
  selected?: DomainType;
  dotTaiko?: string;
  zns?: string;
};

export enum DomainType {
  ADDRESS = 'ADDRESS',
  DOTTAIKO = 'DOTTAIKO',
  ZNS = 'ZNS',
}

export type GalxePoints = {
  galxePoints?: number;
  trailblazerPoints?: number;
  galxePointsClaimed?: boolean;
};

export type UserNFT = {
  name: string;
  tokenId: string;
  badgeId?: string;
  uri?: string;
  explorerLink?: string;
};

export type UserMultiplier = {
  totalMultiplier: number;
  taikoonMultiplier: number;
  factionMultiplier: number;
  snaefellMultiplier: number;
};

export type UserBooster = {
  title: string;
  boost: number;
  type: BoosterType;
  unlocked: boolean;
};

export type BoosterType = 'nft' | 'stake' | 'bridge';

export type UserFaction = {
  faction: Faction;
  minnorOrWhale: MinnowOrWhale;
};

export type UserLevel = {
  level: string;
  title: string;
};

export type UserFactionBadge = UserFaction & {
  unlocked: boolean;
  claimable: boolean;
};

export type Faction = 'Ravers' | 'Robots' | 'Bouncers' | 'Masters' | 'Monks' | 'Drummers' | 'Androids' | 'Shinto';

export type MinnowOrWhale = 'Minnow' | 'Whale';

export enum Movements {
  Dev, // Neutral
  Whale, // Based, pink
  Minnow, // Boosted, purple
}

export const MovementNames: string[] = Object.keys(Movements).filter((key) => isNaN(Number(key)));

export enum Seasons {
  Season1 = 1,
  Season2 = 2,
}
