//import axios from 'axios';
//import type { Address } from 'viem';

//import { chainId } from '$libs/chain';
//import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

import type { IPfp } from './types';

//const indexerEndpoint = isDevelopmentEnv ? 'https://eventindexer.hekla.taiko.xyz/nftsByAddress' : '';

export default async function getUserNFTs(): Promise<IPfp[]> {
  //address: Address
  /*
    const nfts = []

    const indexed = await axios({
        method: 'GET',
        url: `${indexerEndpoint}?chainID=${chainId}&address=${address}`,
    })

    const { items } = indexed.data

    //.log({items})
    return nfts*/
  return [];
}
