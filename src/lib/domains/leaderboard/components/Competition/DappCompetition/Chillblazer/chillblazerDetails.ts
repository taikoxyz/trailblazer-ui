import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import { browser } from '$app/environment';

import type { CompetitionInfo } from '../../types';

const translate = (key: string): string => (browser ? get(t)(key) : key);

export const chillblazerDetails: Record<number, CompetitionInfo> = {
  1: {
    title: '',
    description: translate('leaderboard.chillblazers.1.description'),
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: translate('leaderboard.chillblazers.1.prize'),
    prizes: [
      { image: '/first.svg', amount: translate('leaderboard.chillblazers.1.prize_breakdown.first.amount') },
      { image: '/second.svg', amount: translate('leaderboard.chillblazers.1.prize_breakdown.second.amount') },
      { image: '/third.svg', amount: translate('leaderboard.chillblazers.1.prize_breakdown.third.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.chillblazers.1.prize_breakdown.fourth.amount') },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
  2: {
    title: '',
    description: translate('leaderboard.chillblazers.2.description'),
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: translate('leaderboard.chillblazers.2.prize'),
    prizes: [
      { image: '/first.svg', amount: translate('leaderboard.chillblazers.2.prize_breakdown.first.amount') },
      { image: '/second.svg', amount: translate('leaderboard.chillblazers.2.prize_breakdown.second.amount') },
      { image: '/third.svg', amount: translate('leaderboard.chillblazers.2.prize_breakdown.third.amount') },
      { image: '/default-prize.svg', amount: translate('leaderboard.chillblazers.2.prize_breakdown.fourth.amount') },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
};
