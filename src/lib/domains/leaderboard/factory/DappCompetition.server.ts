import { type Writable, writable } from 'svelte/store';

import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import { DappCompetitionAdapter } from '../adapter/server/DappCompetitionAdapter.server';
import { ProtocolDetailsAdapter } from '../adapter/server/ProtocolDetailsAdapter.server';
import type { DappLeaderboardItem } from '../dto/dapps.dto';
import { DappsCompetitionRepository } from '../repository/DappsCompetitionRepository';
import { DappCompetitionService } from '../services/DappCompetitionService.server';
import type { DappLeaderboardPage } from '../types/dapps/types';

export class DappCompetition {
  private competitionApiUrl: string;
  private protocolApiUrl: string;
  private title: string;
  private edition: number;
  private store: Writable<DappLeaderboardPage>;
  private dappsAdapter: DappCompetitionAdapter;
  private protocolAdapter: ProtocolDetailsAdapter;
  private repository: DappsCompetitionRepository;
  private service: DappCompetitionService;

  constructor(competitionApiUrl: string, protocolApiUrl: string, title: string, edition: number) {
    this.competitionApiUrl = competitionApiUrl;
    this.protocolApiUrl = protocolApiUrl;
    this.title = title;
    this.edition = edition;
    this.store = writable<DappLeaderboardPage>({
      items: [],
      lastUpdated: Date.now(),
      pagination: { page: 0, size: 10, total: 0 },
    });
    this.dappsAdapter = new DappCompetitionAdapter(this.competitionApiUrl, this.edition);
    this.protocolAdapter = new ProtocolDetailsAdapter(this.protocolApiUrl);
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
