import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';

import * as HeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-badges/hekla.json';
import * as MainnetDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-badges/mainnet.json';
import TrailblazersBadges from '../taiko-mono.git/packages/nfts/out/TrailblazersBadges.sol/TrailblazersBadges.json';

export default defineConfig({
  out: 'src/generated/abi/index.ts',
  contracts: [
    {
      name: 'TrailblazersBadges',
      address: {
        167009: HeklaDeployment.TrailblazersBadges as Address,
        167000: MainnetDeployment.TrailblazersBadges as Address,
      },
      abi: TrailblazersBadges.abi as Abi,
    },
    {
      name: 'USDC',
      address: {
        167009: '0xB1Ca1F376AAF482Bf5db741EF4B884eB5d69f27B',
        167000: '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b',
      },
      abi: [],
    },
    {
      name: 'USDT',
      address: {
        167009: '0x1292DFD7abeC7D739448e10903C103C99f032cd2',
        167000: '0x2DEF195713CF4a606B49D07E520e22C17899a736',
      },
      abi: [],
    },
    {
      name: 'ClaimGalxePoints',
      address: {
        167009: '0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC',
        167000: '0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088',
      },
      abi: [
        {
          type: 'function',
          name: 'alreadyRegistered',
          inputs: [{ name: '', type: 'address', internalType: 'address' }],
          outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
          stateMutability: 'view',
        },
        { type: 'function', name: 'register', inputs: [], outputs: [], stateMutability: 'nonpayable' },
        {
          type: 'event',
          name: 'Registered',
          inputs: [{ name: 'registrant', type: 'address', indexed: false, internalType: 'address' }],
          anonymous: false,
        },
      ] as Abi,
    },
  ],
  plugins: [actions()],
});
