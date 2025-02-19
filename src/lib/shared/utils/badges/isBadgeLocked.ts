import type { TBBadge } from '$shared/types/NFT';
import { getCurrentSeasonEnd } from '../getCurrentSeasonEnd';

export const isBadgeLocked = (badge: TBBadge): boolean => {
  if (!badge.frozenUntil) {
    return false;
  }
  if (badge.frozenUntil * 1000 >= getCurrentSeasonEnd()) {
    return true;
  }
  return false;
};
