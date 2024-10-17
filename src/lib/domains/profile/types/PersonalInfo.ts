import type { Address } from 'viem';

export type PersonalInfo = {
  address: Address;
  personalInfo: {
    name?: string;
    ens?: string;
    avatar?: string;
    blacklisted?: boolean;
  };
};
