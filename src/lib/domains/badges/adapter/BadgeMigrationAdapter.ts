import { readContract, signMessage, watchContractEvent, writeContract } from '@wagmi/core';
import axios from 'axios';
import { type Address, parseSignature } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import {
  badgeMigrationAbi,
  badgeMigrationAddress,
  trailblazersBadgesAbi,
  trailblazersBadgesAddress,
} from '$generated/abi';
import type { BadgeMigration as GqlBadgeMigration, Token } from '$generated/graphql';
import type { Movements } from '$lib/domains/profile/types/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { FETCH_ENABLED_MIGRATIONS_QUERY, GET_MIGRATION_STATUS_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';
import getBadgeURI from '$shared/utils/nfts/getBadgeURI';

import parseGqlBadgeMigration from '../utils/parseGqlBadgeMigration';

const log = getLogger('BadgeMigrationAdapter');

export class BadgeMigrationAdapter {
  constructor() {
    log('constructor');
  }
  /**
   * Fetches the currently-enabled migration s1 badge ids
   *
   * @return {*}  {Promise<number[]>}
   * @memberof BadgeMigrationAdapter
   */
  async fetchEnabledMigrations(): Promise<number[]> {
    log('fetchEnabledMigrations');
    const out: number[] = [];

    try {
      const graphqlResponse = await graphqlClient.query({
        query: FETCH_ENABLED_MIGRATIONS_QUERY,
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
      console.error(e);
      throw e;
    }
  }

  /**
   * Calls the `startMigration` method through the s1 bnadges
   *
   * @return {*}  {Promise<string>}
   * @memberof BadgeMigrationAdapter
   */
  async startMigration(address: Address, nft: NFT): Promise<NFT> {
    log('startMigration', { address, nft });
    const badgeId = nft.metadata.badgeId as number;
    await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'startMigration',
      args: [BigInt(badgeId)],
      chainId,
    });

    return new Promise((resolve, reject) => {
      try {
        this._listenForMigrationEnd(address, nft, resolve);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Internal method to fetch the migration signature's from the backend
   *
   * @return {*}  {Promise<{ hash: Address; r: Address; s: Address; v: bigint; points: number;}>}
   * @memberof BadgeMigrationAdapter
   */
  private async _getMigrationSignature(
    address: Address,
    factionId: number,
  ): Promise<{
    hash: Address;
    r: Address;
    s: Address;
    v: bigint;
    points: number;
  }> {
    const challenge = Date.now().toString();
    const challengeSignature = await signMessage(wagmiConfig, { message: challenge });

    const res = await axios.post(
      `${PUBLIC_TRAILBLAZER_API_URL}/s2/faction/migrate`,
      {
        address,
        signature: challengeSignature,
        message: challenge,
        badgeId: factionId,
        chainId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        ...globalAxiosConfig,
      },
    );

    const { signature: rawSignature, points } = res.data;
    const mintSignature = `0x${rawSignature}` as Address;
    const { r, s, v } = parseSignature(mintSignature);

    if (!r || !s || !v) {
      throw new Error('Invalid signature');
    }

    const hash = await readContract(wagmiConfig, {
      abi: badgeMigrationAbi,
      address: badgeMigrationAddress[chainId],
      functionName: 'generateClaimHash',
      args: [address, BigInt(points)],
      chainId,
    });

    return { r, s, v, points, hash };
  }

  /**
   * Execute a tamper/refine on the migration
   *
   * @return {*}  {Promise<string>}
   * @memberof BadgeMigrationAdapter
   */
  async refineMigration(address: Address, nft: NFT, selectedMovement: Movements): Promise<NFT> {
    log('refineMigration', { address, nft });

    const { r, s, v, points, hash } = await this._getMigrationSignature(address, nft.metadata.badgeId as number);

    await writeContract(wagmiConfig, {
      abi: badgeMigrationAbi,
      address: badgeMigrationAddress[chainId],
      functionName: 'tamperMigration',
      args: [hash, Number(v), r, s, BigInt(points), selectedMovement],
      chainId,
    });

    return new Promise((resolve, reject) => {
      try {
        this._listenForMigrationEnd(address, nft, resolve);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Complete/end the migration
   *
   * @return {*}  {Promise<NFT>}
   * @memberof BadgeMigrationAdapter
   */
  async endMigration(address: Address, nft: NFT): Promise<NFT> {
    if (nft.metadata.badgeId === undefined) {
      throw new Error('Badge ID is required');
    }

    const { r, s, v, points, hash } = await this._getMigrationSignature(address, nft.metadata.badgeId as number);
    await writeContract(wagmiConfig, {
      abi: badgeMigrationAbi,
      address: badgeMigrationAddress[chainId],
      functionName: 'endMigration',
      args: [hash, Number(v), r, s, BigInt(points)],
      chainId,
    });

    return new Promise((resolve, reject) => {
      try {
        this._listenForMigrationEnd(address, nft, resolve);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Fetch migrations for the user
   *
   * @return {*}  {Promise<BadgeMigration>}
   * @memberof BadgeMigrationAdapter
   */
  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });

    try {
      const graphqlResponse = await graphqlClient.query({
        query: GET_MIGRATION_STATUS_QUERY,
        variables: { address: address.toLocaleLowerCase() },
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
        return [];
      }

      const { approvedS1Tokens, approvedForAll, s2Migrations } = graphqlResponse.data.account as {
        approvedS1Tokens: Token[];
        approvedForAll: boolean;
        s2Migrations: GqlBadgeMigration[];
      };

      let approvedTokenIds = [];

      if (approvedForAll) {
        approvedTokenIds = [0, 1, 2, 3, 4, 5, 6, 7];
      } else {
        approvedTokenIds = approvedS1Tokens.map((token: Token) => parseInt(token.badgeId.toString()));
      }

      const migrations = s2Migrations.map(async (raw) => {
        return parseGqlBadgeMigration(raw, approvedTokenIds);
      });

      return Promise.all(migrations);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
   * Listener for the migration's completion
   *
   * @return {*}  {Promise<NFT>}
   * @memberof BadgeMigrationAdapter
   */
  private async _listenForMigrationEnd(address: Address, token: NFT, callback: (nft: NFT) => void): Promise<void> {
    const unwatch = watchContractEvent(wagmiConfig, {
      address: badgeMigrationAddress[chainId],
      abi: badgeMigrationAbi,
      eventName: 'MigrationComplete',
      args: {
        user: address,
      },
      onLogs(logs) {
        const { finalColor, s2TokenId } = logs[0].args;
        const movement = parseInt(finalColor!.toString()) as Movements;
        const uri = getBadgeURI(token.metadata.badgeId as number, movement);

        callback({
          ...token,
          tokenId: parseInt(s2TokenId!.toString()),
          metadata: {
            ...token.metadata,
            movement,
            image: `${uri}.png`,
            'video/mp4': `${uri}.mp4`,
            'video/webm': `${uri}.webm`,
          },
        });
        unwatch();
      },
    });
  }
}
