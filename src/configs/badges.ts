export enum FACTIONS {
  Ravers,
  Robots,
  Bouncers,
  Masters,
  Monks,
  Drummers,
  Androids,
  Shinto,
}

import { PUBLIC_MAX_BADGE_ID } from '$env/static/public';

export const maxBadgeId = parseInt(PUBLIC_MAX_BADGE_ID, 10);

export enum FactionNames {
  Ravers = 'Ravers',
  Robots = 'Robots',
  Bouncers = 'Bouncers',
  Masters = 'Masters',
  Monks = 'Monks',
  Drummers = 'Drummers',
  Androids = 'Androids',
  Shinto = 'Shinto',
}
