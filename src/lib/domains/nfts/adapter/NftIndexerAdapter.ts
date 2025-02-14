import { readContract } from '@wagmi/core';
import axios from 'axios';
import { type Address, erc721Abi } from 'viem';

import { trailblazersBadgesS2Abi } from '$generated/abi';
import type { NFT } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';
import { wagmiConfig } from '$shared/wagmi';

const ValidTokens = [
  '0x56b0d8d04de22f2539945258ddb288c123026775', //taikonauts
  '0xb941ac9ad2f10f38d9852b58cbff709573e665aa', //sentinels
];

export class NftIndexerAdapter {
  async fetchTokenForUser(address: Address): Promise<NFT[]> {
    try {
      const baseUrls = {
        167009: 'https://eventindexer.hekla.taiko.xyz',
        167000: 'https://eventindexer.mainnet.taiko.xyz',
      };

      const url = [baseUrls[chainId], '/nftsByAddress?', `address=${address}&`, `chainID=${chainId}`].join('');
      const res = await axios(url);

      const { items } = res.data;

      const nfts: NFT[] = [];

      for (const item of items) {
        if (!ValidTokens.includes(item.contractAddress.toLowerCase())) {
          console.warn('irrelevant nft found', item);
          continue;
        }

        if (item.contractType === 'ERC721') {
          const uri = await readContract(wagmiConfig, {
            abi: erc721Abi,
            address: item.contractAddress,
            functionName: 'tokenURI',
            args: [BigInt(item.tokenID)],
            chainId,
          });

          const { data: metadata } = await axios.get(uri);
          const { image } = metadata;
          nfts.push({
            address: item.contractAddress,
            tokenId: item.tokenID,
            tokenUri: uri,
            metadata: { image },
          });
        } else if (item.contractType === 'ERC1155') {
          const uri = await readContract(wagmiConfig, {
            abi: trailblazersBadgesS2Abi,
            address: item.contractAddress,
            functionName: 'uri',
            args: [BigInt(item.tokenID)],
            chainId,
          });

          const { data: metadata } = await axios.get(uri);
          const { video, image } = metadata;

          nfts.push({
            address: item.contractAddress,
            tokenId: item.tokenID,
            tokenUri: uri,
            metadata: { video, image },
          });
        } else {
          throw new Error(`Unrecognized contract type ${item.contractType}`);
        }
      }
      return nfts;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
