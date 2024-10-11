import { readable } from 'svelte/store';

export const s1ClaimDate = readable<Date>(new Date('2024-10-11:23:59:59Z'));
