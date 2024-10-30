import type { NFT } from './NFT';

export enum MigrationStatus {
  ELIGIBLE = 'ELIGIBLE',
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  CAN_REFINE = 'CAN_REFINE',
  CAN_CLAIM = 'CAN_CLAIM',
  COMPLETED = 'COMPLETED',
}

export interface ActiveBadgeMigration {
  id: string;
  badgeId: number;
  status: MigrationStatus;
  s1Badge: NFT;
  s2Badge?: NFT;
  //isStarted: boolean;
  //isCompleted: boolean;
  devTampers: number;
  whaleTampers: number;
  minnowTampers: number;
  claimExpirationTimeout: Date;
  tamperExpirationTimeout?: Date;
}
