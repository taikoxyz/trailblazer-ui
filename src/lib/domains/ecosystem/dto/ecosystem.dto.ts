import type { CommonPageApiResponse } from '$shared/dto/CommonPageApiResponse';

export type EcosystemEntry = {
  slug: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  twitter: string;
  website: string;
};

export type EcosystemPageApiResponse = CommonPageApiResponse<EcosystemEntry>;
