import { writable } from 'svelte/store';

import { browser } from '$app/environment';

// We make this global because we need to be able to
// open and close the modal from anywhere in the app
export const switchChainModal = writable<boolean>(false);

export const blacklistModal = writable<boolean>(false);

export const mintDisclaimerModal = writable<boolean>(false);

export function isMintDisclaimerAccepted() {
  return browser && localStorage.getItem('acceptedLegal') === 'true';
}

export function isSeason1EndModalAccepted() {
  return browser && localStorage.getItem('acceptedS1End') === 'true';
}

export const season1EndModal = writable<boolean>(!isSeason1EndModalAccepted());

export function acceptSeason1EndModal() {
  localStorage.setItem('acceptedS1End', 'true');
  season1EndModal.set(true);
}
