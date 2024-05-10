// tokenInfoStore.ts
import { writable } from 'svelte/store';

import type { UserPointHistory } from '$libs/profile';
import { MOCK_USER_POINT_HISTORY } from '$mocks';

export const userPointHistory = writable<UserPointHistory[]>(MOCK_USER_POINT_HISTORY);
