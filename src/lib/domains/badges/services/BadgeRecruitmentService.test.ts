import type { Mocked } from 'vitest';

import BadgeRecruitmentService from './BadgeRecruitmentService';
//import  BadgeRecruitmentAdapter  from '../adapter/BadgeRecruitmentAdapter';

// Correctly mock DappCompetitionAdapter instead of DappLeaderboardAdapter

vi.mock('../adapter/BadgeRecruitmentAdapter');

describe('BadgeRecruitmentService', () => {
  let mockBadgeRecruitmentService: Mocked<BadgeRecruitmentService>;

  beforeEach(() => {
    vi.clearAllMocks();
    // const mockBadgeRecruitmentAdapter = new BadgeRecruitmentAdapter() as Mocked<BadgeRecruitmentAdapter>;
    mockBadgeRecruitmentService = new BadgeRecruitmentService() as Mocked<BadgeRecruitmentService>;
  });

  it('should exercise the `getEnabledRecruitments`, happy-path', async () => {
    const res = await mockBadgeRecruitmentService.getEnabledRecruitments();
    expect(res).toEqual([1, 2, 3]);
  });
});
