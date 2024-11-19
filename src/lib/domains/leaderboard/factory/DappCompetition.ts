import { type Writable, writable } from 'svelte/store';

import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import { DappsCompetitionAdapter } from '../adapter/DappsCompetitionAdapter';
import { ProtocolAdapter } from '../adapter/ProtocolAdapter';
import type { DappLeaderboardItem } from '../dto/dapps.dto';
import { DappsCompetitionRepository } from '../repository/DappsCompetitionRepository';
import { DappCompetitionService } from '../services/DappCompetitionService';
import type { DappLeaderboardPage } from '../types/dapps/types';

export class DappCompetition {
  private competitionApiUrl: string;
  private protocolApiUrl: string;
  private title: string;
  private store: Writable<DappLeaderboardPage>;
  private dappsAdapter: DappsCompetitionAdapter;
  private protocolAdapter: ProtocolAdapter;
  private repository: DappsCompetitionRepository;
  private service: DappCompetitionService;

  constructor(competitionApiUrl: string, protocolApiUrl: string, title: string) {
    this.competitionApiUrl = competitionApiUrl;
    this.protocolApiUrl = protocolApiUrl;
    this.title = title;
    this.store = writable<DappLeaderboardPage>({
      items: [],
      lastUpdated: Date.now(),
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
    });
    this.dappsAdapter = new DappsCompetitionAdapter(this.competitionApiUrl);
    this.protocolAdapter = new ProtocolAdapter(this.protocolApiUrl);
    this.repository = new DappsCompetitionRepository(this.store);
    this.service = new DappCompetitionService(this.dappsAdapter, this.protocolAdapter, this.repository);
  }

  getStore() {
    return this.store;
  }

  async fetchCompetitionData(args: PaginationInfo<DappLeaderboardItem>, season: number) {
    return this.service.getCompetitionData(args, season);
  }
}
