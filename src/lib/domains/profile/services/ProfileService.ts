import { getAccount } from '@wagmi/core';
import { type Address, getAddress, type Hash } from 'viem';

import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/dapps/types';
import { BadgeService } from '$lib/domains/nfts/services/BadgeService';
import { CombinedNFTService } from '$lib/domains/nfts/services/CombinedNFTService';
import { ProfileApiAdapter } from '$lib/domains/profile/adapter/ProfileAdapter';
import UserRepository from '$lib/domains/profile/repositories/UserRepository';
import { multipliersLoading, profileLoading } from '$lib/domains/profile/stores/profileStore';
import { defaultUserProfile } from '$lib/domains/profile/types/defaultUserProfile';
import type { DomainInfo } from '$lib/domains/profile/types/DomainInfo';
import { levelTiers } from '$lib/domains/profile/types/LevelTiers';
import { DomainType, type UserPointHistory } from '$lib/domains/profile/types/types';
import type { UserInfoForLeaderboard } from '$lib/domains/profile/types/UserInfoForLeaderboard';
import type { UserProfile } from '$lib/domains/profile/types/UserProfile';
import type { UserStats } from '$lib/domains/profile/types/UserStats';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import type { NFT } from '$lib/shared/types/NFT';
import { wagmiConfig } from '$lib/shared/wagmi';
import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';
import { getLogger } from '$shared/utils/logger';

import type { IProfileService } from './IProfileService';

const log = getLogger('ProfileService');

export class ProfileService implements IProfileService {
  // Adapters
  private apiAdapter: ProfileApiAdapter;

  // Repositories
  private userRepository: UserRepository;

  //Services
  private combinedNFTService: CombinedNFTService;
  private badgeService: BadgeService;

  private localStorageKey = 'taikoENSdomain';

  constructor(
    apiAdapter?: ProfileApiAdapter,
    userRepository?: UserRepository,
    combinedNFTService?: CombinedNFTService,
    badgeService?: BadgeService,
  ) {
    this.apiAdapter = apiAdapter || new ProfileApiAdapter();
    this.userRepository = userRepository || new UserRepository();
    this.combinedNFTService = combinedNFTService || new CombinedNFTService();
    this.badgeService = badgeService || new BadgeService();
  }

  /**
   * Fetches the user profile and updates the store.
   * @param address - The user's address.
   * @param season - The season number for data fetching (default is 0).
   */
  async getProfile(address?: Address, season: number = 0): Promise<UserProfile | null> {
    try {
      if (!address) {
        const account = getAccount(wagmiConfig);
        address = account.address;
      }

      if (!address) {
        throw new Error('No address provided and no connected account found.');
      }

      // Fetch data from multiple endpoints
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [pointsAndRank, userDomainInfo, activity, nftsResult, avatarResult] = await Promise.all([
        this.apiAdapter.fetchUserPointsAndRank(address, season),
        this.fetchDomainInfo(address),
        this.apiAdapter.fetchUserActivity(address, season, 0),
        this.combinedNFTService.fetchAllNFTsForUser(address),
        this.getProfilePicture(address),
      ]);
      log('Fetched data:', { pointsAndRank, userDomainInfo, activity, nftsResult, avatarResult });

      // Assemble the complete UserProfile with default values
      const userProfile: UserProfile = {
        ...defaultUserProfile,
        address,
        personalInfo: {
          ...defaultUserProfile.personalInfo,
          avatar: avatarResult || '',
        },
        userStats: {
          ...defaultUserProfile.userStats,
          score: pointsAndRank.score,
          rank: pointsAndRank.rank.toString(),
          total: pointsAndRank.total.toString(),
          title: '',
          level: '',
        },
        activityHistory: {
          items: activity?.items,
          pagination: {
            page: 0,
            size: activity?.size,
            total: activity?.total,
          },
        },
        nfts: [...nftsResult.taikoonNFTs, ...nftsResult.badgeNFTs],
        multipliers: defaultUserProfile.multipliers,
        domainInfo: {
          ...userDomainInfo.domainInfo,
          selected: userDomainInfo.domainInfo.selected,
        },
      };

      // Save the assembled profile
      await this.userRepository.save(userProfile);

      // Do additional config
      await Promise.all([
        this.handleDomainSelection(userDomainInfo),
        this.fetchAndCalculateMultipliers(address),
        this.performAdditionalCalculations(),
      ]);
      // const [multiplierResult] = await Promise.all([this.handleDomainSelection(info)]);

      log('Final Profile:', await this.userRepository.get());
    } catch (error) {
      log('Error in getProfile:', error);
      return null;
    } finally {
      profileLoading.set(false);
      multipliersLoading.set(false);
    }
    return await this.userRepository.get();
  }

