import {
  readContract,
  readContracts,
  signMessage,
  simulateContract,
  watchContractEvent,
  writeContract,
} from '@wagmi/core';
import { parseSignature, recoverAddress, type Address } from 'viem';

import {
  badgeRecruitmentAbi,
  badgeRecruitmentAddress,
  trailblazersBadgesAbi,
  trailblazersBadgesAddress,
} from '$generated/abi';
import { type IBadgeRecruitment } from '$shared/types/BadgeRecruitment';
import type { TBBadge } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';
import { getAxiosInstance } from '$shared/services/api/axiosClient';

const log = getLogger('BadgeRecruitmentAdapter');

export default class BadgeRecruitmentAdapter {
  /**
   * Fetches the currently-enabled recruitment s1 badge ids
   *
   * @return {*}  {Promise<number[]>}
   * @memberof BadgeRecruitmentAdapter
   */
  async fetchEnabledRecruitments(cycleId: number): Promise<number[]> {
    log('fetchEnabledRecruitments');
    const out: number[] = [];

    type RecruitmentContractResponse = {
      cycleId: bigint;
      startTime: bigint;
      endTime: bigint;
      s1BadgeIds: readonly bigint[];
    };
    try {
      const recruitments: RecruitmentContractResponse = await readContract(wagmiConfig, {
        abi: badgeRecruitmentAbi,
        address: badgeRecruitmentAddress[chainId],
        functionName: 'getRecruitmentCycle',
        args: [BigInt(cycleId)],
        chainId,
      });
      log('fetchEnabledRecruitments result for openRecruitments', { recruitments });

      const { startTime, endTime, s1BadgeIds } = recruitments;

      const start = new Date(Number(startTime) * 1000);
      const end = new Date(Number(endTime) * 1000);
      if (Date.now() >= start.getTime() && Date.now() <= end.getTime()) {
        out.push(...s1BadgeIds.map((badgeId: bigint) => Number(badgeId)));
      }
      return out;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
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
  async startRecruitment(address: Address, badge: TBBadge): Promise<IBadgeRecruitment> {
    log('startRecruitment', { address, badge });
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
            log('startRecruitment logs', logs);
            // const cooldownExpiration = new Date(parseInt(logs[0].args.cooldownExpiration!.toString()) * 1000);
            // const s1TokenId = parseInt(logs[0].args.s1TokenId!.toString());
            unwatch();
            resolve({
              whaleInfluences: 0n,
              minnowInfluences: 0n,
              influenceExpiration: 0n,
              cooldownExpiration: 0n,
              s1BadgeId: BigInt(badge.badgeId),
              s1TokenId: BigInt(badge.tokenId),
              s2TokenId: 0n,
              user: address,
              recruitmentCycle: 0n,
            } satisfies IBadgeRecruitment);
          },
        });
        const badgeId = badge.badgeId as number;
        log('startRecruitment with', badgeId, badge.tokenId);

        simulateContract(wagmiConfig, {
          abi: trailblazersBadgesAbi,
          address: trailblazersBadgesAddress[chainId],
          functionName: 'startRecruitment',
          args: [BigInt(badgeId), BigInt(badge.tokenId)],
          chainId,
        })
          .then(() => {
            log('startRecruitment contract write success');
          })
          .catch(reject);

