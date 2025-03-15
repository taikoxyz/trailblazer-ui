import { writable } from 'svelte/store';

import type { UserProfile } from '$lib/domains/profile/types/UserProfile';

export const userProfile = writable<UserProfile>();

export const pfpModal = writable<boolean>(false);
export const claimModal = writable<boolean>(false);

// Loading states
export const profileLoading = writable<boolean>(true);
export const multipliersLoading = writable<boolean>(true);
export const bonusLoading = writable<boolean>(true);
