import { readContract } from '@wagmi/core';
import axios from 'axios';
import { vi } from 'vitest';

import { globalAxiosConfig } from '$shared/services/api/axiosClient';

import { NftIndexerAdapter, PfpIndexedTokens } from './NftIndexerAdapter';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('@wagmi/core', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    readContract: vi.fn(),
  };
});

describe('NftIndexerAdapter', () => {
  const indexer = new NftIndexerAdapter();

  beforeAll(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: { items: [] } });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return NFTs for valid token contracts', async () => {
    const mockNfts = [
      {
        tokenID: '1',
        contractType: 'ERC1155',
        contractAddress: PfpIndexedTokens[0],
      },
    ];

    const mockMetadata = { image: 'https://mock-image.com/123' };

    vi.mocked(axios.get).mockResolvedValueOnce({ data: { items: mockNfts } });
    vi.mocked(readContract).mockResolvedValueOnce('https://mock-uri.com');
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockMetadata });

    const res = await indexer.fetchTokenForUser('0x123');

    expect(axios.get).toHaveBeenCalledTimes(2);

    expect(axios.get).toHaveBeenCalledWith(
      'https://eventindexer.mainnet.taiko.xyz/nftsByAddress?address=0x123&chainID=167000',
      globalAxiosConfig,
    );

    expect(axios.get).toHaveBeenCalledWith('https://mock-uri.com', globalAxiosConfig);

    expect(res).toEqual([
      {
        address: PfpIndexedTokens[0],
        tokenId: '1',
        tokenUri: 'https://mock-uri.com',
        metadata: { image: 'https://mock-image.com/123' },
      },
    ]);
  });
});
