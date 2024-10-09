import type { Address } from 'viem';

export type ProtocolApiResponse = {
  protocols: ProtocolData[];
  metadata?: ProtocolMetadata;
};

type ProtocolMetadata = {
  name: string;
  slug: string;
  twitter: string;
  logo: string;
};

type ProtocolData = {
  address: Address;
  score: number;
};
