import type { NFT } from '$shared/types/NFT';

export default function getNftImage(nft: NFT) {
  return nft.metadata.image as string;
}
