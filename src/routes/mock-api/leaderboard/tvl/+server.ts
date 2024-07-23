import { json } from '@sveltejs/kit';

import { MOCK_DEFI_LEADERBOARD } from '../../../../tests/mocks/leaderboard/defiDappLeaderboard';

export function GET() {
  return json({ lastUpdate: '2024-03-07T12:00:00Z', protocols: MOCK_DEFI_LEADERBOARD });
}