        writeContract(wagmiConfig, {
          abi: trailblazersBadgesAbi,
          address: trailblazersBadgesAddress[chainId],
          functionName: 'startRecruitment',
          args: [BigInt(badgeId), BigInt(badge.tokenId)],
          chainId,
        })
          .then(() => {
            log('startRecruitment contract write success');
          })
          .catch(reject);
      } catch (e) {
        console.error(e);
        log('startRecruitment error', e);
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

    const bypassMockApi = true;
    const season = 2;
    const client = getAxiosInstance(season, bypassMockApi);
    const res = await client.post('/faction/migrate', {
      address,
      signature: challengeSignature,
      message: challenge,
      badgeId: factionId,
      chainId,
      hashType,
    });

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
      args: [hashType, address, BigInt(Math.trunc(points))],
      chainId,
    });

    const recoveredSigner = await recoverAddress({
      hash,
      signature: mintSignature,
    });

    log('recoveredSigner', { recoveredSigner });
    return { r, s, v, points, hash };
  }

  //   /**
  //    * Execute a influence/influence on the recruitment
  //    *
  //    * @return {*}  {Promise<ActiveBadgeRecruitment>}
  //    * @memberof BadgeRecruitmentAdapter
  //    */
  //   async influenceRecruitment(
  //     address: Address,
  //     nft: TBBadge,
  //     selectedMovement: Movements,
  //     recruitment: IBadgeRecruitment,
  //   ): Promise<IBadgeRecruitment> {
  //     log('influenceRecruitment', { address, nft, recruitment });

  //     const { r, s, v, points, hash } = await this._getRecruitmentSignature(address, nft.badgeId as number, 'influence');

  //     return new Promise((resolve, reject) => {
  //       try {
  //         const unwatch = watchContractEvent(wagmiConfig, {
  //           address: badgeRecruitmentAddress[chainId],
  //           abi: badgeRecruitmentAbi,
  //           eventName: 'RecruitmentUpdated',
  //           args: {
  //             user: address,
  //           },
  //           onLogs(logs) {
  //             const influenceExpiration = new Date(parseInt(logs[0].args.influenceExpiration!.toString()) * 1000);
  //             const whaleInfluences = parseInt(logs[0].args.whaleInfluences!.toString());
  //             const minnowInfluences = parseInt(logs[0].args.minnowInfluences!.toString());
  //             unwatch();
  //             resolve({
  //               ...recruitment,
  //               influenceExpirationTimeout: influenceExpiration,
  //               whaleInfluences,
  //               minnowInfluences,
  //             });
  //           },
  //         });
  //         writeContract(wagmiConfig, {
  //           abi: badgeRecruitmentAbi,
  //           address: badgeRecruitmentAddress[chainId],
  //           functionName: 'influenceRecruitment',
  //           args: [hash, Number(v), r, s, BigInt(Math.trunc(points)), selectedMovement],
  //           chainId,
  //         }).catch(reject);
  //       } catch (e) {
  //         console.error(e);
  //         reject(e);
  //       }
  //     });
  //   }

  /**
   * Complete/end the recruitment
   *
   * @return {*}  {Promise<NFT>}
   * @memberof BadgeRecruitmentAdapter
   */
  async endRecruitment(address: Address, nft: TBBadge) {
    if (nft.badgeId === undefined) {
      throw new Error('Badge ID is required for ending recruitment');
    }

    const { r, s, v, points, hash } = await this._getRecruitmentSignature(address, nft.badgeId as number, 'end');

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
            log('endRecruitment logs', logs);
            unwatch();
            // const { finalColor, s2TokenId } = logs[0].args;
            // const movement = parseInt(finalColor!.toString()) as Movements;
            unwatch();
            resolve(logs);

            // ...(recruitment as ActiveRecruitment),
            // status: RecruitmentStatus.COMPLETED,
            // resultingMovement: movement,
            //   s2Badge: {
            //     ...recruitment.s1Badge,
            //     tokenId: parseInt(s2TokenId!.toString()),
            //     metadata: {
            //       ...recruitment.s1Badge.metadata,
            //       ...generateBadgeMetadata(Seasons.Season2, recruitment.s1Badge.badgeId as number, movement),
            //     },
            //   },
          },
        });

        writeContract(wagmiConfig, {
          abi: badgeRecruitmentAbi,
          address: badgeRecruitmentAddress[chainId],
          functionName: 'endRecruitment',
          args: [hash, Number(v), r, s, BigInt(Math.trunc(points))],
          chainId,
        }).catch(reject);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  // /**
  //  * Fetch recruitments for the user
  //  *
  //  * @return {*}  {Promise<BadgeRecruitment>}
  //  * @memberof BadgeRecruitmentAdapter
  //  */
  // async getRecruitmentStatus(address: Address): Promise<Partial<IBadgeRecruitment>[]> {
  //   log('getRecruitmentStatus', { address });
  //   try {
  //     await badgesSubgraphClient.cache.reset();
  //     const graphqlResponse = await badgesSubgraphClient.query({
  //       query: GET_MIGRATION_STATUS_QUERY,
  //       variables: { address: address.toLocaleLowerCase() },
  //       fetchPolicy: 'no-cache',
  //     });

  //     const enabledBadgeIds = await this.fetchEnabledRecruitments();

  //     if (!graphqlResponse) {
  //       return [];
  //     }

  //     const { s2Recruitments } = (graphqlResponse.data?.account as {
  //       s2Recruitments: GqlBadgeRecruitment[];
  //     }) || { s2Recruitments: [] };

  //     const recruitments = enabledBadgeIds.map((badgeId) => {
  //       const rawRecruitments = s2Recruitments.filter((recruitment) => Number(recruitment.s1Badge.badgeId) === badgeId);

  //       return rawRecruitments.map((rawRecruitment) => {
  //         if (!rawRecruitment) {
  //           return {
  //             badgeId,
  //             status: RecruitmentStatus.NOT_STARTED,
  //           } as Partial<IBadgeRecruitment>;
  //         }
  //         return parseGqlBadgeRecruitment(rawRecruitment);
  //       });
  //     });

  //     const resolvedRecruitments = await Promise.all(recruitments.flat());
  //     return resolvedRecruitments;
  //   } catch (e) {
  //     console.error(e);
  //     return [];
  //   }
  // }

  async getRecruitmentStatusForUser(address: Address): Promise<IBadgeRecruitment> {
    const recruitment: IBadgeRecruitment = await readContract(wagmiConfig, {
      abi: badgeRecruitmentAbi,
      address: badgeRecruitmentAddress[chainId],
      functionName: 'getActiveRecruitmentFor',
      args: [address],
      chainId,
    });

    // const parsedRecruitment: Partial<IBadgeRecruitment> = {
    //   badgeId: Number(recruitment.s1BadgeId),
    //   whaleInfluences: Number(recruitment.whaleInfluences),
    //   minnowInfluences: Number(recruitment.minnowInfluences),
    //   claimExpirationTimeout: new Date(Number(recruitment.cooldownExpiration) * 1000),
    // };

    log('getRecruitmentStatusForUser', { recruitment });
    return recruitment;
  }

  /**
   * Check if a wallet has recruited a badge in a given cycle
   *
   * @param badgeId
   * @return {*}  {Promise<TBBadge>}
   * @memberof BadgeRecruitmentAdapter
   */
  async hasRecruitedInCycle(address: Address, cycle: number, badgeId: number): Promise<boolean> {
    const recruitmentCall = {
      abi: badgeRecruitmentAbi,
      address: badgeRecruitmentAddress[chainId],
    } as const;

    const result = await readContracts(wagmiConfig, {
      contracts: [
        {
          ...recruitmentCall,
          functionName: 'recruitmentCycleUniqueMints',
          args: [BigInt(cycle), address, BigInt(badgeId), 0],
        },
        {
          ...recruitmentCall,
          functionName: 'recruitmentCycleUniqueMints',
          args: [BigInt(cycle), address, BigInt(badgeId), 1],
        },
        {
          ...recruitmentCall,
          functionName: 'recruitmentCycleUniqueMints',
          args: [BigInt(cycle), address, BigInt(badgeId), 2],
        },
      ],
    });

    const hasRecruited = result.some((r) => r.result === true);
    log('hasRecruitedInCycle', { result, hasRecruited });
    return hasRecruited;
  }

  //   /**
  //    * Fetch the user's max influences, based on exp
  //    *
  //    * @param exp
  //    * @return {*}  {Promise<number>}
  //    * @memberof BadgeRecruitmentAdapter
  //    */
  //   async getMaxInfluences(exp: number): Promise<number> {
  //     log('getMaxInfluences', { exp });
  //     const max = await readContract(wagmiConfig, {
  //       abi: badgeRecruitmentAbi,
  //       address: badgeRecruitmentAddress[chainId],
  //       functionName: 'maxInfluences',
  //       args: [BigInt(Math.trunc(exp))],
  //       chainId,
  //     });

  //     return Number(max);
  //   }

  /**
   * Fetch current recruitment cycle id
   *
   * @return {*}  {Promise<number>}
   * @memberof BadgeRecruitmentAdapter
   */
  async getRecruitmentCycleId(): Promise<number> {
    log('getRecruitmentCycleId');
    const cycleId = await readContract(wagmiConfig, {
      abi: badgeRecruitmentAbi,
      address: badgeRecruitmentAddress[chainId],
      functionName: 'recruitmentCycleId',
      chainId,
    });
    return Number(cycleId);
  }

  //   /**
  //    * Resets the migration for a given token, cycle and user
  //    *
  //    * @param tokenId
  //    * @param badgeId
  //    * @param cycleId
  //    * @return {*}  {Promise<void>}
  //    * @memberof BadgeRecruitmentAdapter
  //    */
  //   async resetMigration(tokenId: number, badgeId: number, cycleId: number): Promise<void> {
  //     log('resetMigration', { tokenId, badgeId, cycleId });
  //     const hash = await writeContract(wagmiConfig, {
  //       abi: trailblazersBadgesAbi,
  //       address: trailblazersBadgesAddress[chainId],
  //       functionName: 'resetMigration',
  //       args: [BigInt(tokenId), BigInt(badgeId), BigInt(cycleId)],
  //       chainId,
  //     });

  //     await waitForTransactionReceipt(wagmiConfig, { hash });
  //   }
}
