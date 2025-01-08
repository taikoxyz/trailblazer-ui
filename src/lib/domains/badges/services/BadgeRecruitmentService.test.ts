import type { Address } from 'viem';

import { Movements, Seasons } from '$lib/domains/profile/types/types';
import { type IBadgeRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
import type { NFT } from '$shared/types/NFT';
import getMockBadge from '$shared/utils/nfts/getMockBadge';

import type BadgeRecruitmentAdapter from '../adapter/BadgeRecruitmentAdapter';
import BadgeRecruitmentService from './BadgeRecruitmentService';
//import  BadgeRecruitmentAdapter  from '../adapter/BadgeRecruitmentAdapter';

// Correctly mock DappCompetitionAdapter instead of DappLeaderboardAdapter
vi.mock('@wagmi/core', () => ({
  writeContract: vi.fn(),
  readContract: vi.fn(),
  signMessage: vi.fn(),
  reconnect: vi.fn(),
  watchContractEvent: vi.fn(),
}));

vi.mock('$lib/domains/badges/adapter/BadgeRecruitmentAdapter', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      fetchEnabledRecruitments: vi.fn(),
      startRecruitment: vi.fn(),
      influenceRecruitment: vi.fn(),
      endRecruitment: vi.fn(),
      getRecruitmentStatus: vi.fn(),
      getRecruitmentCycleId: vi.fn(),
      getMaxInfluences: vi.fn(),
      resetMigration: vi.fn(),
    })),
  };
});

vi.mock('$lib/shared/wagmi/watcher');

