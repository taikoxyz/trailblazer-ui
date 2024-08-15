import { writable } from 'svelte/store';

import { leaderboardConfig } from '$config';
import type {
  BridgeData,
  BridgeLeaderboardTotal,
  DappLeaderboardPage,
  DefiDappLeaderboardPage,
  DefiDappLeaderboardRow,
  UserLeaderboardPage,
} from '$libs/leaderboard/types';

// Dapp Leaderboard
export const currentDappLeaderboard = writable<DappLeaderboardPage>({
  items: [],
  lastUpdated: 0,
});

export const setDappLeaderboard = (leaderboard: DappLeaderboardPage) => {
  currentDappLeaderboard.update((store) => {
    store = leaderboard;
    store.items = leaderboard.items.filter((item) => !!item.address);
    return store;
  });
};

export const setDappLeaderboardLastUpdated = (lastUpdated: number) => {
  currentDappLeaderboard.update((store) => {
    store.lastUpdated = lastUpdated;
    return store;
  });
};

// User Leaderboard
export const setUserLeaderboard = (leaderboard: UserLeaderboardPage) => {
  // currentUserLeaderboard.update((store) => {
  //   store = leaderboard;
  //   store.items = leaderboard.items
  //     .filter((item) => !!item.address)
  //     .map((item) => ({ ...item, score: +item.score.toFixed(1) }));
  //   return store;
  // });

  currentUserLeaderboard.set(leaderboard);
};

export const currentUserLeaderboard = writable<UserLeaderboardPage>({
  items: [],
  totalUsers: 0,
  lastUpdated: 0,
});

// Bridge Leaderboard
export const setBridgeLeaderboard = (leaderboard: BridgeData[]) => {
  currentBridgeLeaderboard.update((store) => {
    store.items = leaderboard;
    return store;
  });
};

export const currentBridgeLeaderboard = writable<BridgeLeaderboardTotal>({
  items: [],
  page: 0,
  size: leaderboardConfig.pageSize,
  max_page: 0,
  total_pages: 0,
  total: 0,
  last: 1,
  first: 0,
  visible: 0,
});

// DeFi Leaderboard
export const currentDefiDappLeaderboard = writable<DefiDappLeaderboardPage>({
  protocols: [],
  lastUpdated: 0,
});

export const setDefiDappLeaderboardProtocols = (leaderboard: DefiDappLeaderboardRow[]) => {
  currentDefiDappLeaderboard.update((store) => {
    store.protocols = leaderboard;
    return store;
  });
};

export const setDefiDappLeaderboardLastUpdated = (lastUpdated: number) => {
  currentDefiDappLeaderboard.update((store) => {
    store.lastUpdated = lastUpdated;
    return store;
  });
};
