import { readContract, watchAsset, writeContract } from '@wagmi/core';
import { type Address, type Hex, parseEther } from 'viem';

import { erc20AirdropAbi, erc20AirdropAddress, erc20TaikoTokenAddress } from '$generated/abi';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';

import type { ClaimEligibilityDto, ClaimProofResponseDto } from '../dto/ClaimServer.dto';

const log = getLogger('ClaimClientAdapter');

export class ClaimClientAdapter {
  /**
   * Check user eligibility for claiming tokens.
   * This calls the external API directly using fetchFromApi.
   * @param address - The user's wallet address
   * @returns Eligibility data with address and claimable value
   */
  async checkEligibility(address: Address): Promise<ClaimEligibilityDto> {
    log('Checking eligibility for %s', address);

    const eligibilityData = await fetchFromApi<ClaimEligibilityDto>(
      `/claim/eligibility?address=${encodeURIComponent(address)}`,
      4,
    );
    log('Eligibility response', eligibilityData);
    return eligibilityData;
  }

  /**
   * Execute claim transaction client-side using proof from server
   * This gets the proof from our serverside endpoint, then executes the transaction client-side.
   * @param address - The user's wallet address
   * @returns Transaction hash
   */
  async executeClaim(address: Address): Promise<Hex> {
    log('Executing claim for %s', address);

    // Get the proof from our server-side endpoint (this handles the API key internally)
    const response = await fetch('/api/s4/claim/proof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch proof: ${response.status} ${response.statusText}`);
    }

    const proofResponse = (await response.json()) as ClaimProofResponseDto;

    // Execute the claim transaction client-side using the proof
    const tx = await writeContract(wagmiConfig, {
      abi: erc20AirdropAbi,
      address: erc20AirdropAddress[chainId],
      functionName: 'claim',
      args: [address, parseEther(proofResponse.amount), JSON.parse(proofResponse.proof)],
    });

    log('Claim executed with tx hash %s', tx);
    return tx;
  }

  /**
   * Check if the user has already claimed tokens.
   * This reads from the contract directly since it's public information.
   * @param address - The user's wallet address
   * @param season - The season number
   * @returns Whether the user has already claimed
   */
  async hasClaimed(address: Address, season: number): Promise<boolean | null> {
    log('Checking if %s has claimed in season %s', address, season);

    try {
      // First get the eligibility to know the claim amount
      const eligibility = await this.checkEligibility(address);

      const result = await readContract(wagmiConfig, {
        abi: erc20AirdropAbi,
        address: erc20AirdropAddress[chainId],
        functionName: 'hasClaimed',
        args: [address, parseEther(eligibility.value.toString())],
      });

      log('Has claimed %s', result);
      return result;
    } catch (error) {
      log('Error checking if %s has claimed in season %s', address, season);
      return null;
    }
  }

  /**
   * Add the token to the wallet for user convenience.
   * @returns Whether the token was successfully added to the wallet
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
