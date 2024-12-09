import { writable } from 'svelte/store';

import type { IBadgeRecruitment } from '$shared/types/BadgeRecruitment';

export const activeRecruitment = writable<IBadgeRecruitment | null>(null);

export const influenceRecruitmentModal = writable<boolean>(false);
export const startRecruitmentModal = writable<boolean>(false);
export const recruitmentApprovalModal = writable<boolean>(false);
export const endRecruitmentModal = writable<boolean>(false);
export const freeRecruitmentModal = writable<boolean>(true);
