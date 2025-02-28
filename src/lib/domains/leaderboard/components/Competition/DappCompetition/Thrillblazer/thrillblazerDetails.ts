import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import { browser } from '$app/environment';

import type { CompetitionInfo } from '../../types';

const translate = (key: string): string => (browser ? get(t)(key) : key);

export const thrillblazerDetails: Record<number, CompetitionInfo> = {
  1: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      { image: '/first.svg', amount: translate('leaderboard.thrillblazers.1.prize_breakdown.first.amount') },
      { image: '/second.svg', amount: translate('leaderboard.thrillblazers.1.prize_breakdown.second.amount') },
      { image: '/third.svg', amount: translate('leaderboard.thrillblazers.1.prize_breakdown.third.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.thrillblazers.1.prize_breakdown.fourth.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.thrillblazers.1.prize_breakdown.fifth.amount') },
    ],
    qualifyingPositions: 5,
  } satisfies CompetitionInfo,
  2: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      { image: '/first.svg', amount: translate('leaderboard.thrillblazers.2.prize_breakdown.first.amount') },
      { image: '/second.svg', amount: translate('leaderboard.thrillblazers.2.prize_breakdown.second.amount') },
      { image: '/third.svg', amount: translate('leaderboard.thrillblazers.2.prize_breakdown.third.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.thrillblazers.2.prize_breakdown.fourth.amount') },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
  3: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      { image: '/first.svg', amount: translate('leaderboard.thrillblazers.3.prize_breakdown.first.amount') },
      { image: '/second.svg', amount: translate('leaderboard.thrillblazers.3.prize_breakdown.second.amount') },
      { image: '/third.svg', amount: translate('leaderboard.thrillblazers.3.prize_breakdown.third.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.thrillblazers.3.prize_breakdown.fourth.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.thrillblazers.3.prize_breakdown.fifth.amount') },
    ],
    qualifyingPositions: 5,
  } satisfies CompetitionInfo,
};
