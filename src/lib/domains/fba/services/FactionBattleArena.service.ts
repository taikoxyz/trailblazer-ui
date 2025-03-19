import type { NFT } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

import FactionBattleArenaAdapter from '../adapter/FactionBattleArena.adapter';
import type { League, LeagueParticipant } from '../types';

const log = getLogger('FactionBattleArenaService');

export default class FactionBattleArenaService {
  private adapter: FactionBattleArenaAdapter;

  constructor(adapter?: FactionBattleArenaAdapter) {
    this.adapter = adapter || new FactionBattleArenaAdapter();
  }
  // tmp dev-room method
  async _executeLeagueAndStartNext(seed: number): Promise<void> {
    log('Executing league and starting next');
    await this.adapter._executeLeagueAndStartNext(seed);
  }

  async registerParticipant(badgeSeason: number, badgeId: number, tokenId: number): Promise<void> {
    log('Registering participant', { badgeSeason, badgeId, tokenId });
    await this.adapter.registerParticipant(badgeSeason, badgeId, tokenId);
  }

  async getCurrentLeagueId(): Promise<number> {
    log('Fetching current league id');
    return this.adapter.getCurrentLeagueId();
  }

  async getLeague(leagueId: number): Promise<League> {
    log('Fetching league', { leagueId });
    return this.adapter.getLeague(leagueId);
  }

  async getLeagueParticipants(leagueId: number): Promise<void> {
    log('Fetching league participants', { leagueId });
    return this.adapter.getLeagueParticipants(leagueId);
  }

  async getMockLeague(player: NFT): Promise<LeagueParticipant[]> {
    log('Fetching mock league', { player });
    return this.adapter.getMockLeague(player);
  }
}
