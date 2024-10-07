import { gql } from '@apollo/client/core';
import { readContract, writeContract } from '@wagmi/core';
import type { Address } from 'viem';

import {
  trailblazersBadgesAbi,
  trailblazersBadgesAddress,
  trailblazersBadgesS2Abi,
  trailblazersBadgesS2Address,
} from '$generated/abi';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$libs/util/logger';

import type { BadgeAdapter } from './BadgeAdapter';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';

const log = getLogger('BadgeMigrationAdapter');

export class BadgeMigrationAdapter {
  /**
   * Fetches the currently-enabled migration s1 badge ids
   *
   * @return {*}  {Promise<IUserBadges>}
   * @memberof ProfileApiAdapter
   */
  async fetchEnabledMigrations(): Promise<number[]> {
    log('fetchEnabledMigrations');
    const out: number[] = [];

    try {
      const gqlQuery = gql`
        query OpenMigrations($address: String) {
          openMigrations(where: { enabled: true }) {
            id
            enabled
          }
        }
      `;
      const graphqlResponse = await graphqlClient.query({
        query: gqlQuery,
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.openMigrations) {
        // no open migrations, skip
        return out;
      }

      const { openMigrations } = graphqlResponse.data;
      log('fetchEnabledMigrations result for openMigrations', { openMigrations });
      for (const badge of openMigrations) {
        if (!badge.enabled) continue;
        const currentBadgeId = parseInt(badge.id);
        out.push(currentBadgeId);
      }
      log('fetchEnabledMigrations', { out });
      return out;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.openMigrations is null') {
        // no open migrations, skip
        return out;
      }
      throw e;
    }
  }

  async setApprovalForAll(): Promise<string> {
    log('setApprovalForAll');
    const s2ContractAddress = trailblazersBadgesS2Address[chainId];

    const txHash = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'setApprovalForAll',
      args: [s2ContractAddress, true],
      chainId,
    });

    return txHash;
  }

  async getApprovalForAll(address: Address): Promise<boolean> {
    log('getApprovalForAll', { address });

    const isApproved = await readContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'isApprovedForAll',
      args: [address, address],
      chainId,
    });

    return isApproved;
  }

  async getApproved(badgeAdapter: BadgeAdapter, address: Address, factionId: number): Promise<Address> {
    const contractAddress = trailblazersBadgesAddress[chainId];

    const tokenId = await badgeAdapter.getTokenId(address, factionId);

    const approvedAccount = await readContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: contractAddress,
      functionName: 'getApproved',
      args: [BigInt(tokenId)],
      chainId,
    });

    return approvedAccount;
  }

  async approve(tokenId: number): Promise<Address> {
    const s2ContractAddress = trailblazersBadgesS2Address[chainId];

    const txHash = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'approve',
      args: [s2ContractAddress, BigInt(tokenId)],
      chainId,
    });

    return txHash;
  }

  async startMigration(factionId: number): Promise<string> {
    const s2ContractAddress = trailblazersBadgesS2Address[chainId];

    const tx = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesS2Abi,
      address: s2ContractAddress,
      functionName: 'startMigration',
      args: [BigInt(factionId)],
      chainId,
    });

    //  await pendingTransactions.add(tx);

    return tx;
  }

  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });
    try {
      const gqlQuery = gql`
        query MigrationStatus ($address: Bytes){
          account(id: $address) {
            id
            approvedForAll
            approvedS1Tokens {
              id
              badgeId
            }
            s2Migrations {
      id
      isStarted
      isCompleted
      pinkTampers
      purpleTampers
      claimExpirationTimeout
      tamperExpirationTimeout
      s1Badge {
        id
        badgeId

      }
    }
          }
        }
      `
      const graphqlResponse = await graphqlClient.query({
        query: gqlQuery,
        variables: { address: address.toLocaleLowerCase() },
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
        // account does not exist, skip
        return []
      }

      const { approvedS1Tokens, approvedForAll, s2Migrations } = graphqlResponse.data.account;

      console.log(
        s2Migrations
      )




      // set the approvals
      let approvedTokenIds = []

      if (approvedForAll){
        approvedTokenIds = [0,1,2,3,4,5,6,7]
      } else {
        approvedTokenIds = approvedS1Tokens.map((token: { badgeId: bigint; }) => parseInt(token.badgeId.toString()))
      }

    } catch (e){
      console.error(e)
      return []
    }
  }
}
