import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

import type { CexCompetitionRow } from '../types/cex/types';

export type CexLeaderboardPageApiResponse = CommonPageApiResponse<CexCompetitionRow>;
