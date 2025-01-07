import { writable } from 'svelte/store';

import { ClaimStates } from '$lib/domains/profile/components/ProfileRewardClaim/types';

export const isLoading = writable(false);
export const currentStep = writable(ClaimStates.START);
export const claimAmount = writable<number>(-1);
export const claimLabel = writable<string>('');
export const claimProof = writable<string>('');
export const isClaimSuccessful = writable(false);
export const isBlacklisted = writable<boolean>(false);
export const isSelfProfile = writable<boolean>(false);
