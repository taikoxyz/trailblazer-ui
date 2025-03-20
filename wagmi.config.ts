import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';
import { default as EventRegisterHeklaDeployment } from 'trailblazer-contracts/deployments/eventRegister/hekla.json' assert { type: 'json' };
import { default as EventRegisterMainnetDeployment } from 'trailblazer-contracts/deployments/eventRegister/mainnet.json' assert { type: 'json' };
import { default as ProfilePictureHeklaDeployment } from 'trailblazer-contracts/deployments/profile/hekla.json' assert { type: 'json' };
import { default as ProfilePictureMainnetDeployment } from 'trailblazer-contracts/deployments/profile/mainnet.json' assert { type: 'json' };
import { default as TaikoonHeklaDeployment } from 'trailblazer-contracts/deployments/taikoon/hekla.json' assert { type: 'json' };
import { default as TaikoonMainnetDeployment } from 'trailblazer-contracts/deployments/taikoon/mainnet.json' assert { type: 'json' };
import { default as S1ClaimHeklaDeployment } from 'trailblazer-contracts/deployments/trailblazers-airdrop/hekla.json' assert { type: 'json' };
import { default as S1ClaimMainnetDeployment } from 'trailblazer-contracts/deployments/trailblazers-airdrop/mainnet.json' assert { type: 'json' };
import { default as TrailblazerBadgesS2HeklaDeployment } from 'trailblazer-contracts/deployments/trailblazers-season-2/hekla.json' assert { type: 'json' };
import { default as TrailblazerBadgesS2MainnetDeployment } from 'trailblazer-contracts/deployments/trailblazers-season-2/mainnet.json' assert { type: 'json' };
import BadgeRecruitmentV2 from 'trailblazer-contracts/out/BadgeRecruitmentV2.sol/BadgeRecruitmentV2.json' assert { type: 'json' };
import ERC20Airdrop from 'trailblazer-contracts/out/ERC20Airdrop.sol/ERC20Airdrop.json' assert { type: 'json' };
import EventRegister from 'trailblazer-contracts/out/EventRegister.sol/EventRegister.json' assert { type: 'json' };
import RegisterProfilePicture from 'trailblazer-contracts/out/RegisterProfilePicture.sol/RegisterProfilePicture.json' assert { type: 'json' };
import TaikoonToken from 'trailblazer-contracts/out/TaikoonToken.sol/TaikoonToken.json' assert { type: 'json' };
import TrailblazersBadgesS2 from 'trailblazer-contracts/out/TrailblazersBadgesS2.sol/TrailblazersBadgesS2.json' assert { type: 'json' };
import TrailblazersS1BadgesV8 from 'trailblazer-contracts/out/TrailblazersS1BadgesV8.sol/TrailblazersBadgesV8.json' assert { type: 'json' };

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
      abi: TrailblazersS1BadgesV8.abi as Abi,
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
        // s3 claim
        167009: '0x02209538a0A52b96d8EB2f5fDB8023709e168264' as Address,
        // s2 claim
        167000: '0x95345D5A092623D79a56a016001f7878FA9Da3Ef' as Address,
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
