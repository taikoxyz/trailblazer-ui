import type { Address } from 'viem';

import { trailblazersBadgesAddress } from '$generated/abi';
import { BadgeAdapter } from '$lib/domains/nfts/adapter/BadgeAdapter';
import { BadgeService } from '$lib/domains/nfts/services/BadgeService';
import { FactionNames } from '$lib/domains/nfts/types/badges/types';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';

vi.mock('$lib/domains/nfts/adapter/BadgeAdapter', () => {
  return {
    BadgeAdapter: vi.fn().mockImplementation(() => ({
      fetchUserS1Badges: vi.fn(),
      getTokenId: vi.fn(),
    })),
  };
});

describe('BadgeService', () => {
  let badgeService: BadgeService;
  let mockBadgeAdapter: BadgeAdapter;
  const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678' as Address;

  beforeEach(() => {
    mockBadgeAdapter = new BadgeAdapter();

    badgeService = new BadgeService(mockBadgeAdapter);

    vi.clearAllMocks();
  });

  it('should return badges for a user', async () => {
    // Given
    const mockBadges = {
      [FactionNames.Ravers]: { hasBadge: true, badgeId: 0, tokenId: 33 },
      [FactionNames.Robots]: { hasBadge: false, badgeId: 1, tokenId: null },
      [FactionNames.Bouncers]: { hasBadge: true, badgeId: 2, tokenId: 55 },
      [FactionNames.Masters]: { hasBadge: false, badgeId: 3, tokenId: null },
      [FactionNames.Monks]: { hasBadge: false, badgeId: 4, tokenId: null },
      [FactionNames.Drummers]: { hasBadge: false, badgeId: 5, tokenId: null },
      [FactionNames.Androids]: { hasBadge: false, badgeId: 6, tokenId: null },
      [FactionNames.Shinto]: { hasBadge: true, badgeId: 7, tokenId: 99 },
    };

    vi.mocked(mockBadgeAdapter.fetchUserS1Badges).mockResolvedValue(mockBadges);

    // When
    const result = await badgeService.getBadgesForUser(mockAddress);

    // Then
    expect(mockBadgeAdapter.fetchUserS1Badges).toHaveBeenCalledWith(mockAddress);

    const expectedBadges: NFT[] = [
      {
        address: trailblazersBadgesAddress[chainId],
        src: '/factions/ravers/neutral.png',
        tokenUri: '',
        tokenId: 33,
        badgeId: 0,
      },
      {
        address: trailblazersBadgesAddress[chainId],
        src: '/factions/bouncers/neutral.png',
        tokenUri: '',
        tokenId: 55,
        badgeId: 2,
      },
      {
        address: trailblazersBadgesAddress[chainId],
        src: '/factions/shinto/neutral.png',
        tokenUri: '',
        tokenId: 99,
        badgeId: 7,
      },
    ];

    expect(result).toEqual(expectedBadges);
  });

  it('should return an empty array if no badges are found', async () => {
    // Given
    const mockBadges = {
      [FactionNames.Ravers]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Robots]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Bouncers]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Masters]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Monks]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Drummers]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Androids]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Shinto]: { hasBadge: false, badgeId: null, tokenId: null },
    };

    vi.mocked(mockBadgeAdapter.fetchUserS1Badges).mockResolvedValue(mockBadges);

    // When
    const result = await badgeService.getBadgesForUser(mockAddress);

    // Then
    expect(mockBadgeAdapter.fetchUserS1Badges).toHaveBeenCalledWith(mockAddress);
    expect(mockBadgeAdapter.getTokenId).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
