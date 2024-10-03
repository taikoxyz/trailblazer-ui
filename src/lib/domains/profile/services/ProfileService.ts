import { getAccount } from '@wagmi/core';
import { type Address, getAddress, type Hash } from 'viem';

import { BadgeMigrationService } from '$lib/domains/nfts/services/BadgeMigrationService';
import { BadgeService } from '$lib/domains/nfts/services/BadgeService';
import { CombinedNFTService } from '$lib/domains/nfts/services/CombinedNFTService';
import type { NFT } from '$lib/shared/types/NFT';
import { wagmiConfig } from '$lib/shared/wagmi';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';

import { ProfileApiAdapter } from '../adapter/ProfileAdapter';
import UserRepository from '../repositories/UserRepository';
import { multipliersLoading, profileLoading } from '../stores/profileStore';
import { defaultUserProfile } from '../types/defaultUserProfile';
import type { DomainInfo } from '../types/DomainInfo';
import { levelTiers } from '../types/LevelTiers';
import { DomainType } from '../types/types';
import type { UserProfile } from '../types/UserProfile';

const log = getLogger('ProfileService');

export class ProfileService {
  // Adapters
  private apiAdapter: ProfileApiAdapter;

  // Repositories
  private userRepository: UserRepository;

  //Services
  private combinedNFTService: CombinedNFTService;
  private badgeService: BadgeService;
  private badgeMigrationService: BadgeMigrationService;

  private localStorageKey = 'taikoENSdomain';

  constructor() {
    this.apiAdapter = new ProfileApiAdapter();
    this.userRepository = new UserRepository();
    this.combinedNFTService = new CombinedNFTService();
    this.badgeService = new BadgeService();
    this.badgeMigrationService = new BadgeMigrationService();
  }

  /**
   * Fetches the user profile and updates the store.
   * @param address - The user's address.
   * @param season - The season number for data fetching (default is 0).
   */
  async getProfile(address?: Address, season: number = 0): Promise<void> {
    profileLoading.set(true);

    try {
      if (!address) {
        const account = getAccount(wagmiConfig);
        address = account.address;
      }

      if (!address) {
        throw new Error('No address provided and no connected account found.');
      }

      // Fetch data from multiple endpoints
      const [pointsAndRank, userDomainInfo, activity] = await Promise.all([
        this.apiAdapter.fetchUserPointsAndRank(address, season),
        this.apiAdapter.fetchUserDomainInfo(address),
        this.apiAdapter.fetchUserActivity(address, season, 0),
      ]);

      // Assemble the complete UserProfile with default values
      const userProfile: UserProfile = {
        ...defaultUserProfile,
        address,
        personalInfo: {
          ...defaultUserProfile.personalInfo,
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
          pointsHistory: activity,
        },
        multipliers: defaultUserProfile.multipliers,
        domainInfo: userDomainInfo,
        badgeMigrations: [],
        isSetApprovalForAll: false,
      };

      const info: DomainInfo = {
        domainInfo: {
          dotTaiko: userDomainInfo.dotTaiko,
          zns: userDomainInfo.zns,
        },
      };

      log('Assembled User Profile:', userProfile);

      // Save the assembled profile
      await this.userRepository.save(userProfile);

      log('Saved Profile:', await this.userRepository.get());

      // Proceed with fetching NFTs and further calculations
      const multiplier = this.fetchAndCalculateMultipliers(address);
      const nfts = this.getProfileWithNFTs(address, season);
      const avatar = this.getProfilePicture(address);
      const rankName = this.performAdditionalCalculations();
      const domainInfo = this.handleDomainSelection(info);
      const badgeMigrations = this.getBadgeMigrations(address);

      await Promise.all([multiplier, avatar, rankName, domainInfo, nfts, badgeMigrations]);

      log('Final Profile:', await this.userRepository.get());
    } catch (error) {
      log('Error in getProfile:', error);
    } finally {
      profileLoading.set(false);
      multipliersLoading.set(false);
    }
  }

