import { getAccount } from '@wagmi/core';

import { PUBLIC_ENV, PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { web3modal } from '$libs/connect';
import type { GalxePoints } from '$libs/profile';
import { wagmiConfig } from '$libs/wagmi';
import { galxeLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';
import type { IChainId } from '$types';

import { readClaimGalxePointsAlreadyRegistered, writeClaimGalxePointsRegister } from '../../generated/abi';
import type { GalxePointsResponse } from './types';

const baseApiUrl = PUBLIC_ENV === 'development' ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

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
      // TOOO: Update this
      const response = await fetch(`${baseApiUrl}/api/galxe?address=${address}`);
      // const response = await fetch(`${baseApiUrl}/user?user=0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`)
      const galxePoints: GalxePointsResponse = (await response.json()) as GalxePointsResponse;
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
