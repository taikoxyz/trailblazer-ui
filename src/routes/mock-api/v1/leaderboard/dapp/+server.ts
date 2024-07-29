import { json } from '@sveltejs/kit';

import { MOCK_DAPP_LEADERBOARD } from '$mocks';

export function GET() {
  return json({ ...MOCK_DAPP_LEADERBOARD });
}
