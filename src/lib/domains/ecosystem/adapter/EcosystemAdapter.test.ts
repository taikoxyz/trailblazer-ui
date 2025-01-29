import type { AxiosInstance } from 'axios';

import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$shared/services/api/axiosClient';

import type { EcosystemEntry, EcosystemPageApiResponse } from '../dto/ecosystem.dto';
import { EcosystemAdapter } from './EcosystemAdapter';

vi.mock('$lib/shared/services/api/axiosClient', () => ({
  getAxiosInstance: vi.fn(),
  globalAxiosConfig: {},
}));

describe('EcosystemAdapter', () => {
  let ecosystemAdapter: EcosystemAdapter;

  beforeEach(() => {
    ecosystemAdapter = new EcosystemAdapter();
    vi.clearAllMocks();
  });

  describe('fetchEcosystemData', () => {
    it('should return ecosystem data', async () => {
      // Given
      const mockEcosystemData: EcosystemPageApiResponse = {
        data: {
          items: [
            {
              slug: 'slug',
              name: 'name',
              description: 'description',
              category: 'category',
              logo: 'logo',
              twitter: 'twitter',
              website: 'website',
            },
          ],
          page: 0,
          size: 1,
          total: 1,
        },
        lastUpdated: 1730244198,
      };
      const mockResponse = {
        data: mockEcosystemData,
      };

      const mockClient = {
        get: vi.fn().mockResolvedValue(mockResponse),
      } as unknown as AxiosInstance;

      vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

      const input: PaginationInfo<EcosystemEntry> = {
        page: 0,
        size: 2,
        total: 2,
      };

      const season = 3;

      const expectedResult = {
        data: {
          ...mockEcosystemData.data,
        },
        lastUpdated: mockEcosystemData.lastUpdated,
      };

      // When
      const result = await ecosystemAdapter.fetchEcosystemData(input, season);

      // Then
      expect(getAxiosInstance).toHaveBeenCalledWith(season);
      expect(mockClient.get).toHaveBeenCalledWith('/ecosystem', {
        ...globalAxiosConfig,
        params: input,
      });
      expect(result).toEqual(expectedResult);
    });
  });
});
