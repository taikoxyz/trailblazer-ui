import axios from 'axios';
import type { Address } from 'viem';

import { FactionNames } from '$configs/badges';
import { getTokenId } from '$libs/badges/getTokenId';
import { getUserBadges } from '$libs/badges/getUserBadges';
import { chainId } from '$libs/chain';
import Taikoon from '$libs/taikoon';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

import { taikoonTokenAddress, trailblazersBadgesAddress } from '../../generated/abi';
import type { IPfp } from './types';

function getS1BadgeURI(badgeId: number): string {
  const s1Badges = [
    '/factions/ravers/neutral.png',
    '/factions/robots/neutral.png',
    '/factions/bouncers/neutral.png',
    '/factions/masters/neutral.png',
    '/factions/monks/neutral.png',
    '/factions/androids/neutral.png',
    '/factions/drummers/neutral.png',
    '/factions/shinto/neutral.png',
  ];
  return s1Badges[badgeId];
}

async function getUserTaikoons(address: Address): Promise<IPfp[]> {
  const tokenIds = await Taikoon.tokenOfOwner(address);
  const out: IPfp[] = [];
  for (const tokenId of tokenIds) {
    const uri = await Taikoon.tokenURI(tokenId);

    const metadata = await axios({
      url: isDevelopmentEnv ? `/api/proxy?url=${uri}` : uri,
    });

    const src = metadata.data.image;
    out.push({
      address: taikoonTokenAddress[chainId],
      tokenId,
      src,
    } satisfies IPfp);
  }

  return out;
}

async function getUserS1Badges(address: Address): Promise<IPfp[]> {
  const balances = await getUserBadges(address);
  const out: IPfp[] = [];
  let badgeId = 0;

  for (const badgeName in balances) {
    if (balances[badgeName as FactionNames]) {
      const tokenId = await getTokenId(address, badgeId);
      out.push({
        address: trailblazersBadgesAddress[chainId],
        src: getS1BadgeURI(badgeId),
        tokenId,
      } satisfies IPfp);
    }
    badgeId += 1;
  }

  return out;
}

export default async function getUserNFTs(address: Address): Promise<IPfp[]> {
  const taikoons = await getUserTaikoons(address);
  const s1Badges = await getUserS1Badges(address);

  return [...taikoons, ...s1Badges];
}
