import type { Address } from 'viem';

import { taikoonTokenAddress } from '$generated/abi';
import Taikoon from '$lib/domains/nfts/types/taikoon';
import { getAxiosInstance } from '$lib/shared/services/api/axiosClient';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';

export class TaikoonAdapter {
  /**
   * Fetches user Taikoon NFTs from the Taikoon contract.
   *
   * @param {Address} address the user's address
   * @return {*}  {Promise<NFT[]>}
   * @memberof TaikoonAdapter
   */
  async fetchUserTaikoonNFTs(address: Address): Promise<NFT[]> {
    const client = getAxiosInstance();
    const tokenIds = await Taikoon.tokenOfOwner(address);
    const out: NFT[] = [];
    for (const tokenId of tokenIds) {
      const uri = await Taikoon.tokenURI(tokenId);

      const metadata = await client({
        url: `/api/proxy?url=${uri}`,
      });

      const src = metadata.data.image;
      out.push({
        address: taikoonTokenAddress[chainId],
        tokenId,
        src,
      } satisfies NFT);
    }

    return out;
  }
}
