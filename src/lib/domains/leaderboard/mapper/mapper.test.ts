import { zeroAddress } from 'viem';

import type { DappLeaderboardRow, GamingLeaderboardRow, UserLeaderboardRow } from '../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';
import { mapDappLeaderboardRow, mapGamingLeaderboardRow, mapUserLeaderboardRow } from './mapper';

describe('mapDappLeaderboardRow', () => {
  it('should correctly map DappLeaderboardRow to UnifiedLeaderboardRow', () => {
    const input: DappLeaderboardRow = {
      address: zeroAddress,
      data: [
        {
          address: zeroAddress,
          score: 100,
        },
      ],
      metadata: {
        name: 'Test DApp',
        slug: 'test-dapp',
        twitter: '@testdapp',
        logo: 'https://example.com/logo.png',
      },
      totalScore: 200,
    };

    const expected: UnifiedLeaderboardRow = {
      address: input.address,
      icon: input.metadata!.logo,
      handle: input.metadata!.twitter,
      data: input.data,
      name: input.metadata!.name,
      totalScore: input.totalScore,
    };

    const result = mapDappLeaderboardRow(input);

    expect(result).toEqual(expected);
  });
});

describe('mapGamingLeaderboardRow', () => {
  it('should correctly map GamingLeaderboardRow to UnifiedLeaderboardRow', () => {
    const input: GamingLeaderboardRow = {
      address: zeroAddress,
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
      totalScore: 250,
    };

    const expected: UnifiedLeaderboardRow = {
      address: input.address,
      icon: input.metadata!.logo,
      handle: input.metadata!.twitter,
      data: input.data,
      name: input.metadata!.name,
      totalScore: input.totalScore,
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