  /**
   * Fetches the user's points and rank for a given season.
   *
   * @param {Address} address
   * @param {number} season
   * @return {*}
   * @memberof ProfileService
   */
  async getProfileRankAndPoints(address: Address, season: number) {
    log('Fetching user points and rank for address:', address, 'season:', season);
    return await this.apiAdapter.fetchUserPointsAndRank(address, season);
  }

  /**
   * Fetches the user's domain information.
   *
   * @param {Address} address
   * @return {*}
   * @memberof ProfileService
   */
  async getUserInfoForLeaderboard(
    entries: UserLeaderboardItem[],
    total: number,
    season: number,
  ): Promise<UserInfoForLeaderboard[]> {
    log('Fetching user info for leaderboard for entries:', entries, 'total:', total, 'season:', season);

    // Extract all addresses from entries
    const addresses = entries.map((entry) => entry.address);

    // Fetch profile pictures in bulk
    const profilePicturesPromise = this.getProfilePictures(addresses);

    // Fetch domain info for all addresses in parallel
    // const domainInfoPromises = addresses.map((address) => this.fetchDomainInfo(address));
    // const domainInfoArrayPromise = Promise.all(domainInfoPromises);

    log('Fetching user info for leaderboard:', entries);

    // Calculate user stats synchronously
    const userStatsArray = entries.map((entry) => {
      const { rank, score } = entry;
      log('calculating user stats', { score, rank, total });
      const percentile = this.calculatePercentile(rank, total);
      const { level, title } = this.getLevel(percentile);
      log('creating user stats', { score, rank, total, percentile, level, title });
      return {
        score,
        rank: rank.toString(),
        total: total.toString(),
        rankPercentile: percentile.toFixed(2),
        level,
        title,
      } satisfies UserStats['userStats'];
    });

    const [profilePictures] = await Promise.all([profilePicturesPromise]);

    const userInfoList: UserInfoForLeaderboard[] = entries.map((entry, index) => {
      const address = entry.address;
      const userStats = userStatsArray[index];
      const profilePicture = profilePictures[getAddress(address)] || '';

      return {
        address,
        score: userStats.score,
        rank: userStats.rank,
        title: userStats.title,
        level: userStats.level,
        total: userStats.total,
        rankPercentile: userStats.rankPercentile || '0',
        profilePicture,
      };
    });

    return userInfoList;
  }

  /**
   * Fetches the user's domain information.
   *
   * @param {Address} address
   * @return {*}  {Promise<DomainInfo>}
   * @memberof ProfileService
   */
  async fetchDomainInfo(address: Address): Promise<DomainInfo> {
    const userDomainInfo = await this.apiAdapter.fetchUserDomainInfo(address);

    const info: DomainInfo = {
      domainInfo: {
        dotTaiko: userDomainInfo.dotTaiko,
        zns: userDomainInfo.zns,
      },
    };

    return info;
  }

