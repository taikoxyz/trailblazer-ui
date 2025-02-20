import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import type { CompetitionInfo } from '../../types';

export const chillblazerDetails: Record<number, CompetitionInfo> = {
  1: {
    title: '',
    description: get(t)('leaderboard.chillblazers.1.description'),
    prizeTitle: get(t)('leaderboard.gaming.prize.1'),
    prizeSubtitle: get(t)(`leaderboard.chillblazers.1.prize`),
    prizes: [
      {
        image: '/first.svg',
        amount: get(t)(`leaderboard.chillblazers.1.prize_breakdown.first.amount`),
      },
      {
        image: '/second.svg',
        amount: get(t)(`leaderboard.chillblazers.1.prize_breakdown.second.amount`),
      },
      {
        image: '/third.svg',
        amount: get(t)(`leaderboard.chillblazers.1.prize_breakdown.third.amount`),
      },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.chillblazers.1.prize_breakdown.fourth.amount`),
      },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
  2: {
    title: '',
    description: get(t)('leaderboard.chillblazers.2.description'),
    prizeTitle: get(t)('leaderboard.gaming.prize.1'),
    prizeSubtitle: get(t)(`leaderboard.chillblazers.2.prize`),
    prizes: [
      {
        image: '/first.svg',
        amount: get(t)(`leaderboard.chillblazers.2.prize_breakdown.first.amount`),
      },
      {
        image: '/second.svg',
        amount: get(t)(`leaderboard.chillblazers.2.prize_breakdown.second.amount`),
      },
      {
        image: '/third.svg',
        amount: get(t)(`leaderboard.chillblazers.2.prize_breakdown.third.amount`),
      },
      {
        image: '/default-prize.svg',
        amount: get(t)(`leaderboard.chillblazers.2.prize_breakdown.fourth.amount`),
      },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
};
