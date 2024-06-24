import { getAccount } from '@wagmi/core';
import axios from 'axios';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { web3modal } from '$libs/connect';
import type { GalxePoints } from '$libs/profile';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { wagmiConfig } from '$libs/wagmi';
import { galxeLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';
import type { IChainId } from '$types';

import { readClaimGalxePointsAlreadyRegistered, writeClaimGalxePointsRegister } from '../../generated/abi';
import type { GalxePointsResponse } from './types';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export class Galxe {
  static async checkClaimed() {
    const account = getAccount(wagmiConfig);

    if (!account.address) {
      throw new Error('Address not found');
    }

    const { selectedNetworkId } = web3modal.getState();
    if (!selectedNetworkId) {
      throw new Error('Network not found');
    }

    const chainId = selectedNetworkId as IChainId;

    const isClaimed = await readClaimGalxePointsAlreadyRegistered(wagmiConfig, { args: [account.address], chainId });
    currentProfile.update((current) => {
      return { ...current, galxePointsClaimed: isClaimed };
    });
  }
  static async claim() {
    await writeClaimGalxePointsRegister(wagmiConfig, {});
  }

  static async getPoints(address?: string) {
    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      let galxePoints: GalxePointsResponse = { address, value: 0 };
      try {
        const response = await axios.get(`${baseApiUrl}/user/galxe`, {
          params: { address },
        });
        galxePoints = response.data as GalxePointsResponse;
      } catch (e) {
        console.warn(e);
      }
      // Safely update the currentProfile with galxePoints details
      currentProfile.update((current) => {
        const updates: Partial<GalxePoints> = {};

        updates.galxePoints = galxePoints.value;
        updates.trailblazerPoints = galxePoints.value * 35;

        return { ...current, ...updates };
      });
    }
  }
  static async refreshData() {
    await Promise.all([this.getPoints(), this.checkClaimed()]);
    galxeLoading.set(false);
  }
}