  /**
   * Handles domain selection logic.
   * @param domainInfo - The fetched domain information.
   */
  async handleDomainSelection(domainInfo: DomainInfo): Promise<void> {
    try {
      const selectedDomain = this.determineSelectedDomain(domainInfo);
      this.setSelectedDomain(selectedDomain);
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
        ...oldUser.domainInfo,
        selected: selectedDomain,
      },
    });
    log('updated user', await this.userRepository.get());
  }

  /**
   * Allows the user to select a domain and updates the store and localStorage.
   * @param selectedDomain - The domain type selected by the user.
   */
  setSelectedDomainExternally(selectedDomain: DomainType): void {
    this.setSelectedDomain(selectedDomain);
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
   * Fetches and updates the user's avatar.
   * @param address - The user's address.
   */
  private async fetchAndUpdateAvatar(address: Address): Promise<void> {
    try {
      const avatar = await this.apiAdapter.getProfilePicture(address);
      log('Fetched Avatar:', avatar);
      // await this.userRepository.update({ personalInfo: { avatar } });
    } catch (error) {
      log('Error in fetchAndUpdateAvatar:', error);
    }
  }

  /**
   * Performs additional calculations like percentile, level, and boosted points.
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
      const user = await this.userRepository.get();
      if (!user) return null;

      const pfpNFT = await this.apiAdapter.getProfilePicture(address);
      if (!pfpNFT) return null;

      log('Found profile picture NFT:', pfpNFT);

      // Fetch the NFT details using CombinedNFTService
      const allNFTs = await this.combinedNFTService.fetchAllNFTsForUser(address);

      // Find the NFT with the given ID
      const allNFTsFlat: NFT[] = [...allNFTs.taikoonNFTs, ...allNFTs.badgeNFTs];
      log('All NFTs:', allNFTsFlat);

      //find the pfp based on address AND tokenId
      const match = allNFTsFlat.find(
        (nft) => nft.tokenId === Number(pfpNFT.tokenId) && getAddress(nft.address) === getAddress(pfpNFT.address),
      );
      if (match) {
        const metadata = await this.combinedNFTService.getNFTMetadata(pfpNFT);
        const profilePicture = metadata?.image;

        if (profilePicture) {
          await this.userRepository.update({
            personalInfo: {
              avatar: profilePicture,
            },
          });

          return profilePicture;
        }
        return null;
      } else {
        log('Profile picture not found');
        return null;
      }
    } catch (error) {
      log('Error retrieving profile picture:', error);
      return null;
    }
  }

  async getProfilePictures(addresses: Address[]): Promise<Record<Address, string>> {
    log('Retrieving profile pictures for addresses:', addresses);
    try {
      const result: Record<Address, string> = {};
      const profilePictures: Record<Address, NFT> = await this.apiAdapter.getProfilePictures(addresses);
      log('Found profile pictures:', profilePictures);

      for (const [address, nft] of Object.entries(profilePictures)) {
        const metadata = await this.combinedNFTService.getNFTMetadata(nft);
        log('metadata', metadata);
        if (metadata) {
          result[getAddress(address) as Address] = metadata?.image || '';
        } else {
          result[getAddress(address) as Address] = '';
        }
      }
      log('Profile pictures:', result);

      // out[owner] = src.data.image;
      // return profilePictures;
      return result;
    } catch (error) {
      log('Error retrieving profile pictures:', error);
      return {};
    }
  }

  /* example for ref


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



  */
  async getEnabledMigrations(): Promise<number[]> {
    log('getEnabledMigrations');
    return this.badgeMigrationService.getEnabledMigrations();
  }

  async setApprovalForAll(address: Address): Promise<string> {
    log('setApprovalForAll', { address });
    return this.badgeMigrationService.setApprovalForAll(address);
  }

  async getBadgeMigrations(address: Address): Promise<void> {
    // fetch the required info here!
    log('getBadgeMigrations', { address });
    // first, fetch if the user has set approval for all
    const isSetApprovalForAll = await this.badgeMigrationService.getApprovalForAll(address);

    await this.userRepository.update({
      isSetApprovalForAll,
    });
  }
}
