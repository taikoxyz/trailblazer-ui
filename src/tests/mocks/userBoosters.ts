
type UserBooster = {
  title: string;
  boost: number;
  unlocked: boolean;
}

export const MOCK_USER_BOOSTERS: UserBooster[] = [
  {
    title: 'Hold Taikoons NFT',
    boost: 2.0,
    unlocked: true,
  },
  {
    title: 'Stake TKO',
    boost: 1.5,
    unlocked: true,

  },
  {
    title: 'Bridge on Taiko',
    boost: 2.0,
    unlocked: true,

  },
  {
    title: 'Active Days on Katla',
    boost: 3,
    unlocked: true,

  },
  {
    title: 'Jeets Slayer',
    boost: 100,
    unlocked: false,
  }
]
