import type { FactionNames } from '$lib/domains/nfts/types/badges/types';
import type { NFT } from '$lib/shared/types/NFT';

export type UserNFTs = {
  nfts: NFT[];
};

export enum NftTypes {
  TAIKOON,
  BADGE,
  SNAEFELL,
}

export type BadgeType = {
  faction: keyof typeof FactionNames | 'taikoon' | 'snaefell';
  badge: NFT | NFT[] | null;
  total: number;
};
