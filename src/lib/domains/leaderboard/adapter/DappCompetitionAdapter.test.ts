// import type { AxiosInstance } from 'axios';

// import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
// import { getAxiosInstance, globalAxiosConfig } from '$shared/services/api/axiosClient';

// import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '../dto/dapps.dto';
// import { DappCompetitionAdapter } from './server/DappCompetitionAdapter.server';

// vi.mock('$lib/shared/services/api/axiosClient', () => ({
//   getAxiosInstance: vi.fn(),
//   globalAxiosConfig: {},
// }));

// describe('DappCompetitionAdapter', () => {
//   let leaderboardAdapter: DappCompetitionAdapter;

//   beforeEach(() => {
//     leaderboardAdapter = new DappCompetitionAdapter();
//     vi.clearAllMocks();
//   });

//   describe('fetchLeaderboardData', () => {
//     it('should return leaderboard data', async () => {
//       // Given
//       const mockLeaderboardData = {
//         data: {
//           items: [
//             {
//               name: 'Dapp 1',
//               score: 100,
//               slug: 'dapp-1',
//               rank: 1,
//             },
//             {
//               name: 'Dapp 2',
//               score: 200,
//               slug: 'dapp-2',
//               rank: 2,
//             },
//           ],
//           page: 0,
//           total: 2,
//           size: 2,
//         },
//         lastUpdated: Date.now(),
//       } satisfies DappLeaderboardPageApiResponse;

//       const mockResponse = {
//         data: mockLeaderboardData,
//       };

//       const mockClient = {
//         get: vi.fn().mockResolvedValue(mockResponse),
//       } as unknown as AxiosInstance;

//       vi.mocked(getAxiosInstance).mockReturnValue(mockClient);

//       const input: PaginationInfo<DappLeaderboardItem> = {
//         items: [],
//         page: 0,
//         size: 2,
//         total: 2,
//       };

//       // When
//       const result = await leaderboardAdapter.fetchCompetitionData(input, 1);

//       // Then
//       expect(getAxiosInstance).toHaveBeenCalledWith(1);
//       expect(mockClient.get).toHaveBeenCalledWith('v2/leaderboard/competition', {
//         ...globalAxiosConfig,
//         params: input,
//       });
//       expect(result).toEqual(mockLeaderboardData.data);
//     });
//   });
// });
