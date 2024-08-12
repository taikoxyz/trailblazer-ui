import { writable } from 'svelte/store';

import type { DappLeaderboardPage } from '$libs/leaderboard';

export const currentGamingLeaderboard = writable<DappLeaderboardPage>({
  items: [],
  lastUpdated: 0,
});

export const setGamingLeaderboard = (leaderboard: DappLeaderboardPage) => {
  currentGamingLeaderboard.update((store) => {
    store = leaderboard;
    store.items = leaderboard.items.filter((item) => !!item.address);
    return store;
  });
};

export const setGamingLeaderboardLastUpdated = (lastUpdated: number) => {
  currentGamingLeaderboard.update((store) => {
    store.lastUpdated = lastUpdated;
    return store;
  });
};
