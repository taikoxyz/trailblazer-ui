import { getAccount } from '@wagmi/core';
import axios from 'axios';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { DomainType } from '$libs/profile';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { wagmiConfig } from '$libs/wagmi';
import { domainLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

import type { DomainResponse } from './types';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

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
    currentProfile.update((current) => ({
      ...current,
      selected: localStorage.getItem('domain') as DomainType,
      dotTaiko: domain.dotTaiko,
      zns: domain.zns,
    }));
  }

  static setSelectedDomain(selectedDomain: DomainType) {
    localStorage.setItem('domain', selectedDomain.toString());
    currentProfile.update((current) => ({
      ...current,
      selected: selectedDomain,
    }));
  }
}
