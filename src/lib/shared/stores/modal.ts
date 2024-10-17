import { writable } from 'svelte/store';

import { browser } from '$app/environment';

// We make this global because we need to be able to
// open and close the modal from anywhere in the app
export const switchChainModal = writable<boolean>(false);

export const mintDisclaimerModal = writable<boolean>(false);

export function isMintDisclaimerAccepted() {
  return browser && localStorage.getItem('acceptedLegal') === 'true';
}

export const tamperMigrationModal = writable<boolean>(false);
export const startMigrationModal = writable<boolean>(false);
export const migrationApprovalModal = writable<boolean>(false);
export const endMigrationModal = writable<boolean>(false);

export const blacklistModal = writable<boolean>(false);
