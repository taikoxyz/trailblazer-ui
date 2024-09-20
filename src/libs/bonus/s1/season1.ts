import { getAccount } from '@wagmi/core';
import axios from 'axios';
import { get } from 'svelte/store';
import type { Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import type { SeasonBonusPoints } from '$libs/profile';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { wagmiConfig } from '$libs/wagmi';
import { bonusLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

import type { SeasonBonusRewards } from '../types';

const log = getLogger('Season1BonusRewards');
class Season1BonusRewards implements SeasonBonusRewards {
  baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

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
      const previousSeasonPoints = { address, totalScore: 0 };
      try {
        const response = await axios.get(`${this.baseApiUrl}/user/rank`, {
          params: { address },
        });
        previousSeasonPoints.totalScore = response.data.totalScore;
        log('previousSeasonPoints', previousSeasonPoints);
        currentProfile.update((current) => {
          const updates: Partial<SeasonBonusPoints> = {};

          updates.seasonBonusPoints = Math.round(previousSeasonPoints.totalScore);
          const scaled = Math.round(previousSeasonPoints.totalScore * 0.7);
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
