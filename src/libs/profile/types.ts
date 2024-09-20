import type { Movements } from '$libs/badges/const';
import type { DomainNames } from '$libs/domain/types';

export type GraphQLResponse = {
  loading: boolean;
  networkStatus: number;
};

export type UserProfileGQL = GraphQLResponse & {
  data: {
    owner: {
      __typename: 'Owner';
      id: string;
      totalMultiplier: string;
      factionMultiplier: string;
      snaefellMultiplier: string;
      taikoonMultiplier: string;
      ownedTokens: {
        __typename: 'Token';
        contract: {
          __typename: 'Contract';
          name: string;
        };
        id: string;
        tokenId: string;
        badgeId: string | null;
        uri: string;
      }[];
    };
  };
};

export type UserProfile = SeasonBonusPoints &
  GalxePoints &
  DomainNames & {
    address: string;
    pointsHistory?: UserPointHistoryPage;
    score: number;
    boostedPoints: string;
    pointsToNextLevel: number;
    rank: string;
    title: string;
    level: string;
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
    multipliers: UserMultiplier;
    nfts: UserNFT[];
  };

export type GalxePoints = {
  galxePoints?: number;
  trailblazerPoints?: number;
  galxePointsClaimed?: boolean;
};

export type SeasonBonusPoints = {
  seasonBonusPoints?: number;
  trailblazerPoints?: number;
  bonusPointsClaimed?: boolean;
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
  level: string;
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
export type ActivityType = Event;

export type UserPointHistory = {
  address: string;
  event: Event;
  points: number;
  date: number;
  multiplier: number;
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
