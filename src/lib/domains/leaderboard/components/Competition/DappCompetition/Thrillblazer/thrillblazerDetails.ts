import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import type { CompetitionInfo } from '../../types';

export const thrillblazerDetails: Record<number, CompetitionInfo> = {
  1: {
    title: '',
    description: '',
    prizeTitle: get(t)('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      { image: '/first.svg', amount: get(t)(`leaderboard.thrillblazers.1.prize_breakdown.first.amount`) },
      { image: '/second.svg', amount: get(t)(`leaderboard.thrillblazers.1.prize_breakdown.second.amount`) },
      { image: '/third.svg', amount: get(t)(`leaderboard.thrillblazers.1.prize_breakdown.third.amount`) },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.thrillblazers.1.prize_breakdown.fourth.amount`),
      },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.thrillblazers.1.prize_breakdown.fifth.amount`),
      },
    ],
    qualifyingPositions: 5,
  } satisfies CompetitionInfo,
  2: {
    title: '',
    description: '',
    prizeTitle: get(t)('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      { image: '/first.svg', amount: get(t)(`leaderboard.thrillblazers.2.prize_breakdown.first.amount`) },
      { image: '/second.svg', amount: get(t)(`leaderboard.thrillblazers.2.prize_breakdown.second.amount`) },
      { image: '/third.svg', amount: get(t)(`leaderboard.thrillblazers.2.prize_breakdown.third.amount`) },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.thrillblazers.2.prize_breakdown.fourth.amount`),
      },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
  3: {
    title: '',
    description: '',
    prizeTitle: get(t)('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      { image: '/first.svg', amount: get(t)(`leaderboard.thrillblazers.3.prize_breakdown.first.amount`) },
      { image: '/second.svg', amount: get(t)(`leaderboard.thrillblazers.3.prize_breakdown.second.amount`) },
      { image: '/third.svg', amount: get(t)(`leaderboard.thrillblazers.3.prize_breakdown.third.amount`) },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.thrillblazers.3.prize_breakdown.fourth.amount`),
      },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.thrillblazers.3.prize_breakdown.fifth.amount`),
      },
    ],
    qualifyingPositions: 5,
  } satisfies CompetitionInfo,
};
