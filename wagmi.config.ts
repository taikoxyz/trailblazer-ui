import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';

import * as HeklaDeployment from '../taiko-mono/packages/nfts/deployments/trailblazers-badges/hekla.json';
import * as MainnetDeployment from '../taiko-mono/packages/nfts/deployments/trailblazers-badges/mainnet.json';
import TrailblazersBadges from '../taiko-mono/packages/nfts/out/TrailblazersBadges.sol/TrailblazersBadges.json';

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
      name: 'ClaimGalxePoints',
      address: {
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
      ],
    },
  ],
  plugins: [actions()],
});
