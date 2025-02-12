import { writable } from 'svelte/store';

import type { ActiveRecruitment } from '$shared/types/BadgeRecruitment';
import type { TBBadge } from '$shared/types/NFT';

export const activeRecruitmentStore = writable<ActiveRecruitment[] | null>(null);
export const currentRecruitmentStore = writable<ActiveRecruitment | null>(null);
export const currentCycleStore = writable<number | null>(null);

export const influenceRecruitmentModal = writable<boolean>(false);
export const startRecruitmentModal = writable<boolean>(false);
export const recruitmentApprovalModal = writable<boolean>(false);
export const endRecruitmentModal = writable<boolean>(false);

export const badgeToRecruit = writable<TBBadge | null>(null);
