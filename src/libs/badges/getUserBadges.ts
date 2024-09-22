import type { Address } from 'viem';

import { FactionNames, FACTIONS } from '$configs/badges';
import { fetchUserBadges } from '$libs/graphql/services/userService';

import type { IUserBadges } from './types';

/**
 * Processes raw Account data into a structured IUserBadges format.
 * @param address - The Address type identifier.
 * @returns A Promise resolving to IUserBadges.
 */
export async function getUserBadges(address: Address): Promise<IUserBadges> {
  const out: IUserBadges = {
    [FactionNames.Ravers]: false,
    [FactionNames.Robots]: false,
    [FactionNames.Bouncers]: false,
    [FactionNames.Masters]: false,
    [FactionNames.Monks]: false,
    [FactionNames.Drummers]: false,
    [FactionNames.Androids]: false,
    [FactionNames.Shinto]: false,
  };

  try {
    // Fetch raw data using the service function
    const account = await fetchUserBadges(address);

    if (!account || !account.s1Badges) {
      // Account does not exist or has no badges, return default
      return out;
    }

    const { s1Badges } = account;

    // Process each badge and update the output accordingly
    s1Badges.forEach((badge) => {
      const currentBadgeId = parseInt(badge.badgeId);
      const factionName = Object.values(FactionNames)[currentBadgeId];

      if (factionName && Object.values(FACTIONS).includes(currentBadgeId)) {
        out[factionName] = true;
      }
    });

    return out;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message.includes('graphqlResponse.data.account is null')) {
      // Account does not exist, return default
      return out;
    }
    // Re-throw other unexpected errors
    throw error;
  }
}
