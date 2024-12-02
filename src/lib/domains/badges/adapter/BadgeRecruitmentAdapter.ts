import { readContract, signMessage, watchContractEvent, writeContract } from '@wagmi/core';
import axios from 'axios';
import { type Address, parseSignature } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import {
  badgeRecruitmentAbi,
  badgeRecruitmentAddress,
  trailblazersBadgesAbi,
  trailblazersBadgesAddress,
} from '$generated/abi';
import type { BadgeRecruitment as GqlBadgeRecruitment } from '$generated/graphql';
import { type Movements, Seasons } from '$lib/domains/profile/types/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { type IBadgeRecruitment, RecruitmentStatus } from '$lib/shared/types/BadgeRecruitment';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import parseGqlBadgeRecruitment from '$lib/shared/utils/nfts/parseGqlBadgeRecruitment';
import { wagmiConfig } from '$lib/shared/wagmi';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { FETCH_ENABLED_MIGRATIONS_QUERY, GET_MIGRATION_STATUS_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';
import generateBadgeMetadata from '$shared/utils/nfts/generateBadgeMetadata';

const log = getLogger('BadgeRecruitmentAdapter');

export default class BadgeRecruitmentAdapter {
  /**
   * Fetches the currently-enabled recruitment s1 badge ids
   *
   * @return {*}  {Promise<number[]>}
   * @memberof BadgeRecruitmentAdapter
   */
  async fetchEnabledRecruitments(): Promise<number[]> {
    log('fetchEnabledRecruitments');
    const out: number[] = [];

    try {
      const graphqlResponse = await graphqlClient.query({
        query: FETCH_ENABLED_MIGRATIONS_QUERY,
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.openRecruitments) {
        // no open recruitments, skip
        return out;
      }

      const { openRecruitments } = graphqlResponse.data;
      log('fetchEnabledRecruitments result for openRecruitments', { openRecruitments });
      for (const recruitment of openRecruitments) {
        if (!recruitment.enabled) continue;
        const startTime = new Date(Number(recruitment.startTime) * 1000);
        const endTime = new Date(Number(recruitment.endTime) * 1000);
        if (Date.now() < startTime.getTime() || Date.now() > endTime.getTime()) {
          // recruitment is not active
          continue;
        }
        out.push(...recruitment.badgeIds.map((badgeId: bigint) => Number(badgeId)));
      }

      log('fetchEnabledRecruitments', { out });
      return out;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.openRecruitments is null') {
        // no open recruitments, skip
        return out;
      }
      console.error(e);
      throw e;
    }
  }

  /**
   * Calls the `startRecruitment` method through the s1 badges
   * @param address
   * @param nft
   * @param recruitment
   * @return {*}  {Promise<string>}
   * @memberof BadgeRecruitmentAdapter
   */
  async startRecruitment(address: Address, nft: NFT, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
    log('startRecruitment', { address, nft });
    return new Promise((resolve, reject) => {
      try {
        const unwatch = watchContractEvent(wagmiConfig, {
          address: badgeRecruitmentAddress[chainId],
          abi: badgeRecruitmentAbi,
          eventName: 'RecruitmentUpdated',
          args: {
            user: address,
          },
          onLogs(logs) {
            const cooldownExpiration = new Date(parseInt(logs[0].args.cooldownExpiration!.toString()) * 1000);
            const s1TokenId = parseInt(logs[0].args.s1TokenId!.toString());
            unwatch();
            resolve({
              ...recruitment,
              claimExpirationTimeout: cooldownExpiration,
              status: RecruitmentStatus.CAN_REFINE,
              s1Badge: {
                ...recruitment.s1Badge,
                tokenId: s1TokenId,
              },
            });
          },
        });
        const badgeId = nft.metadata.badgeId as number;
        writeContract(wagmiConfig, {
          abi: trailblazersBadgesAbi,
          address: trailblazersBadgesAddress[chainId],
          functionName: 'startRecruitment',
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
   * Internal method to fetch the recruitment signature's from the backend
   *
   * @return {*}  {Promise<{ hash: Address; r: Address; s: Address; v: bigint; points: number;}>}
   * @memberof BadgeRecruitmentAdapter
   */
  private async _getRecruitmentSignature(
    address: Address,
    factionId: number,
    action: 'start' | 'end' | 'influence',
  ): Promise<{
    hash: Address;
    r: Address;
    s: Address;
    v: bigint;
    points: number;
  }> {
    // arbitrary challenge to prove the user owns the calling address
    const challenge = Date.now().toString();
    const challengeSignature = await signMessage(wagmiConfig, { message: challenge });
    const hashType = action === 'start' ? 1 : action === 'end' ? 2 : 3;
    const res = await axios.post(
      `${PUBLIC_TRAILBLAZER_API_URL}/s2/faction/migrate`,
      {
        address,
        signature: challengeSignature,
        message: challenge,
        badgeId: factionId,
        chainId,
        hashType,
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
      throw new Error('Invalid signature: r, s, or v value is missing or incorrect');
    }

    const hash = await readContract(wagmiConfig, {
      abi: badgeRecruitmentAbi,
      address: badgeRecruitmentAddress[chainId],
      functionName: 'generateClaimHash',
      args: [hashType, address, BigInt(points)],
      chainId,
    });

    return { r, s, v, points, hash };
  }

  /**
   * Execute a influence/influence on the recruitment
   *
   * @return {*}  {Promise<ActiveBadgeRecruitment>}
   * @memberof BadgeRecruitmentAdapter
   */
  async influenceRecruitment(
    address: Address,
    nft: NFT,
    selectedMovement: Movements,
    recruitment: IBadgeRecruitment,
  ): Promise<IBadgeRecruitment> {
    log('influenceRecruitment', { address, nft, recruitment });

    const { r, s, v, points, hash } = await this._getRecruitmentSignature(
      address,
      nft.metadata.badgeId as number,
      'influence',
    );

    return new Promise((resolve, reject) => {
      try {
        const unwatch = watchContractEvent(wagmiConfig, {
          address: badgeRecruitmentAddress[chainId],
          abi: badgeRecruitmentAbi,
          eventName: 'RecruitmentUpdated',
          args: {
            user: address,
          },
          onLogs(logs) {
            const influenceExpiration = new Date(parseInt(logs[0].args.influenceExpiration!.toString()) * 1000);
            const whaleInfluences = parseInt(logs[0].args.whaleInfluences!.toString());
            const minnowInfluences = parseInt(logs[0].args.minnowInfluences!.toString());
            unwatch();
            resolve({
              ...recruitment,
              influenceExpirationTimeout: influenceExpiration,
              whaleInfluences,
              minnowInfluences,
            });
          },
        });
        writeContract(wagmiConfig, {
          abi: badgeRecruitmentAbi,
          address: badgeRecruitmentAddress[chainId],
          functionName: 'influenceRecruitment',
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
   * Complete/end the recruitment
   *
   * @return {*}  {Promise<NFT>}
   * @memberof BadgeRecruitmentAdapter
   */
  async endRecruitment(address: Address, nft: NFT, recruitment: IBadgeRecruitment): Promise<IBadgeRecruitment> {
    if (nft.metadata.badgeId === undefined) {
      throw new Error('Badge ID is required for ending recruitment');
    }

    const { r, s, v, points, hash } = await this._getRecruitmentSignature(
      address,
      nft.metadata.badgeId as number,
      'end',
    );

    return new Promise((resolve, reject) => {
      try {
        const unwatch = watchContractEvent(wagmiConfig, {
          address: badgeRecruitmentAddress[chainId],
          abi: badgeRecruitmentAbi,
          eventName: 'RecruitmentComplete',
          args: {
            user: address,
          },
          onLogs(logs) {
            const { finalColor, s2TokenId } = logs[0].args;
            const movement = parseInt(finalColor!.toString()) as Movements;
            unwatch();
            resolve({
              ...recruitment,
              status: RecruitmentStatus.COMPLETED,
              s2Badge: {
                ...recruitment.s1Badge,
                tokenId: parseInt(s2TokenId!.toString()),
                metadata: {
                  ...recruitment.s1Badge.metadata,
                  ...generateBadgeMetadata(Seasons.Season2, recruitment.s1Badge.metadata.badgeId as number, movement),
                },
              },
            });
          },
        });

        writeContract(wagmiConfig, {
          abi: badgeRecruitmentAbi,
          address: badgeRecruitmentAddress[chainId],
          functionName: 'endRecruitment',
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
   * Fetch recruitments for the user
   *
   * @return {*}  {Promise<BadgeRecruitment>}
   * @memberof BadgeRecruitmentAdapter
   */
  async getRecruitmentStatus(address: Address): Promise<Partial<IBadgeRecruitment>[]> {
    log('getRecruitmentStatus', { address });

    try {
      await graphqlClient.cache.reset();
      const graphqlResponse = await graphqlClient.query({
        query: GET_MIGRATION_STATUS_QUERY,
        variables: { address: address.toLocaleLowerCase() },
        fetchPolicy: 'no-cache',
      });

      const enabledBadgeIds = await this.fetchEnabledRecruitments();

      if (!graphqlResponse) {
        return [];
      }

      const { s2Recruitments } = (graphqlResponse.data?.account as {
        s2Recruitments: GqlBadgeRecruitment[];
      }) || { s2Recruitments: [] };

      const recruitments = enabledBadgeIds.map((badgeId) => {
        const rawRecruitment = s2Recruitments.find(
          (recruitment) => parseInt(recruitment.s1Badge.badgeId.toString()) === badgeId,
        );
        if (!rawRecruitment) {
          return {
            badgeId,
            status: RecruitmentStatus.NOT_STARTED,
          } as Partial<IBadgeRecruitment>;
        }
        return parseGqlBadgeRecruitment(rawRecruitment);
      });

      return recruitments;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async getMaxInfluences(exp: number): Promise<number> {
    const max = await readContract(wagmiConfig, {
      abi: badgeRecruitmentAbi,
      address: badgeRecruitmentAddress[chainId],
      functionName: 'maxInfluences',
      args: [BigInt(exp)],
      chainId,
    });

    return Number(max);
  }
}
