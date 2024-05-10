import type { UserBooster } from '$libs/profile';

export const MOCK_USER_BOOSTERS: UserBooster[] = [
  {
    title: 'Hold Taikoons NFT',
    boost: 2.0,
    type: 'nft',
    unlocked: true,
  },
  {
    title: 'Stake TKO',
    boost: 1.5,
    type: 'stake',
    unlocked: true,
  },
  {
    title: 'Bridge on Taiko',
    boost: 2.0,
    type: 'bridge',

    unlocked: true,
  },
  {
    title: 'Active Days on Katla',
    boost: 3,
    type: 'nft',

    unlocked: true,
  },
  {
    title: 'Jeets Slayer',
    boost: 100,
    type: 'nft',

    unlocked: false,
  },
];
