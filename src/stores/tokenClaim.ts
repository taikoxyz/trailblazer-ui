import { writable } from 'svelte/store';

export const tokenClaimAmount = writable<number>(0);

export const tokenClaimTermsAccepted = writable<boolean>(false);
