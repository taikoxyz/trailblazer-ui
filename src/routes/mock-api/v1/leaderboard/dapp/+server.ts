import { json } from '@sveltejs/kit';

import { MOCK_DAPP_LEADERBOARD } from '../../../../../tests/mocks/leaderboard/dappLeaderboard';

export function GET() {
  return json({ ...MOCK_DAPP_LEADERBOARD });
}
