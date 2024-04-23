// tokenInfoStore.ts
import { writable } from 'svelte/store';

import type { UserTransaction } from '$libs/profile';

export const userTransactions = writable<UserTransaction[]>([]);