  /**
   * Handles domain selection logic.
   * @param domainInfo - The fetched domain information.
   */
  async handleDomainSelection(domainInfo: DomainInfo): Promise<void> {
    try {
      const selectedDomain = this.determineSelectedDomain(domainInfo);
      await this.setSelectedDomain(selectedDomain);
    } catch (error) {
      log('Error in handleDomainSelection:', error);
    }
  }

  /**
   * Determines the selected domain based on fetched data and localStorage.
   * @param domainInfo - The fetched domain information.
   * @returns The selected domain type.
   */
  determineSelectedDomain(domainInfo: DomainInfo): DomainType {
    const { dotTaiko, zns } = domainInfo.domainInfo;
    const storedDomain = localStorage.getItem(this.localStorageKey) as DomainType | null;

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

  /**
   * Sets the selected domain and persists it in localStorage.
   * @param selectedDomain - The domain type to set.
   */
  async setSelectedDomain(selectedDomain: DomainType): Promise<void> {
    localStorage.setItem(this.localStorageKey, selectedDomain.toString());
    const oldUser = await this.userRepository.get();
    this.userRepository.update({
      domainInfo: {
        ...oldUser?.domainInfo,
        selected: selectedDomain,
      },
    });
    log('updated user', await this.userRepository.get());
  }

  /**
   * Fetches NFTs and calculates multipliers.
   * @param address - The user's address.
   */
  private async fetchAndCalculateMultipliers(address: Address): Promise<void> {
    const badges: NFT[] = [];
    try {
      if (!isDevelopmentEnv) {
        const found = await this.badgeService.getBadgesForUser(address);
        badges.push(...found);
        // graphqlResponse = await graphqlClient.query({
        //   query: USER_NFTS_QUERY,
        //   variables: { address: address.toLocaleLowerCase() },
        // });
      } else {
        //TODO: implement again
        // const { data } = await axios.get(`/user/graphql`, {
        //   params: { address },
        //   ...globalAxiosConfig,
        // });
        // graphqlResponse = data;
      }

      if (badges) {
        log('Found badges', badges);

        //TODO: implement again
        // const userNFTs: UserNFT[] = graphqlResponse.data.account.s1MultiplierNfts.map(
        //   (token: { contract: { name: string }; tokenId: string; badgeId: string }) => ({
        //     name: token.contract.name,
        //     tokenId: token.tokenId,
        //     badgeId: token.badgeId,
        //   }),
        // );

        // // Calculate Multipliers
        // const taikoonCount = userNFTs.filter((nft) => nft.name === 'Taikoon').length;
        // const taikoonMultiplier = taikoonCount >= 1 ? 1000 : 0;

        // const snaefellCount = userNFTs.filter((nft) => nft.name === 'SnaefellToken').length;
        // const snaefellMultiplier = snaefellCount >= 1 ? 100 : 0;

        // const factionBadges = userNFTs
        //   .filter((nft) => nft.name === 'Trailblazers Badges')
        //   .reduce(
        //     (acc, nft) => {
        //       if (nft.badgeId) {
        //         acc[nft.badgeId] = (acc[nft.badgeId] || 0) + 1;
        //       }
        //       return acc;
        //     },
        //     {} as Record<string, number>,
        //   );

        // const multiplierTable = [0, 100, 210, 331, 464, 611, 772, 949, 1144];
        // const uniqueFactionBadgesCount = Object.keys(factionBadges).length;
        // const factionMultiplier = multiplierTable[uniqueFactionBadgesCount] || 0;

        // const totalMultiplier = taikoonMultiplier + snaefellMultiplier + factionMultiplier;

        // const userMultiplier: UserMultiplier = {
        //   totalMultiplier: Math.min(Number(totalMultiplier || 0), 2000), // max of 3x
        //   taikoonMultiplier: Number(taikoonMultiplier || 0),
        //   factionMultiplier: Number(factionMultiplier || 0),
        //   snaefellMultiplier: Number(snaefellMultiplier || 0),
        // };

        // // Update profile with multipliers and NFTs via UserRepository
        // await this.userRepository.update({ multipliers: userMultiplier, nfts: userNFTs });
      }
    } catch (error) {
      log('Error in fetchAndCalculateMultipliers:', error);
    }
  }

  /**
   * Performs additional calculations after fetching user stats.
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof ProfileService
   */
  private async performAdditionalCalculations(): Promise<void> {
    const user = await this.userRepository.get();
    if (!user.userStats) {
      throw new Error('User stats are undefined');
    }
    const { rank, total } = user.userStats;
    log("User's rank and total:", { rank, total });
    const numericRank = Number(rank);

    // Handle cases where total is zero to avoid division by zero
    if (numericRank === 0) {
      log('Total is zero, setting percentile to 0');
      await this.userRepository.update({
        userStats: {
          ...user.userStats,
          rankPercentile: '0',
          level: '0',
          title: 'Beginner',
        },
      });
      return;
    }

    const percentile = this.calculatePercentile(numericRank, total);
    const { level, title } = this.getLevel(percentile);

    log('new info', { percentile, level, title });
    await this.userRepository.update({
      userStats: {
        ...user.userStats,
        rankPercentile: String(percentile),
        level: level,
        title: title,
      },
    });
    log('updated', await this.userRepository.get());
  }

  calculatePercentile(rank: string | number, total: string | number) {
    // Take current rank over total
    const percentile = (1 - Number(rank) / Number(total)) * 100;
    return percentile || 0;
  }

  getLevel(percentile: number) {
    log('Percentile:', percentile);
    if (percentile < 0 || percentile > 100) {
      return { level: '0', title: 'Beginner' };
    }
    const tier = levelTiers.find(({ percentileCap }) => percentile <= percentileCap) || {
      level: '0',
      title: 'Beginner',
    };

    log('found tier', tier);
    const { level, title } = tier;
    return { level: level, title };
  }

  async getPointHistoryPage(address: Address, season: number, page: number) {
    log('Fetching user activity for address:', address, 'season:', season, 'page:', page);
    const activity = await this.apiAdapter.fetchUserActivity(address, season, page);
    return activity;
  }

  async updateProfilePointHistoryPage(args: PaginationInfo<UserPointHistory>, user: Address, season: number) {
    log('Fetching user activity for args:', args, 'season:', season);

    const activity = await this.apiAdapter.fetchUserActivity(user, season, args.page);
    log('activity', activity);

    if (activity.items && activity.items.length > 0) {
      const oldUser = await this.userRepository.get();
      const newProfile: UserProfile = {
        ...oldUser,
        activityHistory: {
          items: [...activity.items],
          pagination: { ...args },
        },
      };
      await this.userRepository.update(newProfile);
      // return  PaginationInfo<UserPointHistory> with new items
    }
  }

  /**
   * Fetches the user profile along with their NFTs and updates the store.
   * @param address - The user's address.
   * @param season - The season number for data fetching (default is 0).
   */
  async getProfileWithNFTs(address: Address, season: number = 0): Promise<void> {
    log('Fetching profile with NFTs for address:', address, 'season:', season);
    profileLoading.set(true);

    try {
      // Fetch NFTs (badges, avatars, etc.)
      const nfts = await this.combinedNFTService.fetchAllNFTsForUser(address);
      log('result of fetchAllNFTsForUser:', nfts);
      // Combine and update the profile with NFT data
      await this.userRepository.update({
        nfts: [...nfts.taikoonNFTs, ...nfts.badgeNFTs],
      });

      log('Profile with NFTs:', await this.userRepository.get());
    } catch (error) {
      log('Error in getProfileWithNFTs:', error);
    } finally {
      profileLoading.set(false);
    }
  }

  /**
   * Sets the user's profile picture to the given NFT.
   *
   * @param {NFT} nft the NFT to set as the user's profile picture
   * @return {*}  {Promise<Hash>}
   * @memberof ProfileService
   */
  async setProfilePicture(nft: NFT): Promise<Hash | null> {
    try {
      // Interact with the smart contract to set the profile picture
      const txHash = await this.apiAdapter.setProfilePicture(nft);

      if (txHash) {
        log('Transaction hash for setting profile picture:', txHash);
        return txHash;
      }
      return null;
    } catch (error) {
      log('Error setting profile picture:', error);
      return null;
    }
  }

  /**
   * Retrieves the user's selected NFT profile picture.
   * @param address - The user's address.
   * @returns The NFT used as the profile picture.
   */
  async getProfilePicture(address: Address): Promise<string | null> {
    log('Retrieving profile picture for address:', address);
    try {
      // Fetch the profile picture NFT reference from the API
      const pfpNFT = await this.apiAdapter.getProfilePicture(address);
      if (!pfpNFT) {
        log('No profile picture NFT found for address:', address);
        return null;
      }

      log('Found profile picture NFT:', pfpNFT);

      // If pfpNFT lacks necessary details, fetch all NFTs and find a match
      if (!pfpNFT.address || !pfpNFT.tokenId) {
        // Fetch all NFTs for the user
        const allNFTs = await this.combinedNFTService.fetchAllNFTsForUser(address);

        // Combine all NFTs into a single array
        const allNFTsFlat: NFT[] = [...allNFTs.taikoonNFTs, ...allNFTs.badgeNFTs];
        log('All NFTs:', allNFTsFlat);

        // Find the matching NFT
        const match = allNFTsFlat.find(
          (nft) => nft.tokenId === Number(pfpNFT.tokenId) && getAddress(nft.address) === getAddress(pfpNFT.address),
        );

        if (match) {
          const metadata = await this.combinedNFTService.getNFTMetadata(match);
          const profilePicture = metadata?.image || null;

          if (profilePicture) {
            log('Retrieved profile picture URL:', profilePicture);
            return profilePicture;
          } else {
            log('No image found in metadata for NFT:', match);
            return null;
          }
        } else {
          log('Profile picture NFT not found among user NFTs.');
          return null;
        }
      } else {
        // pfpNFT has enough information; fetch metadata directly
        const metadata = await this.combinedNFTService.getNFTMetadata(pfpNFT);
        const profilePicture = metadata?.image || null;

        if (profilePicture) {
          log('Retrieved profile picture URL:', profilePicture);
          return profilePicture;
        } else {
          log('No image found in metadata for NFT:', pfpNFT);
          return null;
        }
      }
    } catch (error) {
      log('Error retrieving profile picture:', error);
      return null;
    }
  }

  /**
   * Retrieves the profile pictures for the given addresses.
   *
   * @param {Address[]} addresses
   * @return {*}  {Promise<Record<Address, string>>}
   * @memberof ProfileService
   */
  async getProfilePictures(addresses: Address[]): Promise<Record<Address, string>> {
    log('Retrieving profile pictures for addresses:', addresses);
    try {
      const result: Record<Address, string> = {};
      const profilePictures: Record<Address, NFT | null> = await this.apiAdapter.getProfilePictures(addresses);
      log('Found profile pictures:', profilePictures);

      const metadataPromises = Object.entries(profilePictures).map(async ([address, nft]) => {
        const resolvedAddress = getAddress(address) as Address;
        if (!nft) return { address: resolvedAddress, image: '' };
        const metadata = await this.combinedNFTService.getNFTMetadata(nft);
        return { address: resolvedAddress, image: metadata?.image || '' };
      });

      const metadataResults = await Promise.all(metadataPromises);
      metadataResults.forEach(({ address, image }) => {
        result[address] = image;
      });
      log('Profile pictures:', result);

      return result;
    } catch (error) {
      log('Error retrieving profile pictures:', error);
      return {};
    }
  }
}
