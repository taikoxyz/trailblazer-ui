import { LiquidityCompetitionType } from '$lib/domains/leaderboard/types/competition/types';

export type EditionDetails = {
  prizePool: string;
  tooltip?: boolean;
  tabs?: { slug: LiquidityCompetitionType; name: string }[];
  qualifyingPositions: number;
};

const edition1: EditionDetails = {
  prizePool: '1M',
  qualifyingPositions: 100,
};

const edition2: EditionDetails = {
  prizePool: '1.2M',
  qualifyingPositions: 100,
};

const edition3: EditionDetails = {
  prizePool: '1M',
  tooltip: true,
  tabs: [
    { slug: LiquidityCompetitionType.OG, name: 'OGs Edition' },
    { slug: LiquidityCompetitionType.MOGULS, name: 'DeFi Moguls' },
  ],
  qualifyingPositions: 50,
};

const edition4: EditionDetails = {
  prizePool: '700K',
  tooltip: true,
  qualifyingPositions: 70,
};

export const getEditionDetails = (edition: number): EditionDetails | null => {
  switch (edition) {
    case 1:
      return edition1;
    case 2:
      return edition2;
    case 3:
      return edition3;
    case 4:
      return edition4;
    // Add more editions as needed
    default:
      return null;
  }
};
