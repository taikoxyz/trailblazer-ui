import type { PaginationInfo, UnifiedLeaderboardRow } from '../leaderboard/types/shared/types';

export enum PRECONF_CAMPAIGN_PHASE {
  BEFORE = 1,
  AFTER = 2,
}

export enum PRECONF_TX_STAGE {
  INITIAL = 1,
  FINAL = 2,
}

export enum PRECONF_EVENT {
  BASEDLINER = 1,
}

export type BasedlinerLeaderboardPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};
