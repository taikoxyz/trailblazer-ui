import type { Address } from 'viem';

import { getLogger } from '$shared/utils/logger';
import FactionBattleArenaAdapter from '../adapter/FactionBattleArena.adapter';

const log = getLogger('FactionBattleArenaService');

export default class FactionBattleArenaService {
  private adapter: FactionBattleArenaAdapter;

  constructor(adapter?: FactionBattleArenaAdapter) {
    this.adapter = adapter || new FactionBattleArenaAdapter();
  }
      // tmp dev-room method

  async _executeLeagueAndStartNext(seed:number): Promise<void> {
    log('Executing league and starting next');
    await this.adapter._executeLeagueAndStartNext(seed);
  }
}
