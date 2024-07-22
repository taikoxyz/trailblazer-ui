export enum FACTIONS {
  Ravers,
  Robots,
  Bouncers,
  Masters,
  Drummers,
  Androids,
  Monks,
  Shinto,
}

import { PUBLIC_MAX_BADGE_ID } from '$env/static/public';

export const maxBadgeId = parseInt(PUBLIC_MAX_BADGE_ID, 10);

export enum FactionNames {
  Ravers = 'Ravers',
  Robots = 'Robots',
  Bouncers = 'Bouncers',
  Masters = 'Masters',
  Drummers = 'Drummers',
  Androids = 'Androids',
  Monks = 'Monks',
  Shinto = 'Shinto',
}
