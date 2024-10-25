import { FactionNames, FACTIONS } from '$configs/badges';
import { MovementNames, Movements } from '$lib/domains/profile/types/types';

export default function getBadgeURI(badgeId: number, movement?: Movements) {
  if (!movement) {
    movement = Movements.Dev;
  }

  const movementStr = MovementNames[movement].toLowerCase();
  const factionStr = FactionNames[FACTIONS[badgeId] as FactionNames].toLowerCase();

  const uri = `/factions/${factionStr}/${movementStr}`;
  return uri;
}
