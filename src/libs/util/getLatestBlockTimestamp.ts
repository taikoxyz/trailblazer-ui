import { getPublicClient } from '@wagmi/core';

import { ClientError } from '$libs/error';
import { wagmiConfig } from '$libs/wagmi';

export const getLatestBlockTimestamp = async (srcChainId: bigint) => {
  const client = getPublicClient(wagmiConfig, { chainId: Number(srcChainId) });
  if (!client) throw new ClientError('Client not found');
  const block = await client.getBlock({
    blockTag: 'latest',
  });
  return block.timestamp;
};
