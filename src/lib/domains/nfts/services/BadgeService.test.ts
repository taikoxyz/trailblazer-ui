import type { Address } from 'viem';

import { trailblazersBadgesAddress } from '$generated/abi';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';

import { BadgeAdapter } from '../adapter/BadgeAdapter';
import { BadgeService } from './BadgeService';

vi.mock('../adapter/BadgeAdapter', () => {
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
      Ravers: true,
      Robots: false,
      Bouncers: true,
      Masters: false,
      Monks: false,
      Androids: false,
      Drummers: false,
      Shinto: true,
    };

    const mockTokenId = 123;

    vi.mocked(mockBadgeAdapter.fetchUserS1Badges).mockResolvedValue(mockBadges);
    vi.mocked(mockBadgeAdapter.getTokenId).mockResolvedValue(mockTokenId);

    // When
    const result = await badgeService.getBadgesForUser(mockAddress);

    // Then
    expect(mockBadgeAdapter.fetchUserS1Badges).toHaveBeenCalledWith(mockAddress);
    expect(mockBadgeAdapter.getTokenId).toHaveBeenCalledTimes(3);

    const expectedBadges: NFT[] = [
      {
        address: trailblazersBadgesAddress[chainId],
        src: '/factions/ravers/neutral.png',
        tokenUri: '',
        tokenId: mockTokenId,
        badgeId: 0,
      },
      {
        address: trailblazersBadgesAddress[chainId],
        src: '/factions/bouncers/neutral.png',
        tokenUri: '',
        tokenId: mockTokenId,
        badgeId: 2,
      },
      {
        address: trailblazersBadgesAddress[chainId],
        src: '/factions/shinto/neutral.png',
        tokenUri: '',
        tokenId: mockTokenId,
        badgeId: 7,
      },
    ];

    expect(result).toEqual(expectedBadges);
  });

  it('should return an empty array if no badges are found', async () => {
    // Given
    const mockBadges = {
      Ravers: false,
      Robots: false,
      Bouncers: false,
      Masters: false,
      Monks: false,
      Androids: false,
      Drummers: false,
      Shinto: false,
    };

    vi.mocked(mockBadgeAdapter.fetchUserS1Badges).mockResolvedValue(mockBadges);

    // When
    const result = await badgeService.getBadgesForUser(mockAddress);

    // Then
    expect(mockBadgeAdapter.fetchUserS1Badges).toHaveBeenCalledWith(mockAddress);
    expect(mockBadgeAdapter.getTokenId).not.toHaveBeenCalled(); // No badges to get token IDs for
    expect(result).toEqual([]);
  });
});
