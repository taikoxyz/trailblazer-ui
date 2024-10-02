import type { ApolloQueryResult } from '@apollo/client';
import { writeContract } from '@wagmi/core';
import type { AxiosInstance } from 'axios';
import { type Address, type Hash, zeroAddress } from 'viem';

import { registerProfilePictureAbi, registerProfilePictureAddress } from '$generated/abi';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { USER_PROFILE_PICTURE_QUERY, USER_PROFILE_PICTURES_QUERY } from '$lib/shared/services/graphql/queries';
import { pendingTransactions } from '$lib/shared/stores/pendingTransactions';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { ProfileApiAdapter } from './ProfileAdapter';

vi.mock('@wagmi/core', () => ({
  writeContract: vi.fn(),
  reconnect: vi.fn(),
}));

vi.mock('$lib/shared/services/graphql/client', () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

vi.mock('$lib/shared/services/api/axiosClient', async () => {
  const actual = await vi.importActual('$lib/shared/services/api/axiosClient');
  return {
    ...actual,
    getAxiosInstance: vi.fn(),
  };
});
vi.mock('$lib/shared/stores/pendingTransactions', () => ({
  pendingTransactions: {
    add: vi.fn(),
  },
}));

const createMockQueryResult = <T>(data: T): ApolloQueryResult<T> => ({
  data,
  loading: false,
  networkStatus: 7,
});

describe('ProfileApiAdapter', () => {
  let profileApiAdapter: ProfileApiAdapter;
  const mockAddress: Address = zeroAddress;
  const mockNFT: NFT = {
    address: '0xTokenAddress',
    tokenId: 123,
    src: '',
    tokenUri: 'https://example.com/metadata/123.json',
  };

  beforeEach(() => {
    profileApiAdapter = new ProfileApiAdapter();
    vi.clearAllMocks();
  });

  describe('fetchUserPointsAndRank', () => {
    it('should fetch user points and rank', async () => {
      const mockResponse = { data: { points: 100, rank: 1 } };
      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      };
      vi.mocked(getAxiosInstance).mockReturnValue(mockClient as unknown as AxiosInstance);

      const result = await profileApiAdapter.fetchUserPointsAndRank(mockAddress, 1);

      expect(getAxiosInstance).toHaveBeenCalledWith(1);
      expect(mockClient.get).toHaveBeenCalledWith('/user/rank', {
        params: { address: mockAddress },
        ...globalAxiosConfig,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('fetchUserActivity', () => {
    it('should fetch user activity with pagination', async () => {
      const mockResponse = { data: { activities: [] } };
      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      };
      vi.mocked(getAxiosInstance).mockReturnValue(mockClient as unknown as AxiosInstance);

      const result = await profileApiAdapter.fetchUserActivity(mockAddress, 1, 2);

      expect(getAxiosInstance).toHaveBeenCalledWith(1);
      expect(mockClient.get).toHaveBeenCalledWith('/user/history', {
        params: { address: mockAddress, page: 2 },
        ...globalAxiosConfig,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('fetchUserDomainInfo', () => {
    it('should fetch user domain info', async () => {
      const mockResponse = { data: { domain: 'example.eth' } };
      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      };
      vi.mocked(getAxiosInstance).mockReturnValue(mockClient as unknown as AxiosInstance);

      const result = await profileApiAdapter.fetchUserDomainInfo(mockAddress);

      expect(getAxiosInstance).toHaveBeenCalled();
      expect(mockClient.get).toHaveBeenCalledWith('/user/domain', {
        params: { address: mockAddress },
        ...globalAxiosConfig,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('setProfilePicture', () => {
    it('should set the profile picture and add to pending transactions', async () => {
      const mockTxHash: Hash = '0xTransactionHash' as Hash;
      vi.mocked(writeContract).mockResolvedValue(mockTxHash);

      const result = await profileApiAdapter.setProfilePicture(mockNFT);

      expect(writeContract).toHaveBeenCalledWith(wagmiConfig, {
        abi: registerProfilePictureAbi,
        address: registerProfilePictureAddress[chainId],
        functionName: 'setPFP',
        args: [mockNFT.address, BigInt(mockNFT.tokenId)],
        chainId,
      });
      expect(pendingTransactions.add).toHaveBeenCalledWith(mockTxHash);
      expect(result).toBe(mockTxHash);
    });
  });

  describe('getProfilePicture', () => {
    it('should fetch the profile picture for a user', async () => {
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          profilePicture: {
            id: mockAddress,
            tokenAddress: mockNFT.address,
            tokenId: mockNFT.tokenId,
            tokenURI: mockNFT.tokenUri,
          },
        }),
      );

      const result = await profileApiAdapter.getProfilePicture(mockAddress);

      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: USER_PROFILE_PICTURE_QUERY,
        variables: { address: mockAddress },
      });

      expect(result).toEqual(mockNFT);
    });

    it('should return an empty object if no profile picture is found', async () => {
      vi.mocked(graphqlClient.query).mockResolvedValue(
        createMockQueryResult({
          data: {
            profilePicture: null,
          },
        }),
      );

      const result = await profileApiAdapter.getProfilePicture(mockAddress);

      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: USER_PROFILE_PICTURE_QUERY,
        variables: { address: mockAddress },
      });
      expect(result).toEqual({} as NFT);
    });
  });

  describe('getProfilePictures', () => {
    it('should fetch multiple profile pictures for users', async () => {
      const mockAddresses: Address[] = [zeroAddress, '0x1670010000000000000000000000000000000001'];
      const mockResponse = {
        profilePictures: [
          {
            id: mockAddresses[0],
            tokenAddress: mockNFT.address,
            tokenId: mockNFT.tokenId,
            tokenURI: mockNFT.tokenUri,
          },
          {
            id: mockAddresses[1],
            tokenAddress: mockNFT.address,
            tokenId: mockNFT.tokenId,
            tokenURI: mockNFT.tokenUri,
          },
        ],
      };

      vi.mocked(graphqlClient.query).mockResolvedValue(createMockQueryResult(mockResponse));

      const result = await profileApiAdapter.getProfilePictures(mockAddresses);

      expect(graphqlClient.query).toHaveBeenCalledWith({
        query: USER_PROFILE_PICTURES_QUERY,
        variables: { addresses: mockAddresses },
      });

      expect(result).toEqual({
        [mockAddresses[0]]: mockNFT,
        [mockAddresses[1]]: mockNFT,
      });
    });
  });
});
