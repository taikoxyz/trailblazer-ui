import { isAddressEqual } from 'viem';

import { taikoonTokenAddress } from '$generated/abi';
import type { NFT } from '$shared/types/NFT';

import { chainId } from '../chain';

export default function getNftImage(nft: NFT) {
  if (isAddressEqual(nft.address, taikoonTokenAddress[chainId])) {
    return `https://ipfs.io/ipfs/${nft.metadata.image}`;
  }
  return nft.metadata.image as string;
}
