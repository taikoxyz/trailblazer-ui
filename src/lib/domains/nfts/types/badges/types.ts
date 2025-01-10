import { PUBLIC_MAX_BADGE_ID } from '$env/static/public';
import type { IBadgeRecruitment } from '$lib/shared/types/BadgeRecruitment';

export const maxBadgeId = parseInt(PUBLIC_MAX_BADGE_ID, 10);

export enum FactionNames {
  Ravers = 'Ravers',
  Robots = 'Robots',
  Bouncers = 'Bouncers',
  Masters = 'Masters',
  Monks = 'Monks',
  Androids = 'Androids',
  Drummers = 'Drummers',
  Shinto = 'Shinto',
}

export const getFactionName = (badgeId: number): FactionNames | undefined => {
  const badgeIdToFaction: Record<number, FactionNames> = {
    0: FactionNames.Ravers,
    1: FactionNames.Robots,
    2: FactionNames.Bouncers,
    3: FactionNames.Masters,
    4: FactionNames.Monks,
    5: FactionNames.Androids,
    6: FactionNames.Drummers,
    7: FactionNames.Shinto,
  };

  return badgeIdToFaction[badgeId];
};

// return type for getRecruitmentStatus
export interface GetRecruitmentStatusResult {
  approvedTokenIds: number[];
  recruitments: IBadgeRecruitment[];
}
