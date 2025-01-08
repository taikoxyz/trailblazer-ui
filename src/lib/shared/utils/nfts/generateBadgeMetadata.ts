import { Movements, Seasons } from '$lib/domains/profile/types/types';

import getBadgeURI from './getBadgeURI';

export default function generateBadgeMetadata(
  season: Seasons,
  badgeId: number,
  movement?: Movements,
): Record<string, string | Seasons | Movements> {
  const uri = getBadgeURI(season, badgeId, movement || Movements.Devs);

  return {
    season,
    badgeId,
    movement: movement || Movements.Devs,
    image: `${uri}.png`,
    'video/mp4': `${uri}.mp4`,
    'video/webm': `${uri}.webm`,
  };
}
