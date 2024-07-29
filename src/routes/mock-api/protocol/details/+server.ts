import { json } from '@sveltejs/kit';

import { MOCK_DAPP_DETAILS } from '$mocks';

export function GET() {
  return json({ ...MOCK_DAPP_DETAILS });
}
