import { default as AffectedMonkTokenIds } from '$generated/affected-monk-token-ids.json';
import type { TBBadge } from '$shared/types/NFT';

import { getCurrentSeasonEnd, SeasonEndToDateMap } from '../getCurrentSeasonEnd';

export const isBadgeLocked = (badge: TBBadge): boolean => {
  if (!badge.frozenUntil) {
    return false;
  }

  if (AffectedMonkTokenIds.includes(badge.tokenId)) {
    return badge.frozenUntil * 1000 >= SeasonEndToDateMap[3].getTime();
  }

  return badge.frozenUntil * 1000 >= getCurrentSeasonEnd();
};
