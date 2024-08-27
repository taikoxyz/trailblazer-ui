import { getAccount } from '@wagmi/core';
import axios from 'axios';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { DomainType } from '$libs/domain';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { wagmiConfig } from '$libs/wagmi';
import { domainLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

import type { DomainResponse } from './types';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export class Domain {
  static async getDomain(address?: string) {
    const accountAddress = address || getAccount(wagmiConfig).address;

    if (accountAddress) {
      this.resetCurrentProfile();

      try {
        const { data } = await axios.get<DomainResponse>(`${baseApiUrl}/user/domain`, {
          params: { address: accountAddress },
        });
        this.updateCurrentProfile(data);
      } catch (error) {
        console.warn(error);
      } finally {
        domainLoading.set(false);
      }
    }
  }

  private static resetCurrentProfile() {
    currentProfile.update((current) => ({
      ...current,
      dotTaiko: '',
      zns: '',
    }));
  }

  private static updateCurrentProfile(domain: DomainResponse) {
    const selectedDomain = this.determineSelectedDomain(domain);
    currentProfile.update((current) => ({
      ...current,
      selected: selectedDomain,
      dotTaiko: domain.dotTaiko,
      zns: domain.zns,
    }));
  }

  private static determineSelectedDomain(domain: DomainResponse): DomainType {
    const { dotTaiko, zns } = domain;
    const storedDomain = localStorage.getItem('domain') as DomainType | null;

    if (storedDomain === DomainType.DOTTAIKO && dotTaiko) {
      return DomainType.DOTTAIKO;
    }

    if (storedDomain === DomainType.ZNS && zns) {
      return DomainType.ZNS;
    }

    if (dotTaiko && zns) {
      // Randomly select either dotTaiko or zns
      return Math.random() < 0.5 ? DomainType.DOTTAIKO : DomainType.ZNS;
    }

    if (dotTaiko) {
      return DomainType.DOTTAIKO;
    }

    if (zns) {
      return DomainType.ZNS;
    }

    return DomainType.ADDRESS;
  }

  static setSelectedDomain(selectedDomain: DomainType) {
    localStorage.setItem('domain', selectedDomain.toString());
    currentProfile.update((current) => ({
      ...current,
      selected: selectedDomain,
    }));
  }
}
