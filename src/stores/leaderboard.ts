// tokenInfoStore.ts
import { writable } from 'svelte/store';

import type { LeaderboardPage } from '$libs/leaderboard/types';

export const currentLeaderboard = writable<LeaderboardPage>({
  items: [],
  page: 0,
  size: 20,
  max_page: 0,
  total_pages: 0,
  total: 0,
  last: 1,
  first: 0,
  visible: 0,
});

export const currentUserLeaderboard = writable<LeaderboardPage>({
  items: [],
  page: 0,
  size: 20,
  max_page: 0,
  total_pages: 0,
  total: 0,
  last: 1,
  first: 0,
  visible: 0,
});

export const setLeaderboard = (leaderboard: LeaderboardPage) => {
  currentLeaderboard.update((store) => {
    store = leaderboard;
    store.items = leaderboard.items.filter(item => !!item.address)
    return store;
  });
};

export const setUserLeaderboard = (leaderboard: LeaderboardPage) => {
  currentUserLeaderboard.update((store) => {
    store = leaderboard;
    store.items = leaderboard.items.filter(item => !!item.address).map(item => ({...item, score: +item.score.toFixed(1) }))
    return store;
  });
};