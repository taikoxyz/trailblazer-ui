import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { EcosystemAdapter } from '../adapter/EcosystemAdapter';
import type { IEcosystemPartner } from '../components/partners';
import type { EcosystemEntry, EcosystemPageApiResponse } from '../dto/ecosystem.dto';
import { EcosystemService } from './EcosystemService';

vi.mock('$lib/domains/ecosystem/services/EcosystemServiceInstance', () => ({
  default: {
    getEcosystemEntries: vi.fn(),
  },
}));

describe('EcosystemService', () => {
  let service: EcosystemService;
  let mockEcosystemAdapter: EcosystemAdapter;

  beforeEach(() => {
    vi.clearAllMocks();
    mockEcosystemAdapter = {
      fetchEcosystemData: vi.fn(),
    } as EcosystemAdapter;

    service = new EcosystemService(mockEcosystemAdapter);
  });

  it('should fetch ecosystem data', async () => {
    // Given
    const season = 3;
    const args: PaginationInfo<EcosystemEntry> = {
      page: 0,
      size: 2,
      total: 100,
    };

    const mockEntry: EcosystemEntry = {
      name: 'test',
      slug: 'test',
      logo: 'test',
      description: 'test',
      category: 'test',
      twitter: 'test',
      website: 'test',
    };

    const mockApiResponse: EcosystemPageApiResponse = {
      data: {
        items: [mockEntry],
        ...args,
      },
      lastUpdated: 1730244198,
    };

    const expected: IEcosystemPartner[] = [
      {
        name: 'test',
        logo: 'test',
        description: 'test',
        category: 'test',
        url: 'test',
      },
    ];

    vi.mocked(mockEcosystemAdapter.fetchEcosystemData).mockResolvedValue(mockApiResponse);

    // When
    const result = await service.getEcosystemEntries(season);

    // Then
    expect(mockEcosystemAdapter.fetchEcosystemData).toHaveBeenCalledWith({ page: 0, size: 100, total: 10 }, season);
    expect(result).toEqual(expected);
  });
});
