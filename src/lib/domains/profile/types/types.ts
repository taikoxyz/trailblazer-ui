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
  Devs, // Unused
  Whales, // Based, pink
  Minnows, // Boosted, purple

  // Dev, // s1
}

export const Multipliers = {
  [Movements.Devs]: 0.05,
  [Movements.Whales]: 0.05,
  [Movements.Minnows]: 0.05,
  taikoon: 1,
  snaefell: 0.1,
};

export const MovementNames: string[] = Object.keys(Movements).filter((key) => isNaN(Number(key)));

export const getMovementName = (movementId: Movements): string =>
  MovementNames[movementId] || MovementNames[Movements.Devs];

export enum Seasons {
  Season1 = 1,
  Season2 = 2,
}
