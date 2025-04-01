import type { TBBadge } from '$shared/types/NFT';

import { getLastSeasonEnd } from '../getCurrentSeasonEnd';

export const isBadgeLocked = (badge: TBBadge): boolean => {
  if (!badge.frozenAt) {
    return false;
  }

  return badge.frozenAt * 1000 >= getLastSeasonEnd();
};
