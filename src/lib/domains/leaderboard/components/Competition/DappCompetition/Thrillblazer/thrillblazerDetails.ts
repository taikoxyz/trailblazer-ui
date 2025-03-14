import { get } from 'svelte/store';
import { isLoading, locale, t } from 'svelte-i18n';

import { browser } from '$app/environment';

import type { CompetitionInfo } from '../../types';

const translate = (key: string): string => {
  if (browser && get(locale)) {
    if (get(isLoading)) {
      return '';
    }
    return get(t)(key);
  }
  return key;
};

export const thrillblazerDetails: Record<number, CompetitionInfo> = {
  1: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      {
        image: '/first.svg',
        amount: translate('leaderboard.thrillblazers.edition1.prize_breakdown.first.amount'),
      },
      {
        image: '/second.svg',
        amount: translate('leaderboard.thrillblazers.edition1.prize_breakdown.second.amount'),
      },
      {
        image: '/third.svg',
        amount: translate('leaderboard.thrillblazers.edition1.prize_breakdown.third.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: translate('leaderboard.thrillblazers.edition1.prize_breakdown.fourth.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: translate('leaderboard.thrillblazers.edition1.prize_breakdown.fifth.amount'),
      },
    ],
    qualifyingPositions: 5,
  } satisfies CompetitionInfo,
  2: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      {
        image: '/first.svg',
        amount: translate('leaderboard.thrillblazers.edition2.prize_breakdown.first.amount'),
      },
      {
        image: '/second.svg',
        amount: translate('leaderboard.thrillblazers.edition2.prize_breakdown.second.amount'),
      },
      {
        image: '/third.svg',
        amount: translate('leaderboard.thrillblazers.edition2.prize_breakdown.third.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: translate('leaderboard.thrillblazers.edition2.prize_breakdown.fourth.amount'),
      },
    ],
    qualifyingPositions: 4,
  } satisfies CompetitionInfo,
  3: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      {
        image: '/first.svg',
        amount: translate('leaderboard.thrillblazers.edition3.prize_breakdown.first.amount'),
      },
      {
        image: '/second.svg',
        amount: translate('leaderboard.thrillblazers.edition3.prize_breakdown.second.amount'),
      },
      {
        image: '/third.svg',
        amount: translate('leaderboard.thrillblazers.edition3.prize_breakdown.third.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: translate('leaderboard.thrillblazers.edition3.prize_breakdown.fourth.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: translate('leaderboard.thrillblazers.edition3.prize_breakdown.fifth.amount'),
      },
    ],
    qualifyingPositions: 5,
  } satisfies CompetitionInfo,
  4: {
    title: '',
    description: '',
    prizeTitle: translate('leaderboard.gaming.prize.1'),
    prizeSubtitle: '',
    prizes: [
      {
        image: '/thrillblazers/prize/first.svg',
        amount: translate('leaderboard.thrillblazers.edition4.prize_breakdown.first.amount'),
      },
      {
        image: '/thrillblazers/prize/second.svg',
        amount: translate('leaderboard.thrillblazers.edition4.prize_breakdown.second.amount'),
      },
      {
        image: '/thrillblazers/prize/third.svg',
        amount: translate('leaderboard.thrillblazers.edition4.prize_breakdown.third.amount'),
      },
      {
        image: '/thrillblazers/prize/default.svg',
        amount: translate('leaderboard.thrillblazers.edition4.prize_breakdown.fourth.amount'),
      },
      {
        image: '/thrillblazers/prize/default.svg',
        amount: translate('leaderboard.thrillblazers.edition4.prize_breakdown.fifth.amount'),
      },
    ],
    qualifyingPositions: 5,
  },
};
