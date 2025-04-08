import { LiquidityCompetitionType } from '$lib/domains/leaderboard/types/competition/types';

export type EditionDetails = {
  prizePool: string;
  tooltip?: boolean;
  tabs?: { slug: LiquidityCompetitionType; name: string }[];
};

const edition1 = {
  prizePool: '1M',
};

const edition2 = {
  prizePool: '1.2M',
};

const edition3 = {
  prizePool: '1M',
  tooltip: true,
  tabs: [
    { slug: LiquidityCompetitionType.OG, name: 'OGs Edition' },
    { slug: LiquidityCompetitionType.MOGULS, name: 'DeFi Moguls' },
  ],
};

export const getEditionDetails = (edition: number): EditionDetails | null => {
  switch (edition) {
    case 1:
      return edition1;
    case 2:
      return edition2;
    case 3:
      return edition3;
    default:
      return null;
  }
};
