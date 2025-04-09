import { readContract, watchAsset, writeContract } from '@wagmi/core';
import { type Address, type Hash, parseEther } from 'viem';

import { erc20AirdropAbi, erc20AirdropAddress, erc20TaikoTokenAddress } from '$generated/abi';
import { getAxiosInstance } from '$shared/services/api/axiosClient';
import { chainId } from '$shared/utils/chain';
import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';

import type { PreflightDTO } from '../dto/prefilght.dto';

const log = getLogger('ClaimAdapter');

export class ClaimAdapter {
  /**
   * Check if the user has claimed the token
   *
   * @param {Address} address
   * @return {*}  {Promise<boolean>}
   * @memberof ClaimAdapter
   */
  async hasClaimed(address: Address, season: number): Promise<boolean | null> {
    log('Checking if %s has claimed in season %s', address, season);
    try {
      const { value } = await this.preflight(address, season);

      log('claim contract address: %s', erc20AirdropAddress[chainId]);
      const res = await readContract(wagmiConfig, {
        abi: erc20AirdropAbi,
        address: erc20AirdropAddress[chainId],
        functionName: 'hasClaimed',
        args: [address, parseEther(value.toString())],
      });
      log('Has claimed %s', res);
      return res;
    } catch (error) {
      log('Error checking if %s has claimed in season %s', address, season);
      return null;
    }
  }

  /**
   * Claim the rewards
   *
   * @param {Address} address
   * @param {number} amount
   * @param {string} proof
   * @return {*}  {Promise<Hash>}
   * @memberof ClaimAdapter
   */
  async claim(address: Address, amount: number, proof: string): Promise<Hash> {
    log('Claiming %s for %s', amount, address);

    const tx = await writeContract(wagmiConfig, {
      abi: erc20AirdropAbi,
      address: erc20AirdropAddress[chainId],
      functionName: 'claim',
      args: [address, parseEther(amount.toString()), JSON.parse(proof)],
    });
    log('Claimed tx hash %s', tx);
    return tx;
  }

  /**
   * Preflight check for the claim
   *
   * @param {Address} address
   * @param {number} season
   * @return {*}  {Promise<PreflightDTO>}
   * @memberof ClaimAdapter
   */
  async preflight(address: Address, season: number): Promise<PreflightDTO> {
    log('Preflight for %s in season %s', address, season);

    const client = getAxiosInstance(season);
    const endpoint = isDevelopmentEnv
      ? 'https://trailblazer.qa.taiko.xyz/s3/claim/proof'
      : 'https://trailblazer.mainnet.taiko.xyz/s3/claim/proof';
    const res = await client.get<PreflightDTO>(endpoint, {
      params: {
        address: address,
      },
    });
    log('Preflight response', res.data);
    return res.data;
  }

  /**
   * Add the token to the wallet
   *
   * @memberof ClaimAdapter
   */
  async addTokenToWallet(): Promise<boolean> {
    const watched = await watchAsset(wagmiConfig, {
      type: 'ERC20',
      options: {
        address: erc20TaikoTokenAddress[chainId],
        decimals: 18,
        symbol: 'TAIKO',
      },
    });
    return watched;
  }
}
