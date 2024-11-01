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
import type { BadgeMigration as GqlBadgeMigration } from '$generated/graphql';
import { type Movements, Seasons } from '$lib/domains/profile/types/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { type IBadgeMigration, MigrationStatus } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import parseGqlBadgeMigration from '$lib/shared/utils/nfts/parseGqlBadgeMigration';
import { wagmiConfig } from '$lib/shared/wagmi';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { FETCH_ENABLED_MIGRATIONS_QUERY, GET_MIGRATION_STATUS_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';
import generateBadgeMetadata from '$shared/utils/nfts/generateBadgeMetadata';

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
   * Calls the `startMigration` method through the s1 badges
   *
   * @return {*}  {Promise<string>}
   * @memberof BadgeMigrationAdapter
   */
  async startMigration(address: Address, nft: NFT, migration: IBadgeMigration): Promise<IBadgeMigration> {
    log('startMigration', { address, nft });
    return new Promise((resolve, reject) => {
      try {
        const unwatch = watchContractEvent(wagmiConfig, {
          address: badgeMigrationAddress[chainId],
          abi: badgeMigrationAbi,
          eventName: 'MigrationUpdated',
          args: {
            user: address,
          },
          onLogs(logs) {
            const cooldownExpiration = new Date(parseInt(logs[0].args.cooldownExpiration!.toString()) * 1000);
            const s1TokenId = parseInt(logs[0].args.s1TokenId!.toString());
            unwatch();
            resolve({
              ...migration,
              claimExpirationTimeout: cooldownExpiration,
              status: MigrationStatus.CAN_REFINE,
              s1Badge: {
                ...migration.s1Badge,
                tokenId: s1TokenId,
              },
            });
          },
        });
        const badgeId = nft.metadata.badgeId as number;
        writeContract(wagmiConfig, {
          abi: trailblazersBadgesAbi,
          address: trailblazersBadgesAddress[chainId],
          functionName: 'startMigration',
          args: [BigInt(badgeId)],
          chainId,
        }).catch(reject);
      } catch (e) {
        console.error(e);
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
   * @return {*}  {Promise<ActiveBadgeMigration>}
   * @memberof BadgeMigrationAdapter
   */
  async refineMigration(
    address: Address,
    nft: NFT,
    selectedMovement: Movements,
    migration: IBadgeMigration,
  ): Promise<IBadgeMigration> {
    log('refineMigration', { address, nft, migration });

    const { r, s, v, points, hash } = await this._getMigrationSignature(address, nft.metadata.badgeId as number);

    return new Promise((resolve, reject) => {
      try {
        const unwatch = watchContractEvent(wagmiConfig, {
          address: badgeMigrationAddress[chainId],
          abi: badgeMigrationAbi,
          eventName: 'MigrationUpdated',
          args: {
            user: address,
          },
          onLogs(logs) {
            const tamperExpiration = new Date(parseInt(logs[0].args.tamperExpiration!.toString()) * 1000);
            const whaleTampers = parseInt(logs[0].args.whaleTampers!.toString());
            const minnowTampers = parseInt(logs[0].args.minnowTampers!.toString());
            unwatch();
            resolve({
              ...migration,
              tamperExpirationTimeout: tamperExpiration,
              whaleTampers,
              minnowTampers,
            });
          },
        });
        writeContract(wagmiConfig, {
          abi: badgeMigrationAbi,
          address: badgeMigrationAddress[chainId],
          functionName: 'tamperMigration',
          args: [hash, Number(v), r, s, BigInt(points), selectedMovement],
          chainId,
        }).catch(reject);
      } catch (e) {
        console.error(e);
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
  async endMigration(address: Address, nft: NFT, migration: IBadgeMigration): Promise<IBadgeMigration> {
    if (nft.metadata.badgeId === undefined) {
      throw new Error('Badge ID is required');
    }

    const { r, s, v, points, hash } = await this._getMigrationSignature(address, nft.metadata.badgeId as number);

    return new Promise((resolve, reject) => {
      try {
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
            unwatch();
            resolve({
              ...migration,
              status: MigrationStatus.COMPLETED,
              s2Badge: {
                ...migration.s1Badge,
                tokenId: parseInt(s2TokenId!.toString()),
                metadata: {
                  ...migration.s1Badge.metadata,
                  ...generateBadgeMetadata(Seasons.Season2, migration.s1Badge.metadata.badgeId as number, movement),
                },
              },
            });
          },
        });

        writeContract(wagmiConfig, {
          abi: badgeMigrationAbi,
          address: badgeMigrationAddress[chainId],
          functionName: 'endMigration',
          args: [hash, Number(v), r, s, BigInt(points)],
          chainId,
        }).catch(reject);
      } catch (e) {
        console.error(e);
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
  async getMigrationStatus(address: Address): Promise<Partial<IBadgeMigration>[]> {
    log('getMigrationStatus', { address });

    try {
      await graphqlClient.cache.reset();
      const graphqlResponse = await graphqlClient.query({
        query: GET_MIGRATION_STATUS_QUERY,
        variables: { address: address.toLocaleLowerCase() },
        fetchPolicy: 'no-cache',
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
        return [];
      }

      const { s2Migrations } = graphqlResponse.data.account as {
        s2Migrations: GqlBadgeMigration[];
      };

      const enabledBadgeIds = await this.fetchEnabledMigrations();

      const migrations = enabledBadgeIds.map((badgeId) => {
        const rawMigration = s2Migrations.find(
          (migration) => parseInt(migration.s1Badge.badgeId.toString()) === badgeId,
        );
        if (!rawMigration) {
          return {
            badgeId,
            status: MigrationStatus.NOT_STARTED,
          } as Partial<IBadgeMigration>;
        }
        return parseGqlBadgeMigration(rawMigration);
      });

      return migrations;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
