import { ecsign } from '@ethereumjs/util';
import { concatSig } from '@metamask/eth-sig-util';

import type { IContractData, IToDo } from '$types';

// this is a dev-only method
// it used hardhat account #0 for signing
// signatures are not valid on mainnet deployment
export async function mockSignHash(hash: string): Promise<IContractData> {
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const sig = ecsign(Buffer.from(hash.slice(2), 'hex'), Buffer.from(privateKey.slice(2), 'hex')) as IToDo;
  const serialized = concatSig(Buffer.from(sig.v.toString(16), 'hex'), sig.r, sig.s);
  return serialized as IContractData;
}
