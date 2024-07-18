import { getAccount } from '@wagmi/core';
import type { DomainNames } from '$libs/profile';
import { wagmiConfig } from '$libs/wagmi';
import { domainLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

export class Domain {
  static async getDotTaiko(address?: string) {
    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      currentProfile.update((current) => {
        const updates: Partial<DomainNames> = {};

        updates.dotTaiko = 'trailblazers.taiko';
        updates.zns = 'trailblazers.🥁';

        return { ...current, ...updates };
      });
    }
  }
  static setSelectedDomain(selectedDomain: string) {
    currentProfile.update((current) => {
      const updates: Partial<DomainNames> = {};

      updates.selected = selectedDomain;

      return { ...current, ...updates };
    });
  }
  static async getData() {
    await Promise.all([this.getDotTaiko()]);
    domainLoading.set(false);
  }
}
