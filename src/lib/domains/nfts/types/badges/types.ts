import type { IBadgeRecruitment } from '$lib/shared/types/BadgeRecruitment';

export enum FACTIONS {
  Ravers,
  Robots,
  Bouncers,
  Masters,
  Monks,
  Androids,
  Drummers,
  Shinto,
}
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

// return type for getRecruitmentStatus
export interface GetRecruitmentStatusResult {
  approvedTokenIds: number[];
  recruitments: IBadgeRecruitment[];
}
