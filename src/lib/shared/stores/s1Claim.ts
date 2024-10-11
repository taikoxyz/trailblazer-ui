import { readable } from 'svelte/store';

export const s1ClaimDate = readable<Date>(new Date(Date.UTC(2024, 9, 11, 23, 59, 59)));
