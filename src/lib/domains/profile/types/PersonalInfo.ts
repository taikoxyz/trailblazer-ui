import type { Address } from 'viem';

import type { NFT } from '$lib/shared/types/NFT';

export type PersonalInfo = {
  address: Address;
  personalInfo: {
    name?: string;
    ens?: string;
    avatar?: NFT;
  };
};
