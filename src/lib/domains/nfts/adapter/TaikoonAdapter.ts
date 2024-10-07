import axios from 'axios';
import type { Address } from 'viem';

import { taikoonTokenAddress } from '$generated/abi';
import Taikoon from '$lib/domains/nfts/types/taikoon';
import { globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { getLogger } from '$libs/util/logger';

const log = getLogger('TaikoonAdapter');
export class TaikoonAdapter {
  /**
   * Fetches user Taikoon NFTs from the Taikoon contract.
   *
   * @param {Address} address the user's address
   * @return {*}  {Promise<NFT[]>}
   * @memberof TaikoonAdapter
   */
  async fetchUserTaikoonNFTs(address: Address): Promise<NFT[]> {
    const tokenIds = await Taikoon.tokenOfOwner(address);
    const out: NFT[] = [];
    for (const tokenId of tokenIds) {
      const uri = await Taikoon.tokenURI(tokenId);
      log('fetchUserTaikoonNFTs', { uri });
      const metadata = await axios({
        ...globalAxiosConfig,
        url: `/api/proxy?url=${uri}`,
      });

      log('fetchUserTaikoonNFTs', { metadata });

      const tokenUri = metadata.data.image;
      out.push({
        address: taikoonTokenAddress[chainId],
        tokenId,
        src: tokenUri,
        tokenUri,
      } satisfies NFT);
    }

    return out;
  }
}
