import { zeroAddress } from 'viem';

import type { DappLeaderboardRow, GamingLeaderboardRow } from '$lib/domains/leaderboard/types/dapps/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { UserLeaderboardRow } from '$lib/domains/leaderboard/types/user/types';

import { mapDappLeaderboardRow, mapGamingLeaderboardRow, mapUserLeaderboardRow } from './mapper';

describe('mapDappLeaderboardRow', () => {
  it('should correctly map DappLeaderboardRow to UnifiedLeaderboardRow', () => {
    const input: DappLeaderboardRow = {
      name: 'Test Dapp',
      data: [
        {
          address: zeroAddress,
          score: 100,
        },
      ],
      metadata: {
        name: 'Test Dapp',
        slug: 'test-dapp',
        twitter: '@testdapp',
        logo: 'https://example.com/logo.png',
      },
      totalScore: 200,
      rank: 1,
    };

    const expected: UnifiedLeaderboardRow = {
      handle: input.metadata!.twitter,
      data: input.data,
      name: input.metadata!.name,
      totalScore: input.totalScore,
      rank: input.rank,
    };

    const result = mapDappLeaderboardRow(input);

    expect(result).toEqual(expected);
  });
});

describe('mapGamingLeaderboardRow', () => {
  it('should correctly map GamingLeaderboardRow to UnifiedLeaderboardRow', () => {
    const input: GamingLeaderboardRow = {
      name: 'Test Game',
      data: [
        {
          address: zeroAddress,
          score: 150,
        },
      ],
      metadata: {
        name: 'Test Game',
        slug: 'test-game',
        twitter: '@testgame',
        logo: 'https://example.com/game-logo.png',
      },
      rank: 1,
      totalScore: 250,
    };

    const expected: UnifiedLeaderboardRow = {
      icon: input.metadata!.logo,
      handle: input.metadata!.twitter,
      data: input.data,
      name: input.metadata!.name,
      totalScore: input.totalScore,
      rank: input.rank,
    };

    const result = mapGamingLeaderboardRow(input);

    expect(result).toEqual(expected);
  });
});

describe('mapUserLeaderboardRow', () => {
  it('should correctly map UserLeaderboardRow to UnifiedLeaderboardRow', () => {
    const input: UserLeaderboardRow = {
      address: zeroAddress,
      score: 300,
      rank: 1,
      level: '10',
      title: 'Expert',
      name: 'UserName',
      icon: 'https://example.com/user-icon.png',
    };

    const expected: UnifiedLeaderboardRow = {
      address: input.address,
      level: input.level,
      title: input.title,
      icon: input.icon,
      handle: '',
      rank: input.rank,
      data: [],
      totalScore: input.score,
    };

    const result = mapUserLeaderboardRow(input);

    expect(result).toEqual(expected);
  });

  it('should default level and title if they are missing', () => {
    const input: UserLeaderboardRow = {
      address: zeroAddress,
      score: 300,
      rank: 2,
      // level and title are missing
      icon: 'https://example.com/user-icon.png',
    };

    const expected: UnifiedLeaderboardRow = {
      title: 'Beginner',
      address: input.address,
      level: '0',
      icon: input.icon,
      handle: '',
      data: [],
      rank: input.rank,
      totalScore: input.score,
    };

    const result = mapUserLeaderboardRow(input);

    expect(result).toEqual(expected);
  });
});
