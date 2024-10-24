//import type { Address } from 'viem';

//import { trailblazersBadgesAddress } from '$generated/abi';
//import { BadgeS1Adapter } from '$lib/domains/badges/adapter/BadgeS1Adapter';
//import { BadgeService } from '$lib/domains/nfts/services/BadgeService';
//import { FactionNames } from '$lib/domains/nfts/types/badges/types';
//import type { NFT } from '$lib/shared/types/NFT';
//import { chainId } from '$lib/shared/utils/chain';

vi.mock('$lib/domains/nfts/adapter/BadgeAdapter', () => {
  return {
    BadgeAdapter: vi.fn().mockImplementation(() => ({
      fetchUserBadges: vi.fn(),
      getTokenId: vi.fn(),
    })),
  };
});

describe('BadgeService', () => {
  // let badgeService: BadgeService;
  //let mockBadgeAdapter: BadgeS1Adapter;
  // const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678' as Address;

  beforeEach(() => {
    //mockBadgeAdapter = new BadgeS1Adapter();

    //  badgeService = new BadgeService(mockBadgeAdapter);

    vi.clearAllMocks();
  });
});
