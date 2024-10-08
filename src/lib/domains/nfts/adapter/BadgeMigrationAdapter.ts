import { gql } from '@apollo/client/core';
import { writeContract } from '@wagmi/core';
import type { Address } from 'viem';

import {
  trailblazersBadgesAbi,
  trailblazersBadgesAddress,
  trailblazersBadgesS2Abi,
  trailblazersBadgesS2Address,
} from '$generated/abi';
import type { BadgeMigration as GqlBadgeMigration,Token } from '$generated/graphql';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { GET_MIGRATION_STATUS_GQL } from '$lib/shared/services/graphql/queries/getMigrationStatus.gql';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$libs/util/logger';

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

  async getApprovedMigrations(address: Address): Promise<number[]> {
    const graphqlResponse = await graphqlClient.query({
      query: GET_MIGRATION_STATUS_GQL,
      variables: { address: address.toLocaleLowerCase() },
    });

    if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
      return []
    }

    const { approvedS1Tokens, approvedForAll } = graphqlResponse.data.account as {
      approvedS1Tokens: Token[],
      approvedForAll: boolean,
    }

    let approvedTokenIds = []

    if (approvedForAll){
      approvedTokenIds = [0,1,2,3,4,5,6,7]
    } else {
      approvedTokenIds = approvedS1Tokens.map(
        (token: Token) => parseInt(token.badgeId.toString()))
    }

    return approvedTokenIds
  }

  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });

    try {
      const graphqlResponse = await graphqlClient.query({
        query: GET_MIGRATION_STATUS_GQL,
        variables: { address: address.toLocaleLowerCase() },
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
        return []
      }

      const { approvedS1Tokens, approvedForAll, s2Migrations } = graphqlResponse.data.account as {
        approvedS1Tokens: Token[],
        approvedForAll: boolean,
        s2Migrations: GqlBadgeMigration[]
      }

      let approvedTokenIds = []

      if (approvedForAll){
        approvedTokenIds = [0,1,2,3,4,5,6,7]
      } else {
        approvedTokenIds = approvedS1Tokens.map(
          (token: Token) => parseInt(token.badgeId.toString()))
      }

      const migrations = s2Migrations.map((raw) => {
        if (!raw.s1Badge || !raw.s1Badge.badgeId) {
          throw new Error('BadgeMigrationAdapter: s1Badge or s1Badge.badgeId is missing')
        }

        const badgeId = parseInt(raw.s1Badge.badgeId?.toString())
        const tamperExpirationTimeout = parseInt(raw.tamperExpirationTimeout.toString())

        return {
          id: raw.id,
          s1Badge: {
            badgeId,
            tokenId: parseInt(raw.s1Badge.tokenId.toString()),
            address: trailblazersBadgesAddress[chainId],
            src: '',
            tokenUri: '',
          } satisfies NFT,
          isStarted: raw.isStarted,
          isCompleted: raw.isCompleted,
          pinkTampers: raw.pinkTampers,
          purpleTampers: raw.purpleTampers,
          claimExpirationTimeout: new Date(parseInt(raw.claimExpirationTimeout.toString()) * 1000),
          tamperExpirationTimeout:tamperExpirationTimeout > 0 ? new Date(tamperExpirationTimeout * 1000) : undefined,
          isApproved: approvedTokenIds.includes(badgeId)
        } satisfies BadgeMigration
      })



return migrations
/*

      // set the approvals
      */

    } catch (e){
      console.error(e)
      return []
    }
  }
}
