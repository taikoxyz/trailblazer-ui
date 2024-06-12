import { getAccount } from '@wagmi/core';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import type { GalxePoints } from '$libs/profile';
import { wagmiConfig } from '$libs/wagmi';
import { galxeLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

import { readClaimGalxePointsAlreadyRegistered, writeClaimGalxePointsRegister } from '../../generated/abi';
import type { GalxePointsResponse } from './types';

export class Galxe {
  static async checkClaimed() {
    const account = getAccount(wagmiConfig);

    if (!account.address) {
      throw new Error('Address not found');
    }

    const isClaimed = await readClaimGalxePointsAlreadyRegistered(wagmiConfig, { args: [account.address] });
    currentProfile.update((current) => {
      return { ...current, galxePointsClaimed: isClaimed };
    });
  }
  static async claim() {
    const tx = await writeClaimGalxePointsRegister(wagmiConfig, {});
  }

  static async getPoints(address?: string) {
    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      // TOOO: Update this
      const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/api/galxe?address=${address}`);
      // const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?user=0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`)
      const galxePoints: GalxePointsResponse = (await response.json()) as GalxePointsResponse;
      console.log('🚀 | Galxe | getPoints | galxePoints:', galxePoints);
      // Safely update the currentProfile with galxePoints details
      currentProfile.update((current) => {
        const updates: Partial<GalxePoints> = {};

        updates.trailblazerPoints = galxePoints.value;

        return { ...current, ...updates };
      });
    }
  }
  static async refreshData() {
    await Promise.all([this.getPoints(), this.checkClaimed()]);
    galxeLoading.set(false);
  }
}
