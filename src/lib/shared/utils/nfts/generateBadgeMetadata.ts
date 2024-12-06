import { Movements, Seasons } from '$lib/domains/profile/types/types';

import getBadgeURI from './getBadgeURI';

export default function generateBadgeMetadata(
  season: Seasons,
  badgeId: number,
  movement?: Movements,
): Record<string, string | Seasons | Movements> {
  const uri = getBadgeURI(season, badgeId, movement || Movements.Dev);

  return {
    season,
    badgeId,
    movement: movement || Movements.Dev,
    image: `${uri}.png`,
    'video/mp4': `${uri}-sm.mp4`,
    'video/webm': `${uri}-sm.webm`,
  };
}
