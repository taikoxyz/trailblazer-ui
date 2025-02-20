import { isAddressEqual } from 'viem';

import { taikoonTokenAddress } from '$generated/abi';
import type { NFT } from '$shared/types/NFT';

import { chainId } from '../chain';

export default function getNftImage(nft: NFT) {
  if (isAddressEqual(nft.address, taikoonTokenAddress[chainId])) {
    const image = nft.metadata.image as string;
    if (image.startsWith('http') || image.startsWith('/')) {
      return image;
    }
    return `https://ipfs.io/ipfs/${image}`;
  }
  return nft.metadata.image as string;
}
