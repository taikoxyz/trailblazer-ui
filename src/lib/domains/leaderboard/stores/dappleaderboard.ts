import { writable } from 'svelte/store';

import type { DappLeaderboardPage } from '../types/dapps/types';

export const currentDappLeaderboard = writable<DappLeaderboardPage>();
