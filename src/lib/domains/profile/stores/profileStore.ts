import { writable } from 'svelte/store';

import type { UserProfile } from '../types/UserProfile';

export const userProfile = writable<UserProfile>();
export const profileLoading = writable<boolean>(true);
export const multipliersLoading = writable<boolean>(true);
