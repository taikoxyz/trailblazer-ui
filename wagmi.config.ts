import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';

import * as EventRegisterHeklaDeployment from '../taiko-mono/packages/nfts/deployments/eventRegister/hekla.json';
import * as EventRegisterMainnetDeployment from '../taiko-mono/packages/nfts/deployments/eventRegister/mainnet.json';
import * as ProfilePictureHeklaDeployment from '../taiko-mono/packages/nfts/deployments/profile/hekla.json';
import * as ProfilePictureMainnetDeployment from '../taiko-mono/packages/nfts/deployments/profile/mainnet.json';
import * as TaikoonHeklaDeployment from '../taiko-mono/packages/nfts/deployments/taikoon/hekla.json';
import * as TaikoonMainnetDeployment from '../taiko-mono/packages/nfts/deployments/taikoon/mainnet.json';
import * as S1ClaimHeklaDeployment from '../taiko-mono/packages/nfts/deployments/trailblazers-airdrop/hekla.json';
import * as S1ClaimMainnetDeployment from '../taiko-mono/packages/nfts/deployments/trailblazers-airdrop/mainnet.json';
import * as TrailblazerBadgesS2HeklaDeployment from '../taiko-mono/packages/nfts/deployments/trailblazers-season-2/hekla.json';
import * as TrailblazerBadgesS2MainnetDeployment from '../taiko-mono/packages/nfts/deployments/trailblazers-season-2/mainnet.json';
import BadgeRecruitmentV2 from '../taiko-mono/packages/nfts/out/BadgeRecruitmentV2.sol/BadgeRecruitmentV2.json';
import ERC20Airdrop from '../taiko-mono/packages/nfts/out/ERC20Airdrop.sol/ERC20Airdrop.json';
import EventRegister from '../taiko-mono/packages/nfts/out/EventRegister.sol/EventRegister.json';
import RegisterProfilePicture from '../taiko-mono/packages/nfts/out/RegisterProfilePicture.sol/RegisterProfilePicture.json';
import TaikoonToken from '../taiko-mono/packages/nfts/out/TaikoonToken.sol/TaikoonToken.json';
import TrailblazersBadgesS2 from '../taiko-mono/packages/nfts/out/TrailblazersBadgesS2.sol/TrailblazersBadgesS2.json';
import TrailblazersS1BadgesV5 from '../taiko-mono/packages/nfts/out/TrailblazersS1BadgesV5.sol/TrailblazersBadgesV5.json';

export default defineConfig({
  out: 'src/generated/abi/index.ts',
  contracts: [
    {
      name: 'TrailblazersBadges',
      address: {
        // use s2 for hekla, as it re-deploys s1 contracts
        167009: TrailblazerBadgesS2HeklaDeployment.TrailblazersBadges as Address,
        167000: TrailblazerBadgesS2MainnetDeployment.TrailblazersBadges as Address,
      },
      abi: TrailblazersS1BadgesV5.abi as Abi,
    },
    {
      name: 'BadgeRecruitment',
      address: {
        167009: TrailblazerBadgesS2HeklaDeployment.BadgeRecruitment as Address,
        167000: TrailblazerBadgesS2MainnetDeployment.BadgeRecruitment as Address,
      },
      abi: BadgeRecruitmentV2.abi as Abi,
    },
    {
      name: 'TrailblazersBadgesS2',
      address: {
        167009: TrailblazerBadgesS2HeklaDeployment.TrailblazersBadgesS2 as Address,
        167000: TrailblazerBadgesS2MainnetDeployment.TrailblazersBadgesS2 as Address,
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
        167009: S1ClaimHeklaDeployment.ERC20Airdrop as Address,
        167000: S1ClaimMainnetDeployment.ERC20Airdrop as Address,
      },
      abi: [],
    },
    {
      name: 'EventRegister',
      address: {
        167009: EventRegisterHeklaDeployment.EventRegister as Address,
        167000: EventRegisterMainnetDeployment.EventRegister as Address,
      },
      abi: EventRegister.abi as Abi,
    },
  ],

  plugins: [actions()],
});
