import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { DappLeaderboardItem } from '../../dto/dapps.dto';
import type { ProtocolApiResponse } from '../../dto/protocol.dto';

export enum CompetitionType {
  THRILLBLAZER = 'thrillblazer',
  CHILLBLAZER = 'chillblazer',
}

export type DappCompetitionArgs = {
  pagination: PaginationInfo<DappLeaderboardItem>;
  edition: number;
  competitionType: CompetitionType;
};

export type ProtocolCacheEntry = {
  data: ProtocolApiResponse;
  timestamp: number;
};
