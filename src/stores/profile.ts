// tokenInfoStore.ts
import { writable } from 'svelte/store';

import type { UserProfile } from '$libs/profile';
import { MOCK_PROFILE } from '$mocks';

export const currentProfile = writable<UserProfile>(MOCK_PROFILE);
