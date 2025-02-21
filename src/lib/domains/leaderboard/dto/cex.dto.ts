import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

import type { CexCompetitionItem } from '../types/cex/types';

export type CexLeaderboardPageApiResponse = CommonPageApiResponse<CexCompetitionItem>;
