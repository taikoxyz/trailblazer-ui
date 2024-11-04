import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';

import * as ProfilePictureHeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/profile/hekla.json';
import * as ProfilePictureMainnetDeployment from '../taiko-mono.git/packages/nfts/deployments/profile/mainnet.json';
import * as TaikoonHeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/taikoon/hekla.json';
import * as TaikoonMainnetDeployment from '../taiko-mono.git/packages/nfts/deployments/taikoon/mainnet.json';
// import ERC20Airdrop from '../taiko-mono.git/packages/nfts/out/ERC20Airdrop.sol/ERC20Airdrop.json';
import * as S1ClaimHeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-airdrop/hekla.json';
import * as S1ClaimMainnetDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-airdrop/mainnet.json';
//import * as TrailblazerBadgesHeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-badges/hekla.json';
//import * as TrailblazerBadgesMainnetDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-badges/mainnet.json';
// import * as S1ClaimHeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-airdrop/hekla.json';
// import * as TrailblazerBadgesHeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-badges/hekla.json';
import * as TrailblazerBadgesS2HeklaDeployment from '../taiko-mono.git/packages/nfts/deployments/trailblazers-season-2/hekla.json';
import BadgeRecruitment from '../taiko-mono.git/packages/nfts/out/BadgeRecruitment.sol/BadgeRecruitment.json';
import ERC20Airdrop from '../taiko-mono.git/packages/nfts/out/ERC20Airdrop.sol/ERC20Airdrop.json';
import RegisterProfilePicture from '../taiko-mono.git/packages/nfts/out/RegisterProfilePicture.sol/RegisterProfilePicture.json';
import TaikoonToken from '../taiko-mono.git/packages/nfts/out/TaikoonToken.sol/TaikoonToken.json';
import TrailblazersBadgesS2 from '../taiko-mono.git/packages/nfts/out/TrailblazersBadgesS2.sol/TrailblazersBadgesS2.json';
import TrailblazersS1BadgesV4 from '../taiko-mono.git/packages/nfts/out/TrailblazersS1BadgesV4.sol/TrailblazersBadgesV4.json';

export default defineConfig({
  out: 'src/generated/abi/index.ts',
  contracts: [
    {
      name: 'TrailblazersBadges',
      address: {
        // use s2 for hekla, as it re-deploys s1 contracts
        167009: TrailblazerBadgesS2HeklaDeployment.TrailblazersBadges as Address,
        167000: TrailblazerBadgesS2HeklaDeployment.TrailblazersBadges as Address,
      },
      abi: TrailblazersS1BadgesV4.abi as Abi,
    },
    {
      name: 'BadgeRecruitment',
      address: {
        167009: TrailblazerBadgesS2HeklaDeployment.BadgeRecruitment as Address,
        167000: TrailblazerBadgesS2HeklaDeployment.BadgeRecruitment as Address,
      },
      abi: BadgeRecruitment.abi as Abi,
    },
    {
      name: 'TrailblazersBadgesS2',
      address: {
        167009: TrailblazerBadgesS2HeklaDeployment.TrailblazersBadgesS2 as Address,
        167000: '0x0000000000000000000000000000000000000000', //MainnetDeployment.TrailblazersBadgesS2 as Address,
      },
      abi: TrailblazersBadgesS2.abi as Abi,
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
    {
      name: 'RegisterProfilePicture',
      address: {
        167009: ProfilePictureHeklaDeployment.RegisterProfilePicture as Address,
        167000: ProfilePictureMainnetDeployment.RegisterProfilePicture as Address,
      },
      abi: RegisterProfilePicture.abi as Abi,
    },
    {
      name: 'TaikoonToken',
      address: {
        167009: TaikoonHeklaDeployment.TaikoonToken as Address,
        167000: TaikoonMainnetDeployment.TaikoonToken as Address,
      },
      abi: TaikoonToken.abi as Abi,
    },
    {
      name: 'ERC20Airdrop',
      address: {
        167009: S1ClaimHeklaDeployment.ERC20Airdrop as Address,
        167000: S1ClaimMainnetDeployment.ERC20Airdrop as Address,
      },
      abi: ERC20Airdrop.abi as Abi,
    },
    {
      name: 'ERC20TaikoToken',
      address: {
        167009: S1ClaimHeklaDeployment.ERC20Token as Address,
        167000: S1ClaimMainnetDeployment.ERC20Token as Address,
      },
      abi: [],
    },
  ],
  plugins: [actions()],
});
