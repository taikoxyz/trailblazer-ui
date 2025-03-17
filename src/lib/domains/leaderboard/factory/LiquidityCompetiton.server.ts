import { type Writable, writable } from 'svelte/store';

import type { ProfileService } from '$lib/domains/profile/services/ProfileService';
import profileService from '$lib/domains/profile/services/ProfileServiceInstance';

import { LiquidityCompetitionAdapter } from '../adapter/server/LiquidityCompetitionAdapter.server';
import { LiquidityCompetitionRepository } from '../repository/LiquidityCompetitionRepository';
import { LiquidityCompetitionService } from '../services/server/LiquidityCompetitionService.server';
import type { LiquidityCompetitionArgs, LiquidityCompetitionUserArgs } from '../types/competition/types';
import type { LiquidityCompetitionPage } from '../types/liquidity/types';

export class LiquidityCompetition {
  private competitionApiUrl: string;
  private title: string;
  private edition: number;
  private liquidityAdapter: LiquidityCompetitionAdapter;
  private repository: LiquidityCompetitionRepository;
  private store: Writable<LiquidityCompetitionPage>;
  private service: LiquidityCompetitionService;
  private profileService: ProfileService;

  constructor(competitionApiUrl: string, protocolApiUrl: string, title: string, edition: number) {
    this.competitionApiUrl = competitionApiUrl;
    this.title = title;
    this.edition = edition;
    this.store = writable<LiquidityCompetitionPage>({
      items: [],
      lastUpdated: Date.now(),
      pagination: { page: 0, size: 10, total: 0 },
    });
    this.liquidityAdapter = new LiquidityCompetitionAdapter(this.competitionApiUrl, this.edition);
    this.repository = new LiquidityCompetitionRepository(this.store);
    this.profileService = profileService;
    this.service = new LiquidityCompetitionService(this.liquidityAdapter, this.repository, this.profileService);
  }

  getStore() {
    return this.store;
  }

  async fetchCompetitionData(args: LiquidityCompetitionArgs) {
    return this.service.getLiquidityCompetitionLeaderboard(args);
  }

  async fetchCompetitionDataForAddress(args: LiquidityCompetitionUserArgs) {
    return this.service.getLiquidityCompetitionDataForAddress(args);
  }
}