describe('BadgeRecruitmentService', () => {
  let mockBadgeRecruitmentAdapter: BadgeRecruitmentAdapter;
  let badgeRecruitmentService: BadgeRecruitmentService;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the adapter
    mockBadgeRecruitmentAdapter = {
      fetchEnabledRecruitments: vi.fn(),
      startRecruitment: vi.fn(),
      influenceRecruitment: vi.fn(),
      endRecruitment: vi.fn(),
      getRecruitmentStatus: vi.fn(),
      getRecruitmentCycleId: vi.fn(),
      getMaxInfluences: vi.fn(),
      resetMigration: vi.fn(),
      _getRecruitmentSignature: vi.fn(),
    } as unknown as BadgeRecruitmentAdapter;

    // Inject the mocked adapter into the service
    badgeRecruitmentService = new BadgeRecruitmentService(mockBadgeRecruitmentAdapter);
  });

  it('should exercise the `getEnabledRecruitments`, happy-path', async () => {
    // Given
    vi.mocked(mockBadgeRecruitmentAdapter).fetchEnabledRecruitments.mockResolvedValue([1, 2, 3]); // Mock the adapter's method

    // When
    const res = await badgeRecruitmentService.getEnabledRecruitments();

    // Then
    expect(mockBadgeRecruitmentAdapter.fetchEnabledRecruitments).toHaveBeenCalledTimes(1); // Ensure the dependency is called
    expect(res).toEqual([1, 2, 3]); // Ensure the result is as expected
  });

  it('should exercise the `startRecruitment` method, happy-path', async () => {
    // Given
    const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
    const mockNFT: NFT = getMockBadge(Seasons.Season1, 1);
    const mockRecruitment: IBadgeRecruitment = {
      id: 'r1',
      s1Badge: mockNFT,
      badgeId: 1,
      status: RecruitmentStatus.ELIGIBLE,
      whaleInfluences: 0,
      minnowInfluences: 0,
      claimExpirationTimeout: new Date(),
      cycleId: 1,
    };

    const mockResponse: IBadgeRecruitment = {
      ...mockRecruitment,
      status: RecruitmentStatus.STARTED,
    };

    // Mock the adapter's startRecruitment method
    vi.mocked(mockBadgeRecruitmentAdapter).startRecruitment.mockResolvedValue(mockResponse);

    // When
    const result = await badgeRecruitmentService.startRecruitment(mockAddress, mockNFT, mockRecruitment);

    // Then
    expect(mockBadgeRecruitmentAdapter.startRecruitment).toHaveBeenCalledTimes(1); // Ensure the dependency is called
    expect(mockBadgeRecruitmentAdapter.startRecruitment).toHaveBeenCalledWith(mockAddress, mockNFT, mockRecruitment); // Ensure it is called with the correct arguments
    expect(result).toEqual(mockResponse); // Ensure the result is as expected
  });

  it('should exercise the `influenceRecruitment` method, happy-path', async () => {
    // Given
    const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
    const mockNFT: NFT = getMockBadge(Seasons.Season1, 1); // Mock an NFT
    const mockRecruitment: IBadgeRecruitment = {
      id: 'r1',
      s1Badge: mockNFT,
      badgeId: 1,
      status: RecruitmentStatus.STARTED,
      whaleInfluences: 1,
      minnowInfluences: 0,
      claimExpirationTimeout: new Date(),
      cycleId: 1,
    }; // Recruitment object
    const mockSelectedMovement = Movements.Whales;

    const mockResponse: IBadgeRecruitment = {
      ...mockRecruitment,
      whaleInfluences: 2, // Updated influence count
    };

    // Mock the adapter's influenceRecruitment method
    vi.mocked(mockBadgeRecruitmentAdapter).influenceRecruitment.mockResolvedValue(mockResponse);

    // When
    const result = await badgeRecruitmentService.influenceRecruitment(
      mockAddress,
      mockNFT,
      mockSelectedMovement,
      mockRecruitment,
    );

    // Then
    expect(mockBadgeRecruitmentAdapter.influenceRecruitment).toHaveBeenCalledTimes(1); // Ensure the dependency is called
    expect(mockBadgeRecruitmentAdapter.influenceRecruitment).toHaveBeenCalledWith(
      mockAddress,
      mockNFT,
      mockSelectedMovement,
      mockRecruitment,
    ); // Ensure it is called with the correct arguments
    expect(result).toEqual(mockResponse); // Ensure the result matches the mocked response
  });

  it('should exercise the `endRecruitment` method, happy-path', async () => {
    // Given
    const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
    const mockNFT: NFT = getMockBadge(Seasons.Season1, 1); // Mock an NFT
    const mockRecruitment: IBadgeRecruitment = {
      id: 'r1',
      s1Badge: mockNFT,
      badgeId: 1,
      status: RecruitmentStatus.STARTED,
      whaleInfluences: 2,
      minnowInfluences: 0,
      claimExpirationTimeout: new Date(),
      cycleId: 1,
    }; // Recruitment object

    const mockResponse: IBadgeRecruitment = {
      ...mockRecruitment,
      status: RecruitmentStatus.COMPLETED, // Recruitment status changes after ending
    };

    // Mock the adapter's endRecruitment method
    vi.mocked(mockBadgeRecruitmentAdapter).endRecruitment.mockResolvedValue(mockResponse);

    // When
    const result = await badgeRecruitmentService.endRecruitment(mockAddress, mockNFT, mockRecruitment);

    // Then
    expect(mockBadgeRecruitmentAdapter.endRecruitment).toHaveBeenCalledTimes(1); // Ensure the dependency is called
    expect(mockBadgeRecruitmentAdapter.endRecruitment).toHaveBeenCalledWith(mockAddress, mockNFT, mockRecruitment); // Ensure it is called with the correct arguments
    expect(result).toEqual(mockResponse); // Ensure the result matches the mocked response
  });

  it('should exercise the `getRecruitmentStatus` method, happy-path', async () => {
    // Given
    const mockAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
    const mockRecruitments: IBadgeRecruitment[] = [
      {
        id: 'r1',
        badgeId: 1,
        s1Badge: getMockBadge(Seasons.Season1, 1),
        status: RecruitmentStatus.ELIGIBLE,
        whaleInfluences: 0,
        minnowInfluences: 0,
        claimExpirationTimeout: new Date(),
        cycleId: 1,
      },
      {
        id: 'r2',
        badgeId: 2,
        s1Badge: getMockBadge(Seasons.Season2, 2),
        status: RecruitmentStatus.STARTED, // This is an active recruitment
        whaleInfluences: 1,
        minnowInfluences: 2,
        claimExpirationTimeout: new Date(),
        cycleId: 1,
      },
    ];

    // Mock the adapter's getRecruitmentStatus method
    vi.mocked(mockBadgeRecruitmentAdapter).getRecruitmentStatus.mockResolvedValue(mockRecruitments);

    // When
    const result = await badgeRecruitmentService.getRecruitmentStatus(mockAddress);

    // Then
    expect(mockBadgeRecruitmentAdapter.getRecruitmentStatus).toHaveBeenCalledTimes(1); // Ensure the dependency is called
    expect(mockBadgeRecruitmentAdapter.getRecruitmentStatus).toHaveBeenCalledWith(mockAddress); // Ensure correct arguments
    expect(result).toEqual(mockRecruitments); // Ensure the result matches the mocked recruitments
  });

  it('should exercise the `getMaxInfluences` method, happy-path', async () => {
    // Given
    const mockExp = 100;
    const mockMaxInfluences = 5;

    // Mock the adapter's getMaxInfluences method
    vi.mocked(mockBadgeRecruitmentAdapter).getMaxInfluences.mockResolvedValue(mockMaxInfluences);

    // When
    const result = await badgeRecruitmentService.getMaxInfluences(mockExp);

    // Then
    expect(mockBadgeRecruitmentAdapter.getMaxInfluences).toHaveBeenCalledTimes(1); // Ensure the dependency is called
    expect(mockBadgeRecruitmentAdapter.getMaxInfluences).toHaveBeenCalledWith(mockExp); // Ensure the correct argument is passed
    expect(result).toEqual(mockMaxInfluences); // Ensure the result matches the mocked value
  });

  describe('getMaxInfluences', () => {
    it('should exercise the `getMaxInfluences` method, happy-path', async () => {
      // Given
      const mockExp = 150; // Input experience value
      const mockMaxInfluences = 10; // Simulated max influences return value

      // Mock the adapter's getMaxInfluences method
      vi.mocked(mockBadgeRecruitmentAdapter).getMaxInfluences.mockResolvedValue(mockMaxInfluences);

      // When
      const result = await badgeRecruitmentService.getMaxInfluences(mockExp);

      // Then
      expect(mockBadgeRecruitmentAdapter.getMaxInfluences).toHaveBeenCalledTimes(1); // Ensure the dependency is called
      expect(mockBadgeRecruitmentAdapter.getMaxInfluences).toHaveBeenCalledWith(mockExp); // Ensure the correct argument is passed
      expect(result).toEqual(mockMaxInfluences); // Ensure the result matches the mocked value
    });
  });
  describe('getRecruitmentCycleId', () => {
    it('should exercise the `getRecruitmentCycleId` method, happy-path', async () => {
      // Given
      const mockCycleId = 7;

      // Mock the adapter's getRecruitmentCycleId method
      vi.mocked(mockBadgeRecruitmentAdapter).getRecruitmentCycleId.mockResolvedValue(mockCycleId);

      // When
      const result = await badgeRecruitmentService.getRecruitmentCycleId();

      // Then
      expect(mockBadgeRecruitmentAdapter.getRecruitmentCycleId).toHaveBeenCalledTimes(1); // Ensure the dependency is called
      expect(mockBadgeRecruitmentAdapter.getRecruitmentCycleId).toHaveBeenCalledWith(); // Ensure no arguments are passed
      expect(result).toEqual(mockCycleId); // Ensure the result matches the mocked value
    });
  });

  describe('resetMigration', () => {
    it('should exercise the `resetMigration` method, happy-path', async () => {
      // Given
      const mockTokenId = 1;
      const mockBadgeId = 2;
      const mockCycleId = 3;

      // Mock the adapter's resetMigration method
      vi.mocked(mockBadgeRecruitmentAdapter).resetMigration.mockResolvedValue(undefined);

      // When
      await badgeRecruitmentService.resetMigration(mockTokenId, mockBadgeId, mockCycleId);

      // Then
      expect(mockBadgeRecruitmentAdapter.resetMigration).toHaveBeenCalledTimes(1); // Ensure the dependency is called
      expect(mockBadgeRecruitmentAdapter.resetMigration).toHaveBeenCalledWith(mockTokenId, mockBadgeId, mockCycleId); // Ensure the correct arguments are passed
    });
  });
});
