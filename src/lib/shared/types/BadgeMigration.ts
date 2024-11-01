import type { NFT } from './NFT';

export enum MigrationStatus {
  ELIGIBLE = 'ELIGIBLE',
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  CAN_REFINE = 'CAN_REFINE',
  CAN_CLAIM = 'CAN_CLAIM',
  COMPLETED = 'COMPLETED',
}

export interface IBadgeMigration {
  id: string;
  badgeId: number;
  status: MigrationStatus;
  s1Badge: NFT;
  s2Badge?: NFT;
  whaleTampers: number;
  minnowTampers: number;
  claimExpirationTimeout: Date;
  tamperExpirationTimeout?: Date;
}
