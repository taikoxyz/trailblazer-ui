import { getAccount } from '@wagmi/core';
import { get } from 'svelte/store';
import type { Address } from 'viem';

import { getUserPointsAndRank } from '$libs/api/endpoints/user/user';
import type { SeasonBonusPoints } from '$libs/profile';
import { getLogger } from '$libs/util/logger';
import { wagmiConfig } from '$libs/wagmi';
import { bonusLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

import type { SeasonBonusRewards } from '../types';

const log = getLogger('Season1BonusRewards');
class Season1BonusRewards implements SeasonBonusRewards {
  async refreshData(): Promise<void> {
    bonusLoading.set(true);
    await Promise.all([this.updatePoints(), this.checkClaimStatus()]);
    bonusLoading.set(false);
  }

  async checkClaimStatus(): Promise<boolean> {
    const account = getAccount(wagmiConfig);

    if (!account.address) {
      throw new Error('Address not found');
    }

    try {
      //TODO: Implement this

      // const response = await axios.get(`${baseApiUrl}/s2/user/rewards/claimed`, {
      //   params: { address },
      // });
      // hasClaimed = response.data as BonusPointsResponse;
      const hasClaimed = false;
      currentProfile.update((current) => {
        return { ...current, bonusPointsClaimed: hasClaimed };
      });

      return false;
    } catch (e) {
      console.warn(e);
    }
    return false;
  }

  async updatePoints(address?: Address): Promise<void> {
    bonusLoading.set(true);
    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      try {
        const { score: baseScore } = await getUserPointsAndRank({ address, season: 1 });

        log('previousSeasonPoints', baseScore);
        currentProfile.update((current) => {
          const updates: Partial<SeasonBonusPoints> = {};

          updates.seasonBonusPoints = Math.round(baseScore);
          const scaled = Math.round(baseScore * 0.7);
          // cap to 150k if it is higher than 150k otherwise keep the value
          const capped = Math.min(scaled, 150000);
          updates.trailblazerPoints = capped;

          return { ...current, ...updates };
        });
        log('currentProfile', get(currentProfile));
      } catch (e) {
        console.error(e);
      }
    }
    bonusLoading.set(false);
  }

  async claim(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const Season1Bonus: SeasonBonusRewards = new Season1BonusRewards();
