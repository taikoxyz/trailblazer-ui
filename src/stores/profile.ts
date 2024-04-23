// tokenInfoStore.ts
import { MOCK_PROFILE } from 'src/tests/mocks/profile';
import { writable } from 'svelte/store';

import type { UserProfile } from '$libs/profile';

export const currentProfile = writable<UserProfile>(MOCK_PROFILE);
