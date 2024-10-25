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
import { pendingTransactions } from '$lib/shared/stores/pendingTransactions';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { FETCH_ENABLED_MIGRATIONS_QUERY, GET_MIGRATION_STATUS_GQL } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';
import getBadgeURI from '$shared/utils/nfts/getBadgeURI';

const log = getLogger('BadgeMigrationAdapter');

export class BadgeMigrationAdapter {
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
  async startMigration(factionId: number): Promise<string> {
    log('startMigration', { factionId });

    const tx = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'startMigration',
      args: [BigInt(factionId)],
      chainId,
    });

    await pendingTransactions.add(tx);

    return tx;
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
  async refineMigration(address: Address, factionId: number, movement: Movements): Promise<string> {
    log('refineMigration', { address, factionId, movement });

    const { r, s, v, points, hash } = await this._getMigrationSignature(address, factionId);
    const tx = await writeContract(wagmiConfig, {
      abi: badgeMigrationAbi,
      address: badgeMigrationAddress[chainId],
      functionName: 'tamperMigration',
      args: [hash, Number(v), r, s, BigInt(points), movement],
      chainId,
    });

    await pendingTransactions.add(tx);

    return tx;
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

    //await pendingTransactions.add(tx);
    return new Promise((resolve, reject) => {
      try {
        this.listenForMigrationEnd(address, nft, resolve);
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
        query: GET_MIGRATION_STATUS_GQL,
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

      const migrations = s2Migrations.map((raw) => {
        const s1badgeId = parseInt(raw.s1Badge.badgeId.toString());
        const uri = getBadgeURI(s1badgeId);
        const s1Badge = {
          tokenId: parseInt(raw.s1Badge.tokenId.toString()),
          address: trailblazersBadgesAddress[chainId],
          metadata: {
            badgeId: s1badgeId,
            image: `${uri}.png`,
            'video/mp4': `${uri}.mp4`,
            'video/webm': `${uri}.webm`,
          },
          tokenUri: '',
        } satisfies NFT;

        let s2Badge = undefined;
        if (raw.s2Badge) {
          const badgeId = parseInt(raw.s2Badge.badgeId.toString());
          const movement = parseInt(raw.s2Badge.movement) as Movements;
          const uri = getBadgeURI(s1badgeId);

          s2Badge = {
            tokenId: parseInt(raw.s2Badge.tokenId.toString()),
            address: trailblazersBadgesAddress[chainId],
            metadata: {
              movement,
              badgeId,
              image: `${uri}.png`,
              'video/mp4': `${uri}.mp4`,
              'video/webm': `${uri}.webm`,
            },
            tokenUri: '',
          } satisfies NFT;
        }
        const tamperExpirationTimeout = parseInt(raw.tamperExpirationTimeout.toString());
        const minuteBuffer = 60 * 1000;
        return {
          id: raw.id,
          s1Badge,
          s2Badge,
          isStarted: Boolean(raw.isStarted),
          isCompleted: Boolean(raw.isCompleted),
          devTampers: parseInt(raw.devTampers),
          whaleTampers: parseInt(raw.whaleTampers),
          minnowTampers: parseInt(raw.minnowTampers),
          claimExpirationTimeout: new Date(minuteBuffer + parseInt(raw.claimExpirationTimeout.toString()) * 1000),
          tamperExpirationTimeout:
            tamperExpirationTimeout > 0 ? new Date(minuteBuffer + tamperExpirationTimeout * 1000) : undefined,
          isApproved: s1Badge ? approvedTokenIds.includes(parseInt(raw.s1Badge?.badgeId.toString())) : false,
        } satisfies BadgeMigration;
      });

      return migrations;
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
  async listenForMigrationEnd(address: Address, token: NFT, callback: (nft: NFT) => void): Promise<void> {
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
