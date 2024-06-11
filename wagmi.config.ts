import { defineConfig } from '@wagmi/cli';
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
  ],
});
