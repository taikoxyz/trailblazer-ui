import { log } from 'debug';

import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import { DappCompetitionRepository } from '$lib/domains/leaderboard/repository/DappCompetitionRepository';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import { DappCompetitionAdapter } from '../adapter/DappCompetitionAdapter';
import type { DappLeaderboardItem } from '../dto/dapps.dto';
import type { DappLeaderboardPage } from '../types/dapps/types';

export class DappCompetitionService {
  // adapters
  private competitionAdapter: DappCompetitionAdapter;
  private protocolAdapter: ProtocolAdapter;

  // repositories
  private competitionRepository: DappCompetitionRepository;

  constructor(
    competitionAdapter?: DappCompetitionAdapter,
    protocolAdapter?: ProtocolAdapter,
    leaderboardRepository?: DappCompetitionRepository,
  ) {
    this.competitionRepository = leaderboardRepository ? leaderboardRepository : new DappCompetitionRepository();
    this.protocolAdapter = protocolAdapter ? protocolAdapter : new ProtocolAdapter();
    this.competitionAdapter = competitionAdapter ? competitionAdapter : new DappCompetitionAdapter();
  }

  async getCompetitionData(args: PaginationInfo<DappLeaderboardItem>, season: number): Promise<DappLeaderboardPage> {
    log('fetching competition data', args, season);

    // fetch data from adapters
    // build page
    // save page to repository
    throw new Error('Method not implemented.');
  }
}
