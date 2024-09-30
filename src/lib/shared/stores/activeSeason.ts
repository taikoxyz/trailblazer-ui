import { writable } from 'svelte/store';

import { PUBLIC_ACTIVE_SEASON } from '$env/static/public';

export const activeSeason = writable<number>(parseInt(PUBLIC_ACTIVE_SEASON) || 1);
