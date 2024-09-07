import type { Address } from 'viem';

export interface IBadgeChampionsParticipant {
  //   "[ownerAddress]:[contractId]:[tokenId]:[tournamentId]"
  id: string;
  contract: Address;
  tokenId: number;
  owner: Address;
  leagueId: number;
  color: 'neutral' | 'pink' | 'purple';
  power: number;
  points: number;
  badgeId: number;
}

export interface IBadgeChampionsMatchParticipant {
  id: string;
  owner: Address;
  battler: IBadgeChampionsParticipant;
  power: number;
  energy: number;
  totalPower: number;
  points: number;
  isWinner: boolean;
}

export interface IBadgeChampionsMatch {
  //"[tournamentSeed]:[round]:[match]"
  id: string;
  participants: IBadgeChampionsMatchParticipant[];
}

export interface IBadgeChampionsGameResult {
  gameId: number;
  seed: number;
  participants: IBadgeChampionsParticipant[];
  rounds: IBadgeChampionsMatch[][];
}
