import { FactionNames, FACTIONS } from '$configs/badges';
import { MovementNames, Movements, Seasons } from '$lib/domains/profile/types/types';

export default function getBadgeURI(season: Seasons, badgeId: number, movement?: Movements) {
  if (!movement) {
    movement = Movements.Dev;
  }

  const movementStr = MovementNames[movement].toLowerCase();
  const factionStr = FactionNames[FACTIONS[badgeId] as FactionNames].toLowerCase();

  const uri = `/factions/s${season}/${factionStr}/${movementStr}`;
  return uri;
}
