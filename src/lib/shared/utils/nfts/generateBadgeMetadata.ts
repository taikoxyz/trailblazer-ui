import { Movements } from '$lib/domains/profile/types/types';

import getBadgeURI from './getBadgeURI';

export default function generateBadgeMetadata(
  badgeId: number,
  movement?: Movements,
): Record<string, string | Movements> {
  const uri = getBadgeURI(badgeId, movement || Movements.Dev);

  return {
    badgeId,
    movement: movement || Movements.Dev,
    image: `${uri}.png`,
    'video/mp4': `${uri}.mp4`,
    'video/webm': `${uri}.webm`,
  };
}
