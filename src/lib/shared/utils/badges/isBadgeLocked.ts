import type { TBBadge } from '$shared/types/NFT';

import { getLastSeasonEnd, SEASON_4_PATCH_DATE, SeasonEndToDateMap } from '../getCurrentSeasonEnd';

export const isBadgeLocked = (badge: TBBadge): boolean => {
  if (!badge.frozenAt) {
    return false;
  }

  if (
    badge.badgeId === 4 &&
    badge.frozenAt * 1000 >= SeasonEndToDateMap[3].getTime() &&
    badge.frozenAt * 1000 < SEASON_4_PATCH_DATE
  ) {
    return false;
  }

  return badge.frozenAt * 1000 >= getLastSeasonEnd();
};
