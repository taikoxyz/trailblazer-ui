import type { NFT } from '$lib/shared/types/NFT';
import { getLogger } from '$libs/util/logger';

const log = getLogger('BadgeService');

export class BadgeService {
  getBadgesForUser(address: string): Promise<NFT[]> {
    log('getBadgesForUser', { address });
    throw new Error('Method not implemented.');
  }
}
