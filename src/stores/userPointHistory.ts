// tokenInfoStore.ts
import { MOCK_USER_POINT_HISTORY } from 'src/tests/mocks/userPointHistory';
import { writable } from 'svelte/store';

import type { UserPointHistory } from '$libs/profile';

export const userPointHistory = writable<UserPointHistory[]>(MOCK_USER_POINT_HISTORY);
