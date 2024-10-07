import { gql } from '@apollo/client/core';
import { readContract, writeContract } from '@wagmi/core';
import type { Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$libs/util/logger';

import type { BadgeAdapter } from './BadgeAdapter';

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

  async setApprovalForAll(address: Address): Promise<string> {
    log('setApprovalForAll', { address });

    const txHash = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'setApprovalForAll',
      args: [address, true],
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

  async approve(address: Address, tokenId: number): Promise<Address> {
    const txHash = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'approve',
      args: [address, BigInt(tokenId)],
      chainId,
    });

    return txHash;
  }
}
