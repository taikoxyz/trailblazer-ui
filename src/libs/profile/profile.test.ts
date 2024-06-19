import { MOCK_PROFILE } from '../../tests/mocks/profile';
import { Profile } from './profile';

vi.mock('axios');
describe('Profile', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getLevel', () => {
    it('should return Beginner level if percentile is less than 0', () => {
      const level = Profile.getLevel(-1);
      expect(level).toEqual({ level: 0, title: 'Beginner' });
    });

    it('should return Beginner level if percentile is greater than 100', () => {
      const level = Profile.getLevel(101);
      expect(level).toEqual({ level: 0, title: 'Beginner' });
    });

    it('should return correct level based on percentile', () => {
      const level0 = Profile.getLevel(0);
      expect(level0).toEqual({ level: 0, title: 'Beginner' });

      const level1 = Profile.getLevel(51);
      expect(level1).toEqual({ level: 1, title: 'Initiate' });

      const level3 = Profile.getLevel(70);
      expect(level3).toEqual({ level: 3, title: 'Senshi II' });

      const level14 = Profile.getLevel(100);
      expect(level14).toEqual({ level: 14, title: 'Legend' });
    });
  });

  vi.mock('$stores/profile', async () => {
    const { writable } = await import('svelte/store');
    const mockProfile = { ...MOCK_PROFILE, rank: 5, total: 10 };
    return {
      currentProfile: writable(mockProfile),
    };
  });

  describe('calculatePercentile', () => {
    it('should calculate percentile correctly', async () => {
      // Given
      vi.mock('$stores/profile', async () => {
        const mockProfile = MOCK_PROFILE;
        mockProfile.rank = '20';
        mockProfile.total = '100';

        const { writable } = await import('svelte/store');
        return {
          currentProfile: {
            ...writable(mockProfile),
            get: vi.fn(),
          },
        };
      });

      // When
      const actual = Profile.calculatePercentile();

      // Then
      expect(actual).toBe(80);
    });
  });
});
