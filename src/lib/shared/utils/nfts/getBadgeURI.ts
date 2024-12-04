import { FactionNames } from '$lib/domains/nfts/types/badges/types';
import { MovementNames, Movements, Seasons } from '$lib/domains/profile/types/types';

export default function getBadgeURI(season: Seasons, badgeId: number, movement?: Movements) {
  if (!movement) {
    movement = Movements.Dev;
  }

  const movementStr = MovementNames[movement].toLowerCase();
  const factionStr = Object.values(FactionNames)[badgeId].toLowerCase();

  const uri = `/factions/${factionStr}/${movementStr}`;
  return uri;
}
