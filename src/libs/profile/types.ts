import type { Movements } from '$libs/badges/const';
import type { DomainNames } from '$libs/domain/types';

export type UserProfile = GalxePoints &
  DomainNames & {
    address: string;
    pointsHistory?: UserPointHistoryPage;
    score: number;
    pointsToNextLevel: number;
    rank: string;
    title: string;
    level: number;
    total: string;
    leaderboardPosition: string;
    faction: UserFaction;
    avatar?: string;
    name?: string;
    ens?: string;
    experience?: number;
    rankPercentile?: string;
    isLoading: boolean;
    movement: Movements;
  };

export type GalxePoints = {
  galxePoints?: number;
  trailblazerPoints?: number;
  galxePointsClaimed?: boolean;
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
  boostedOrBased: BoostedOrBased;
};

export type UserLevel = {
  level: number;
  title: string;
};

// UserFactionBadge type extends UserFaction
export type UserFactionBadge = UserFaction & {
  unlocked: boolean;
  claimable: boolean;
};

export type Faction = 'Ravers' | 'Robots' | 'Bouncers' | 'Masters' | 'Monks' | 'Drummers' | 'Androids' | 'Shinto';

export type BoostedOrBased = 'Boosted' | 'Based';

export type UserTransaction = {
  activityName: string;
  points: number;
  date: Date;
};

export type UserPointHistoryPage = {
  items: UserPointHistory[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type Event = 'Transaction' | 'TransactionValue' | 'BlockProposed' | 'Bridged';

export type UserPointHistory = {
  address: string;
  event: Event;
  points: number;
  date: number;
};
