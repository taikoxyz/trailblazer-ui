export type UserProfile = {
  address: string;
  pointsHistory: UserPointHistoryPage;
  points: number;
  pointsToNextLevel: number;
  rank: string;
  leaderboardPosition: string;
  faction: UserFaction
  avatar?: string;
  name?: string;
  ens?: string;
  experience?: number;
  rankPercentile?: string;
  isLoading: boolean;
};

export type UserBooster = {
  title: string;
  boost: number;
  type: BoosterType;
  unlocked: boolean;
}

export type BoosterType = 'nft' | 'stake' | 'bridge';


export type UserFaction = {
  faction: Faction;
  boostedOrBased: BoostedOrBased;
}

// UserFactionBadge type extends UserFaction
export type UserFactionBadge = UserFaction & {
  unlocked: boolean;
}


export type Faction =
  "Ravers" |
  "Robots" |
  "Bouncers" |
  "Masters" |
  "Monks" |
  "Drummers" |
  "Androids" |
  "Shinto"


export type BoostedOrBased =
  "Boosted" |
  "Based"

export type UserTransaction = {
  activityName: string;
  points: number;
  date: Date;
}

export type UserPointHistoryPage = {
  items: UserPointHistory[],
  page: number,
  size: number,
  max_page: number,
  total_pages: number,
  total: number,
  last: number,
  first: number,
  visible: number
}

export type Event = "ETHBridged" | "ERC20Bridged" | "ERC721Bridged"

export type UserPointHistory = {
  address: string,
  event: Event,
  points: number,
  date: string
}
