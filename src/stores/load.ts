import { writable } from 'svelte/store';

export const galxeLoading = writable<boolean>(true);
export const domainLoading = writable<boolean>(true);
export const profileLoading = writable<boolean>(true);
