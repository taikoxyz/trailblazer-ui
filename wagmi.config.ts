import { defineConfig } from '@wagmi/cli';
import { actions } from '@wagmi/cli/plugins';
import type { Abi, Address } from 'abitype';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function importJsonFile(filePath: string) {
  try {
    const absolutePath = join(__dirname, '/node_modules/trailblazer-contracts/', filePath);
    return JSON.parse(readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
}
const EventRegisterHeklaDeployment = importJsonFile('/deployments/eventRegister/hekla.json');
const EventRegisterMainnetDeployment = importJsonFile('/deployments/eventRegister/mainnet.json');
const ProfilePictureHeklaDeployment = importJsonFile('/deployments/profile/hekla.json');
const ProfilePictureMainnetDeployment = importJsonFile('/deployments/profile/mainnet.json');
const TaikoonHeklaDeployment = importJsonFile('/deployments/taikoon/hekla.json');
const TaikoonMainnetDeployment = importJsonFile('/deployments/taikoon/mainnet.json');
const S1ClaimHeklaDeployment = importJsonFile('/deployments/trailblazers-airdrop/hekla.json');
const S1ClaimMainnetDeployment = importJsonFile('/deployments/trailblazers-airdrop/mainnet.json');
const TrailblazerBadgesS2HeklaDeployment = importJsonFile('/deployments/trailblazers-season-2/hekla.json');
const TrailblazerBadgesS2MainnetDeployment = importJsonFile('/deployments/trailblazers-season-2/mainnet.json');
const BadgeRecruitmentV2 = importJsonFile('/out/BadgeRecruitmentV2.sol/BadgeRecruitmentV2.json');
const ERC20Airdrop = importJsonFile('/out/ERC20Airdrop.sol/ERC20Airdrop.json');
const EventRegister = importJsonFile('/out/EventRegister.sol/EventRegister.json');
const RegisterProfilePicture = importJsonFile('/out/RegisterProfilePicture.sol/RegisterProfilePicture.json');
const TaikoonToken = importJsonFile('/out/TaikoonToken.sol/TaikoonToken.json');
const TrailblazersBadgesS2 = importJsonFile('/out/TrailblazersBadgesS2.sol/TrailblazersBadgesS2.json');
const TrailblazersS1BadgesV8 = importJsonFile('/out/TrailblazersS1BadgesV8.sol/TrailblazersBadgesV8.json');



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
        167009: '0x263eE63fCC159401a29c35cb35989ff1bB4b2feD' as Address,
        167000: '0x873919801186f1cd4b9233BB6f5578eF3780eB98' as Address,
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
