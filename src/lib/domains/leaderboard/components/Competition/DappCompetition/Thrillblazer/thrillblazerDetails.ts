import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

import { setupI18n } from '$i18n/index';

import type { CompetitionInfo } from '../../types';

export let thrillblazerDetails: Record<number, CompetitionInfo> | null = null;

const thrillblazerDetailsPromise = (async () => {
  await setupI18n();

  // Helper function to create identical editions
  const createEdition = ({ editionNumber, useDefault = false }: { editionNumber: number; useDefault?: boolean }) => {
    const edition = useDefault ? 0 : editionNumber;
    return {
      title: '',
      description: get(t)(`leaderboard.thrillblazers.edition${edition}.description`),
      prizeTitle: get(t)('leaderboard.gaming.prize.1'),
      prizeSubtitle: '',
      prizes: [
        {
          image: '/thrillblazers/prize/first.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.first.amount`),
        },
        {
          image: '/thrillblazers/prize/second.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.second.amount`),
        },
        {
          image: '/thrillblazers/prize/third.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.third.amount`),
        },
        {
          image: '/thrillblazers/prize/default.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.fourth.amount`),
        },
        {
          image: '/thrillblazers/prize/default.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.fifth.amount`),
        },
        {
          image: '/thrillblazers/prize/default.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.sixth.amount`),
        },
        {
          image: '/thrillblazers/prize/default.svg',
          amount: get(t)(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.seventh.amount`),
        },
      ],
      qualifyingPositions: 7,
    };
  };

  thrillblazerDetails = {
    1: {
      title: '',
      description: get(t)('leaderboard.thrillblazers.edition1.description'),
      prizeTitle: get(t)('leaderboard.gaming.prize.1'),
      prizeSubtitle: '',
      prizes: [
        {
          image: '/first.svg',
          amount: get(t)('leaderboard.thrillblazers.edition1.prize_breakdown.first.amount'),
        },
        {
          image: '/second.svg',
          amount: get(t)('leaderboard.thrillblazers.edition1.prize_breakdown.second.amount'),
        },
        {
          image: '/third.svg',
          amount: get(t)('leaderboard.thrillblazers.edition1.prize_breakdown.third.amount'),
        },
        {
          image: '/default-prize.svg',
          amount: get(t)('leaderboard.thrillblazers.edition1.prize_breakdown.fourth.amount'),
        },
        {
          image: '/default-prize.svg',
          amount: get(t)('leaderboard.thrillblazers.edition1.prize_breakdown.fifth.amount'),
        },
      ],
      qualifyingPositions: 5,
    },
    2: {
      title: '',
      description: get(t)('leaderboard.thrillblazers.edition2.description'),
      prizeTitle: get(t)('leaderboard.gaming.prize.1'),
      prizeSubtitle: '',
      prizes: [
        {
          image: '/first.svg',
          amount: get(t)('leaderboard.thrillblazers.edition2.prize_breakdown.first.amount'),
        },
        {
          image: '/second.svg',
          amount: get(t)('leaderboard.thrillblazers.edition2.prize_breakdown.second.amount'),
        },
        {
          image: '/third.svg',
          amount: get(t)('leaderboard.thrillblazers.edition2.prize_breakdown.third.amount'),
        },
        {
          image: '/default-prize.svg',
          amount: get(t)('leaderboard.thrillblazers.edition2.prize_breakdown.fourth.amount'),
        },
      ],
      qualifyingPositions: 4,
    },
    3: {
      title: '',
      description: get(t)('leaderboard.thrillblazers.edition3.description'),
      prizeTitle: get(t)('leaderboard.gaming.prize.1'),
      prizeSubtitle: '',
      prizes: [
        {
          image: '/first.svg',
          amount: get(t)('leaderboard.thrillblazers.edition3.prize_breakdown.first.amount'),
        },
        {
          image: '/second.svg',
          amount: get(t)('leaderboard.thrillblazers.edition3.prize_breakdown.second.amount'),
        },
        {
          image: '/third.svg',
          amount: get(t)('leaderboard.thrillblazers.edition3.prize_breakdown.third.amount'),
        },
        {
          image: '/default-prize.svg',
          amount: get(t)('leaderboard.thrillblazers.edition3.prize_breakdown.fourth.amount'),
        },
        {
          image: '/default-prize.svg',
          amount: get(t)('leaderboard.thrillblazers.edition3.prize_breakdown.fifth.amount'),
        },
      ],
      qualifyingPositions: 5,
    },
    4: createEdition({ editionNumber: 4, useDefault: true }),
    5: createEdition({ editionNumber: 5, useDefault: true }),
    6: createEdition({ editionNumber: 6, useDefault: true }),
    7: {
      title: '',
      description: get(t)(`leaderboard.thrillblazers.edition0.description`),
      prizeTitle: get(t)('leaderboard.gaming.prize.1'),
      prizeSubtitle: '',
      prizes: [
        {
          image: '/first.svg',
          amount: get(t)('leaderboard.thrillblazers.edition7.prize_breakdown.first.amount'),
        },
        {
          image: '/second.svg',
          amount: get(t)('leaderboard.thrillblazers.edition7.prize_breakdown.second.amount'),
        },
        {
          image: '/third.svg',
          amount: get(t)('leaderboard.thrillblazers.edition7.prize_breakdown.third.amount'),
        },
      ],
      qualifyingPositions: 3,
      totalPrizePool: get(t)('leaderboard.thrillblazers.edition7.prize_breakdown.total'),
    },
    8: createEdition({ editionNumber: 8, useDefault: true }),
    9: createEdition({ editionNumber: 9, useDefault: true }),
  };
})();

export const getThrillblazerDetails = async () => {
  if (!thrillblazerDetails) {
    await thrillblazerDetailsPromise;
  }
  return thrillblazerDetails;
};
