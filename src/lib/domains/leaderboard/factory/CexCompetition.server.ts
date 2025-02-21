import { type Writable } from 'svelte/store';

import { CexCompetitionAdapter } from '../adapter/server/CexCompetitionAdapter.server';
import { CexCompetitionRepository } from '../repository/CexCompetitionRepository';
import { CexCompetitionService } from '../services/server/CexCompetitionService.service.server.';
import { cexLeaderboardStore } from '../stores/cexCompetitionStore';
import type { CexCompetitionPage } from '../types/cex/types';
import type { CexCompetitionArgs } from '../types/competition/types';

export class CexCompetition {
  private competitionApiUrl: string;
  private title: string;
  private edition: number;
  private dappsAdapter: CexCompetitionAdapter;
  private repository: CexCompetitionRepository;
  private service: CexCompetitionService;
  private store: Writable<CexCompetitionPage>;

  constructor(competitionApiUrl: string, protocolApiUrl: string, title: string, edition: number) {
    this.competitionApiUrl = competitionApiUrl;
    this.title = title;
    this.edition = edition;
    this.store = cexLeaderboardStore;
    this.dappsAdapter = new CexCompetitionAdapter(this.competitionApiUrl, this.edition);
    this.repository = new CexCompetitionRepository(this.store);
    this.service = new CexCompetitionService(this.dappsAdapter, this.repository);
  }

  getStore() {
    return this.store;
  }

  async fetchCompetitionData(args: CexCompetitionArgs) {
    return this.service.getCompetitionData(args);
  }
}
