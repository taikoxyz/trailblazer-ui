import type { NFT } from './NFT';

export interface BadgeMigration {
  id: string;
  s1Badge: NFT;
  s2Badge?: NFT;
  isStarted: boolean;
  isCompleted: boolean;
  pinkTampers: number;
  purpleTampers: number;
  claimExpirationTimeout: Date;
  tamperExpirationTimeout?: Date;
  isApproved: boolean;
}
