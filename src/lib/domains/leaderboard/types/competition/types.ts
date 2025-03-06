import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { DappLeaderboardItem } from '../../dto/dapps.dto';
import type { ProtocolApiResponse } from '../../dto/protocol.dto';
import type { UserLeaderboardItem } from '../user/types';

export enum DappCompetitionType {
  THRILLBLAZER = 'thrillblazer',
  CHILLBLAZER = 'chillblazer',
}

export enum LiquidityCompetitionType {
  OG = 'OG',
  MOGULS = 'MOGULS',
}

export type DappCompetitionArgs = {
  pagination: PaginationInfo<DappLeaderboardItem>;
  edition: number;
  competitionType: DappCompetitionType;
};

export type ProtocolCacheEntry = {
  data: ProtocolApiResponse;
  timestamp: number;
};

export type LiquidityCompetitionArgs = {
  pagination: PaginationInfo<UserLeaderboardItem>;
  edition: number;
  competitionType: LiquidityCompetitionType;
};
