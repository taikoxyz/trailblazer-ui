import type { Address } from 'viem';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import BadgeMultiplierAdapter from '../adapter/BadgeMultiplierAdapter';
import type { S2Multipliers } from '../dto/multipliers';
import { BadgeMultiplierService } from './BadgeMultiplierService';

describe('BadgeMultiplierService', () => {
  let service: BadgeMultiplierService;
  let mockAdapter: BadgeMultiplierAdapter;
  const mockAddress = '0xTestAddress' as Address;
  const mockSeason = 2;
  const mockMultipliers: S2Multipliers = {
    devMultiplier: 1,
    minnowMultiplier: 2,
    snaefellMultiplier: 3,
    taikoonMultiplier: 4,
    whaleMultiplier: 5,
    globalMultiplier: 6,
  };

  beforeEach(() => {
    mockAdapter = {
      fetchS2BadgeMultiplier: vi.fn().mockResolvedValue(mockMultipliers),
    } as unknown as BadgeMultiplierAdapter;
    service = new BadgeMultiplierService(mockAdapter);
  });

  it('should return multipliers from the adapter', async () => {
    // When
    const result = await service.getBadgeMultiplier(mockAddress, mockSeason);

    // Then
    expect(mockAdapter.fetchS2BadgeMultiplier).toHaveBeenCalledWith(mockAddress, mockSeason);
    expect(result).toStrictEqual(mockMultipliers);
  });
});
