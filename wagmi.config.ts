import { createRequire } from 'node:module';

import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';

// needed to import .json from node_modules
const require = createRequire(import.meta.url);
// deployments
const EventRegisterHeklaDeployment = require('trailblazer-contracts/deployments/eventRegister/hekla.json');
const EventRegisterMainnetDeployment = require('trailblazer-contracts/deployments/eventRegister/mainnet.json');
const ProfilePictureHeklaDeployment = require('trailblazer-contracts/deployments/profile/hekla.json');
const ProfilePictureMainnetDeployment = require('trailblazer-contracts/deployments/profile/mainnet.json');
const TaikoonHeklaDeployment = require('trailblazer-contracts/deployments/taikoon/hekla.json');
const TaikoonMainnetDeployment = require('trailblazer-contracts/deployments/taikoon/mainnet.json');
const S1ClaimHeklaDeployment = require('trailblazer-contracts/deployments/trailblazers-airdrop/hekla.json');
const S1ClaimMainnetDeployment = require('trailblazer-contracts/deployments/trailblazers-airdrop/mainnet.json');
const TrailblazerBadgesS2HeklaDeployment = require('trailblazer-contracts/deployments/trailblazers-season-2/hekla.json');
const TrailblazerBadgesS2MainnetDeployment = require('trailblazer-contracts/deployments/trailblazers-season-2/mainnet.json');
const FactionBattleArenaHeklaDeployment = require('trailblazer-contracts/deployments/faction-battle-arena/hekla.json');
// abis
const BadgeRecruitmentV2 = require('trailblazer-contracts/out/BadgeRecruitmentV2.sol/BadgeRecruitmentV2.json');
const ERC20Airdrop = require('trailblazer-contracts/out/ERC20Airdrop.sol/ERC20Airdrop.json');
const EventRegister = require('trailblazer-contracts/out/EventRegister.sol/EventRegister.json');
const RegisterProfilePicture = require('trailblazer-contracts/out/RegisterProfilePicture.sol/RegisterProfilePicture.json');
const TaikoonToken = require('trailblazer-contracts/out/TaikoonToken.sol/TaikoonToken.json');
const TrailblazersBadgesS2 = require('trailblazer-contracts/out/TrailblazersBadgesS2.sol/TrailblazersBadgesS2.json');
const TrailblazersS1BadgesV8 = require('trailblazer-contracts/out/TrailblazersS1BadgesV8.sol/TrailblazersBadgesV8.json');
const FactionBattleArena = require('trailblazer-contracts/out/FactionBattleArena.sol/FactionBattleArena.json');

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
        167009: S1ClaimHeklaDeployment.ERC20Airdrop as Address,
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
    {
      name: 'FactionBattleArena',
      address: {
        167009: '0x2682Bc7be092Fba32C5622109b11892eE5db49F2',
        //167009: FactionBattleArenaHeklaDeployment.FactionBattleArena as Address,
        // todo: update mainnet address
        167000: FactionBattleArenaHeklaDeployment.FactionBattleArena as Address,
      },
      abi: FactionBattleArena.abi as Abi,
    },
  ],

  plugins: [actions()],
});
